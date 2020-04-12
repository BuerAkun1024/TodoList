import React, { Component } from 'react';
import './App.css';

class NewItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            inputContent:''
        }
    }

    onInputChange = (event) => {
        this.setState(
            {
                inputContent: event.target.value
            }
        )
        console.log(event.target.value)
    }

    onAddBtnClick = () => {
        this.props.addItem(this.state.inputContent)
        this.setState({
            inputContent: ''
        })
    }

    onKeyup = (e) => {
        if(e.keyCode === 13) {
            //console.log("按了回车")
            this.props.addItem(this.state.inputContent)
            this.setState({
                inputContent: ''
            })
        }
    }


    render() {
        return (
            <div className="dialog" >
                <input type="text" id="new-todo" onKeyUp={this.onKeyup} value={this.state.inputContent} onChange={this.onInputChange} placeholder="添加任务" />
                <button type="button" id="add-new-todo" onClick={this.onAddBtnClick}>Add</button>
            </div>
        )
    }
}

export default NewItem;