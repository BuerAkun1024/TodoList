import React, { Component } from 'react';
import ListItem from "./ListItem";
import NewItem from "./NewItem";
import './App.css';
import axios from 'axios';
import _ from "lodash";

class TodoList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            todoList: [],        
            doneCount : 0 
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8080/api/tasks')
          .then(res => this.setState({ todoList: res.data }));
    }

    addNewItem = (inputValue) => {
        axios.post('http://localhost:8080/api/tasks', {
            id: _.parseInt(this.state.todoList.length ? this.state.todoList[this.state.todoList.length - 1].id : 0) + 1,
            content: inputValue
         }).then(res => this.setState({ //todoList: res.data }));
            todoList: [...this.state.todoList, res.data]
        }));
    }

    completeItem1(id) {
        const TodoList = [];//建一个新的
        var flag = 0;
        this.state.todoList.forEach((element, index) => {
            //根据id查找，如果一样，则将其done值设置为1.
            if (element.id === id) {
                flag = 1;
                const item = this.state.todoList[index]
                var d = new Date();
                    var ntime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+ ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                TodoList.push(Object.assign({}, item, { done: item.done === 0 ? 1 : 0 }, { updatedAt: ntime }))
                if (item.done === 1) {
                    flag = -1;
                } else {
                    flag = 1;
                }
                this.setState({
                    todoList: TodoList,
                })
            } else {
                TodoList.push(element)
            }
            //完成操作对已完成计数的影响。
            if (flag === 1) {
                this.setState({
                    doneCount: this.state.doneCount + 1
                })
            }
            if (flag === -1) {
                this.setState({
                    doneCount: this.state.doneCount - 1
                })
            }
          })
    }

    deleteItem1= (id) => {
        axios.delete(`http://localhost:8080/api/tasks/${id}`)
        .then(res => this.setState({ todoList: res.data }));
    }

    updateItem1 = (id) => {
        console.log(id);
        var inputValue = window.prompt('请输入修改内容');
        axios.put(`http://localhost:8080/api/tasks/${id}`, {
            id:id,
            content: inputValue
         }).then(res => this.setState({
            todoList: res.data
         }));
    }
    
    render() {
        return (
            <div>
                {
                    //将这一部分拆分
                    //todoList.map(item => <p key={item}>{item}</p>
                    
                    //传递给子组件ListItem
                    //this.state.todoList.map(item => <ListItem item={item} />)  
                }
                <ul id="todo-list">
                    <   ListItem data={this.state.todoList}
                        completeItem={this.completeItem1.bind(this)}
                        deleteItem={this.deleteItem1.bind(this)}
                        updateItem={this.updateItem1.bind(this)}
                    />
                </ul>
                <li>{this.state.doneCount}已完成&nbsp;/&nbsp;{this.state.todoList.length}总数</li>
                <NewItem addItem = {this.addNewItem}/>
            </div>
        );
    }
}

export default TodoList;