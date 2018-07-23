import React, { Component } from "react";
import FlipMove from "react-flip-move";
import "./TodoItem.css";

class TodoItems extends Component {
  constructor (props){
    super(props);

    this.state = {
      todoItems: []
    };

    this.createTasks = this.createTasks.bind(this);
    this.isDone = this.isDone.bind(this);
    this.markDone = this.markDone.bind(this);
  }

// set the value to true or false based on wether the box is checked
  isDone(itemKey) {
    let updatedItem = this.props.entries.map(item => {
      // convert itemKey to integer and evaluate against value of the item's key
      if (Number(itemKey) === item.key) {
        item.done = !item.done;
      }
      return item;
    });

    this.setState({
      todoItems: [].concat(updatedItem)
    });
  }

  markDone(evt) {
    this.isDone(evt.target.value);
  }

//
  createTasks(item) {
    // assign a class value based on checked or not
    let itemClass = "todo " + (item.done ? "done" : "undone");
    return (
      <li key={item.key}>
        <input onChange={this.markDone} value={item.key} type="checkbox"></input>
        <label className={itemClass}>{item.text}</label>
        <p className="deleteButton" onClick={() => this.delete(item.key)}>
          <strong>x</strong>
        </p>
      </li>
    )
  }

  delete(key) {
    this.props.delete(key);
  }

  render() {
    let todoEntries = this.props.entries;
    let listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
        <FlipMove duration={150} easing="ease-out">
          {listItems}
        </FlipMove>
      </ul>
    );
  }
}

export default TodoItems;
