import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items : []
    };

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

// add todo item and concatenate to the array and set state
  addItem(evt) {

    if (this._todo.value !== "") {
      let newTodo = {
        text: this._todo.value,
        key: Date.now(),
        done: false
      };

      this.setState ((prevState) => {
        return {
          items: prevState.items.concat(newTodo)
        };
      });
    }

    this._todo.value = "";

    evt.preventDefault();
  }

// Filter out deleted todo items and set state
  deleteItem(key) {
    let filteredItems = this.state.items.filter(function (item){
      return (item.key !== key)
    });

    this.setState({
      items: filteredItems
    })
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
{/* take the argument and assign it to a property attached to "this" accessible via this._todo */}
            <input ref={input => this._todo = input}
              placeholder="enter task">
            </input>
            <button type="submit">add</button>
          </form>
        </div>
        <TodoItems entries={this.state.items}
                   delete={this.deleteItem}/>
      </div>
    );
  }
}

export default TodoList;
