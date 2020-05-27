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
          const dat = Object.values(res.data);

          console.log(dat);
          this.setState({
            task: dat,
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
    console.log(this.state.task);
    console.log("Task " + taskname);
    let min = 1;
    let max = 100;
    let id = (min + Math.random() * (max - min)).toFixed();

    let newTask = [...this.state.task];

    let ord = {
      id: id,
      name: taskname,
      status: "Pending",
    };

    newTask.push(ord);
    // console.log(newTask)
    axios.post("/task.json", ord);
    this.setState({ task: newTask });
  }

  render() {
    console.log("fd");
    console.log(this.state.task);

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
          {/* <h1>TASK</h1> */}
          <div className={classes}
          >{taskload}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default TaskController;


