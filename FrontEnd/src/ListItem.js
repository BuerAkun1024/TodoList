import React, { Component } from 'react';
import "./ListItem.css"
import './App.css';
class ListItem extends Component{
    constructor(props) {
        //props将父组件的属性值传递到子组件
        super(props);
    }

    completeItem(content) {
        this.props.completeItem(content);
    }

    deleteItem(content) {
        this.props.deleteItem(content);
    }

    updateItem(content) {
        this.props.updateItem(content);
    }
    

    render() {
        //const item = this.props.item;
        const style1 = {
            textDecorationLine: 'none',
            /*color: 'black'*/
            backgroundColor: '#DFFCB5',
            color: '#2EB872',
        };
        const style2 = {
            textDecorationLine: 'line-through',
            /*color: 'gray'*/
            backgroundColor: '#FFFA9D',
            color: '#FF9A3C',
        };
        //这里弃用了老师的css，因为下面return的结构大改了一下。


        
        return (
            this.props.data.map(element => {
                //根据element.done的属性值的不同决定不同的输出
                return (
                    <ul>
                        <li className="listItem" key={element.content}  type='none'>
                            <input type="checkbox"
                                checked={element.done === 1}
                                onChange={this.completeItem.bind(this, element.id)} />
                            <span  style={ element.done === 0 ? style1 : style2 }>{element.id}{element.content}{element.updatedAt}</span>
                            <button className="delete-btn" onClick={this.deleteItem.bind(this, element.id)} >Delete</button>
                            <button className="update-btn" onClick={this.updateItem.bind(this, element.id)} >Update</button>
                        </li>
                    </ul>
                )
            })
        )
            
    }
}

// const ListItem = (props) => {
//     const item = props.item;

//     if (item.done) {
//         return (<p className="done-item">{item.content}</p>)
//     } else {
//         return (<p className="item">{item.content}</p>)
//     }
// }

export default ListItem;