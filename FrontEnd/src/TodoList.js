import React, { Component } from 'react';
import ListItem from "./ListItem";
import NewItem from "./NewItem";
import './App.css';

class TodoList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            todoList: [
                { id: 1, content: 'React practice', done: 0, updatedAt: '2020-04-10 20:05:07' },
                { id: 2, content: 'game time', done: 0, updatedAt: '2020-04-10 20:44:07' }              
            ],
            doneCount : 0  
        }
    }

    addNewItem = (NewItemContent) => {
        var nlength = this.state.todoList.length - 1;
        var nid = this.state.todoList[nlength].id + 1;
        var d = new Date();
        var ntime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+ ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        const newList = [...this.state.todoList, { id: nid, content: NewItemContent, done: 0, updatedAt : ntime }];
        //合并后，需使用setState改变原来的todoList
        this.setState(
            {
                todoList: newList
            }
        )
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

    deleteItem1(id) {
        var flag = 0;
        this.state.todoList.forEach((element) => {
            if (element.id === id && element.done===1) {
                flag = 1;
            }
        })

        //根据id对条目滤除
        const data = this.state.todoList.filter(element => element.id !== id)
        this.setState({
          todoList: data
        })
        //删除操作对已完成计数的影响。
        if (flag === 1) {
            this.setState({
                doneCount: this.state.doneCount - 1
            })
        }
    }

    updateItem1(id) {
         // 弹出输入框，用于填写新内容
         var rel = window.prompt('请输入修改内容');
         // 判断输入框里的内容不为空的话
        if (rel != null) {
            const TodoList = []//建一个新的
            this.state.todoList.forEach((element, index) => {
                //根据id查找，如果一样，则将其done值设置为1.
                if (element.id === id) {
                    const item = this.state.todoList[index]
                    var d = new Date();
                    var ntime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+ ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                    TodoList.push(Object.assign({}, item, {content: rel},{updatedAt: ntime}))
                    this.setState({
                        todoList: TodoList
                    })
                } else {
                    TodoList.push(element)
                }
          })
        }
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
                    <li>{this.state.doneCount}已完成&nbsp;/&nbsp;{this.state.todoList.length}总数</li>
                </ul>
                
                <NewItem addItem = {this.addNewItem}/>
            </div>
        );
    }
}

export default TodoList;