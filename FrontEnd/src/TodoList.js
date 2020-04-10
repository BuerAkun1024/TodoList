import React, { Component } from 'react';
import ListItem from "./ListItem";
import NewItem from "./NewItem";
import './App.css';

class TodoList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            todoList: [
                {id : 1, content : 'React practice', done : 0, updatedAt:'2020-04-10 20:05:07'},
                {id : 2, content : 'game time', done : 0, updatedAt:'2020-04-10 20:44:07'}
            ]
        }
    }

    addNewItem = (NewItemContent) => {
        var nlength = this.state.todoList.length + 1;
        var d = new Date();
        var ntime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()+ ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        const newList = [...this.state.todoList, { id: nlength, content: NewItemContent, done: 0, updatedAt : ntime }];
        //合并后，需使用setState改变原来的todoList
        this.setState(
            {
                todoList: newList
            }
        )
    }

    completeItem1(content) {
        const TodoList = []//建一个新的
        this.state.todoList.forEach((element, index) => {
            //根据内容查找，如果一样，则将其done值设置为1.
            if (element.content === content) {
              const item = this.state.todoList[index]
              TodoList.push(Object.assign({}, item, {done: item.done === 0 ? 1 : 0}))
              this.setState({
                todoList: TodoList
              })
            } else {
              TodoList.push(element)
            }
          })
    }

    deleteItem1(content) {
        const data = this.state.todoList.filter(element => element.content !== content)
        this.setState({
          todoList: data
        })
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
                    TodoList.push(Object.assign({}, item, {content: rel}, {updatedAt: ntime}))
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
                </ul>
                
                
                <NewItem addItem = {this.addNewItem}/>
            </div>
        );
    }
}

export default TodoList;