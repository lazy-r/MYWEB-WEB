import React from 'react';
import {Collapse} from 'antd';
import './WordContent.scss'
import WordCard from "../WordCard/WordCard";

export default class WordContent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            relatedWord: props.relatedWord,
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            relatedWord:props.relatedWord
        })
    }


    renderWords = ()=>{
        let component = [];
        let relatedWord = this.state.relatedWord;
        let _this = this;
        relatedWord.words.forEach((item,index)=>{
            component.push(<WordCard
                                word={item}
                                highlightWord={relatedWord.highlightWords[index]}
                                id={relatedWord.id}
                                getLatestWords={_this.props.getLatestWords}
                            />)
        })
        return component;
    }
    renderTitle = ()=>{
        let component = [];
        let relatedWord = this.state.relatedWord;
        relatedWord.highlightWords.forEach((item)=>{
            component.push(<div
                                style={{fontSize:18,fontWeight:"bold",display:" inline-block",marginRight:5,marginLeft:5}}
                                dangerouslySetInnerHTML={{__html: item}}></div>)
        });
        return component;
    }

    render() {

        return <Collapse
            header={this.state.relatedWord.words}
            destroyInactivePanel={true}
            style={{borderRadius:20}}
            bordered={false}
        >

            <Collapse.Panel
                header={this.renderTitle()}
                showArrow={false}
            >
                {this.renderWords()}
            </Collapse.Panel>
        </Collapse>;

    }


}

