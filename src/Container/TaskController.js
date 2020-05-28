import React, { Component } from "react";

import Date from "../Components/DateDay.js";
import Quote from "../Components/Quote.js";
import TaskHandler from "../Components/TaskHandler";
import axios from "../axiosConfig";
import classes from "./abc.css";

class TaskController extends Component {
  state = {
    task: []
  };

  componentDidMount() {
    console.log("Component Did Mount");
    axios
      .get("https://mymanager-1589901391852.firebaseio.com/task.json")
      .then((res) => {
        if (res.status === 200) {
          const data = Object.values(res.data);
          // console.log(data);
          this.setState({
            task: data,
          });
        } else {
          alert(`error`);
        }
      });
  }

  remove(taskId) {
    let arr = [...this.state.task];
    let i;
    for (i of arr) {
      // console.log(i);
      if (i.id === taskId) {
        // console.log(i.name);
        i.status = "Completed";
        break;
      }
    }
    this.setState({ task: arr });
  }

  addTask(taskname) {
    console.log("ADD TASK");
    const reg = /[0-9]+/;
    let len = this.state.task.length - 1;
    let id;

    if (this.state.task[len]) {
      let text = JSON.stringify(this.state.task[len])
      let match = text.match(reg)
      console.log(match[0])
      id = match[0]
    }

    let newTask = [...this.state.task];
    let currentTask = {
      id: id++,
      name: taskname,
      status: "Pending"
    };

    newTask.push(currentTask);
    axios.post("/task.json", currentTask);
    this.setState({ task: newTask });
  }

  render() {
    // console.log("fd");
    // console.log(this.state.task);
    
    let taskload = null;
    if (this.state.task) {
      taskload = (
        <TaskHandler
          task={this.state.task}
          addTask={this.addTask.bind(this)}
          remove={this.remove.bind(this)}
        />
      );
    }

    return (
      <React.Fragment>
        <div className={classes.abc}>
          <Date />
          <div  className={classes.left}>
            <Quote />
          </div>
          <div className={classes}
          >{taskload}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default TaskController;


