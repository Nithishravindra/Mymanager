import React, { Component } from "react";

import Date from "../Components/DateDay.js";
import Quote from "../Components/Quote.js";
import TaskHandler from "../Components/TaskHandler";
import axios from "../axiosConfig";
import classes from "./TaskController.css";

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
    if (taskname.length > 0) {
      console.log("ADD TASK");
      let id = 0;
      let taskList;
      const reg = /[0-9]+/;

      if (this.state.task !== null) {
        console.log("not null ");
        taskList = Object.assign(this.state.task);
        console.log(taskList);
        let x = Object.values(taskList);
        let len = Object.values(taskList).length - 1;
        let text = JSON.stringify(x[len]);
        console.log("text = ", text);
        let match = text.match(reg);
        id = parseInt(match[0], 10);
        id += 1;
      }

      let currentTask = {
        id: id,
        name: taskname,
        status: "Pending",
      };

      let res = axios.post("/task.json", currentTask);
      let resObj = Promise.resolve(res);
      const promise1 = new Promise((resolve, reject) => {
        setTimeout(() => {
          resObj.then((item) => {
            let currentID = item.data.name;
            taskList[currentID.toString()] = currentTask;
            this.setState({ task: taskList });
            window.location.reload();
          });
        }, 50);
      });
      promise1.then();
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className={classes.taskbody}>
          <header className={classes.header}>
            <div className={classes.name}>MY MANAGER</div>
            <div className={classes.date}>
              <Date />
            </div>
          </header>
          <main className={classes.main}>
            <div className={classes.quote}>
              <Quote />
            </div>
            <div className={classes.task}>
            <TaskHandler
          task={this.state.task}
          addTask={this.addTask.bind(this)}
          remove={this.remove.bind(this)}
        />
           </div>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default TaskController;
