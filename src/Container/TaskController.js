import React, { Component } from "react";

import Date from "../Components/DateDay.js";
import Quote from "../Components/Quote.js";
import TaskHandler from "../Components/TaskHandler";

class TaskController extends Component {
  state = {
    task: [
      {
        id: "1",
        name: "Dance",
        status: "Pending",
      },
      {
        id: "2",
        name: "instagram",
        status: "Pending",
      },
      {
        id: "3",
        name: "ludo",
        status: "Completed",
      },
      {
        id: "4",
        name: "guitar",
        status: "Completed",
      },
    ],
  };

  remove(taskId) {
    let arr = [...this.state.task];
    let i;
    for (i of arr) {
      console.log(i);
      if (i.id === taskId) {
        console.log(i.name);
        i.status = "Completed";
        break;
      }
    }
    this.setState({ task: arr });
  }

  addTask(taskname) {
    console.log("Task " + taskname);
    let min = 1;
    let max = 100;
    let id = (min + Math.random() * (max - min)).toFixed();

    let newTask = [
      ...this.state.task,
      {
        id: id,
        name: taskname,
        status: "Pending",
      },
    ];
    this.setState({ task: newTask });
  }


  render() {
    // console.log(this.state.task);
    return (
      <React.Fragment>
        <Date />
        <Quote />
        <h1>TASK</h1>

        <TaskHandler
          task={this.state.task}
          addTask={this.addTask.bind(this)}
          remove={this.remove.bind(this)}
        />
      </React.Fragment>
    );
  }
}

export default TaskController;
