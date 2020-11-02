import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './MySearch.scss'
import { List,Input,Button, Tooltip ,Row, Col, message} from 'antd';
import Axios from "axios";
import API from "../../API";
import EnglishContent from "../components/EnglishContent/EnglishContent";
import ChineseContent from "../components/ChineseContent";

export default class MySearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            latestWords : [""],
            languageIndex: 0,
            language: ["英","中"],
            searchURL: ["eng","chi"],
            queryKey: "",
            isSpecial:false,
            titleHeight:"30%",
            visible:false,
        };
    }

    // 组件加载前
    componentWillMount() {
        this.getLatestWords();
    }

    // 获取最近查询的5个单词
    getLatestWords = ()=>{
        let url = API.dic+"/t/latestWords";
        let _this = this;
        Axios.get(url).then(function (response) {
            _this.setState({
                latestWords:response.data
            })
        }).catch(function (error) {
            message.warning('获取最新查询单词失败');
        })
    }


    // 改变语言
    changeLanguage = ()=>{

        this.setState({
                languageIndex: (this.state.languageIndex+1)%2
        })

    }
    //绑定数据，并通知子组件进行查询
    onSearch = (event)=>{
        this.topSearch();
        this.setState({
            queryKey: event.target.value
        });
    }

    // 搜索框上移
    topSearch = ()=>{
        if(!this.state.visible){
            this.setState({
                titleHeight : "13%",
                visible: true
            })
        }
    }
    // 搜索最近查询单词
    searchLatestWords = (word)=>{
        this.topSearch();
        this.setState({
            queryKey: word
        })
    }
    // 更新isSpecial，通知子组件查询特定单词
    searchSpecial = ()=>{
        this.setState({
            isSpecial: !this.state.isSpecial
        })
    }

    render() {
        const selectBefore = (
            <Button
                shape="round"
                onClick={this.changeLanguage}
            >
                {this.state.language[this.state.languageIndex]}
            </Button>
        );

        const buttonAfter = (
            <Tooltip title="search">
                <Button
                    shape="circle"
                    icon={<SearchOutlined />}
                    onClick={this.searchSpecial}
                />
            </Tooltip>
        );

        return  <div id="outRow">
                    <Row align="bottom" id="titleRow" style={{height:this.state.titleHeight}}>
                        <Col span={24}>
                            <h1 align="center">Dictionary</h1>
                        </Col>
                    </Row>
                    <Row justify="space-around" >
                        <Col span={18} align="center" >
                                <Input
                                    placeholder="输入要搜索的单词"
                                    size="large"
                                    prefix={selectBefore}
                                    id = "myInput"
                                    suffix = {buttonAfter}
                                    onChange={this.onSearch.bind(this)}
                                    value={this.state.queryKey}
                                />
                        </Col>
                    </Row>
                    <Row justify="space-around" id="latestSearch">
                        <Col span={10} align="center" >
                            <List
                                grid={{
                                    gutter: 1,
                                    column: 5
                                }}
                                dataSource={this.state.latestWords}
                                renderItem={item => (
                                    <List.Item>
                                        <Tooltip title={"已查看"+item.searchCount+"次"}
                                                 placement={"bottom"}
                                        >
                                            <span  onClick={this.searchLatestWords.bind(this,item.word)} style={{color:"#3f3f3f",fontWeight:"bold",fontSize:15}}>{item.word}</span>
                                        </Tooltip>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                    <Row justify="space-around">
                        <Col span={16}>
                            {this.state.languageIndex === 0?
                                <EnglishContent
                                    queryKey={this.state.queryKey}
                                    getLatestWords={this.getLatestWords}
                                    isSpecial={this.state.isSpecial}
                                />:
                                <ChineseContent/>
                            }
                        </Col>
                    </Row>
                </div>;
    }
}
