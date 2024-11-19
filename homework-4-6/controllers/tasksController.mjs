import Tasks from "../models/tasksModel.mjs";
import fs from "fs";
import path from "path";

class TasksController {
  static getAllTasks(req, res) {
    const tasks = Tasks.loadTasksList();
    res.render("tasks/tasksList", { tasks });
  }

  static getTasksById(req, res) {
    const task = Tasks.getTaskById(req.params.id);
    res.render("tasks/createFormTask", { task });
  }

  static getCreateTasksForm(req, res) {
    res.render("tasks/createFormTask", { task: {} });
  }

  static createTasks(req, res) {
    if (req.file) {
      const taskData = { imgSrc: req.file.filename, ...req.body };
      Tasks.addNewTask(taskData);
    } else {
      Tasks.addNewTask(req.body);
    }

    res.redirect("/tasks");
  }

  static getEditTasksForm(req, res) {
    const task = Tasks.getTaskById(req.params.id);
    res.render("tasks/createFormTask", { task });
  }

  static updateTask(req, res) {
    let id = req.params.id;

    let taskToChange = Tasks.getTaskById(id);

    if (req.file) {
      if (req.file.filename !== taskToChange.imgSrc) {
        fs.unlinkSync(`uploads\\${taskToChange.imgSrc}`);

        req.body.imgSrc = req.file.filename;
      }
    }

    Tasks.updateTask(req.params.id, req.body);
    res.redirect("/tasks");
  }

  static deleteTask(req, res) {
    const task = Tasks.getTaskById(req.body.id);

    if (task.imgSrc) {
      fs.unlinkSync(`uploads\\${task.imgSrc}`);
    }

    Tasks.deleteTaskById(req.body.id);

    res.send(200, "ok");
    res.redirect("/tasks");
  }
}

export default TasksController;
