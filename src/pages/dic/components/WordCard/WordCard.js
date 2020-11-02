import {Card,Tooltip} from "antd";
import React from 'react'
import './WordCard.scss'
import Axios from "axios";
import API from "../../../API";

export default class WordCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            word: props.word,
            highlightWord: props.highlightWord,
            id: props.id,
            translation:"",
            isTranslated: false,
            searchCount:""
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            word: props.word,
            highlightWord: props.highlightWord,
            id: props.id,
        })
    }
    showInfo = ()=>{
        if(this.state.isTranslated){
            this.setState({
                translation:"",
                searchCount:""
            })
        }else {
            this.getTranslate();
        }
        this.setState({
            isTranslated:!this.state.isTranslated
        })
    }

    getTranslate = ()=>{
        let url = API.dic+"/t";
        let _this = this;
        let word = this.state.word;
        Axios.get(url,{
            params:{
                word: word
            }
        }).then((response)=>{
            _this.setState({
                searchCount:"(已查看"+response.data.searchCount+"次)",
                translation: response.data.translation
            })
            // _this.props.getLatestWords();
        }).catch((error)=>{

        })
    }
    render() {
        return  <Tooltip title={this.state.searchCount}>
                    <Card.Grid
                        dangerouslySetInnerHTML=
                            {{__html: "<span style='font-weight:bold'>"+
                                    this.state.highlightWord+"<br/>"+this.state.translation
                                    +"</span>"}}
                        onClick={this.showInfo}

                    />
                </Tooltip>



    }
}
