import React, { Component } from "react";

import Date from "../Components/DateDay.js";
import Quote from "../Components/Quote.js";
import TaskHandler from "../Components/TaskHandler";
import axios from "../axiosConfig";
import classes from "./abc.css";

class TaskController extends Component {
  state = {
    task: [],
  };

  componentDidMount() {
    console.log("Component Did Mount");
    axios
      .get("https://mymanager-1589901391852.firebaseio.com/task.json")
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            task: res.data,
          });
        } else {
          alert(`error`);
        }
      });
  }

  remove(taskId) {
    let newTask = Object.assign(this.state.task);

    for (let [key, value] of Object.entries(newTask)) {
      if (value.id === taskId) {
        value.status = "Completed";
        let newobj = {
          id: value.id,
          name: value.name,
          status: "Completed",
        };
        console.log(newobj);
        axios.put(`/task/${key}.json`, newobj);
        break;
      }
    }
    this.setState({ task: newTask });
  }

  addTask(taskname) {

    console.log("ADD TASK");
    let taskList = Object.assign(this.state.task);
    const reg = /[0-9]+/;
    let x = Object.values(taskList)
    let len = Object.values(taskList).length-1;
    let text = JSON.stringify(x[len]);
    let match = text.match(reg);
    let id = parseInt(match[0], 10);
    id++;

    let currentTask = {
      id: id,
      name: taskname,
      status: "Pending",
    };

    let res = axios.post("/task.json", currentTask);
    let resObj = Promise.resolve(res)
    const promise1 = new Promise((resolve, reject) => { 
        setTimeout(() => { 
            resObj.then(item => {
              let currentID = item.data.name  
              taskList[currentID] = currentTask;
              this.setState({task: taskList})
            }); 
        }, 5000); 
    }); 
    promise1.then();
  }

  render() {
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
          <div className={classes.left}>
            <Quote />
          </div>
          <div>{taskload}</div>
        </div>
      </React.Fragment>
    );
  }
}

export default TaskController;
