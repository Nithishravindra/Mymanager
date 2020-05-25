import React, { Component } from "react";

class TaskHandler extends Component {
  state = {
    newTask: "",
  };

  printList() {
    console.log("print list")
    console.log(this.props.task)
    return this.props.task
    .filter(trueTask => {
        if (trueTask.status === "Pending") {
            return trueTask;
        } else {
            return 0;
        }
    })
    .map((item, index) => {
        console.log(item)
        return (
          <div key={index}>
            <li>{item.name}<br /></li>
            <button onClick={() => this.props.remove(item.id)}>
              Remove Task
            </button>
          </div>
        )
      });
  }

  handleChange(event) {
    let rawTask = event.target.value;
    this.setState({ newTask: rawTask });
  }

  render() {
    // console.log(this.props.task);
    return (
      <React.Fragment>
        
          {this.printList()}
          <div>
            <input
              type="text"
              placeholder="Add task"
              value={this.state.newTask}
              onChange={this.handleChange.bind(this)}
            />
            <button onClick={() => this.props.addTask(this.state.newTask)}>
              {" "}
              ADD TASK{" "}
            </button>
          </div>
      </React.Fragment>
    );
  }
}

export default TaskHandler;
