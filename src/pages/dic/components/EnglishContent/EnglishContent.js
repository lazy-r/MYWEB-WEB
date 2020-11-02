import React from 'react';
import {Pagination, List, message} from 'antd';
import WordContent from "../WordContent/WordContent";
import Axios from "axios";
import './EnglishContent.scss'
import API from "../../../API";

export default class EnglishContent extends React.Component{
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            queryKey:"",
            relatedWords:[],
            defaultCurrent:1,
            current:1,
            pageSize:8,
            total:0,
            visible:"none",
        };
    }
    componentWillMount() {
        this.setState({
            queryKey:this.props.queryKey
        })
        this.refreshPageAllItem(this.state.defaultCurrent,this.state.pageSize,this.props.queryKey);
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            queryKey:nextProps.queryKey,
            current:1
        });
        this.refreshPageAllItem(1,this.state.pageSize,nextProps.queryKey);
    }
    refreshPage = (page, pageSize)=>{
        this.setState({
            current: page,
            pageSize: pageSize
        });
        this.refreshPageAllItem(page,pageSize,this.state.queryKey);

    }
    refreshPageAllItem = (current,pageSize,queryKey)=>{
        if(queryKey.length > 0){
            let url = API.dic+"/eng";
            let _this = this;

            Axios.get(url,{
                params:{
                    word: queryKey,
                    pageNo: current,
                    pageSize: pageSize
                }
            }).then((response)=>{
                _this.setState({
                    relatedWords:response.data.pageList,
                    total:response.data.totalCount
                })
            }).catch((error)=>{
                message.warning('查询失败');
            });
        }
    }

    render() {
        return  <div align={"center"} style={{display:this.props.queryKey.length>0?"":"none"}}>
                    <List
                        dataSource={this.state.relatedWords}
                        renderItem={relatedWord => (
                            <WordContent
                                relatedWord={relatedWord}
                                getLatestWords={this.props.getLatestWords}
                            />
                        )}
                    />
                    <Pagination
                        style={{marginTop:10,marginBottom:10}}
                        current={this.state.current}
                        defaultCurrent={this.state.defaultCurrent}
                        total={this.state.total}
                        pageSize={this.state.pageSize}
                        onChange={this.refreshPage}
                        showSizeChanger={false}
                        hideOnSinglePage={true}
                    />
                </div>;
    }
}
