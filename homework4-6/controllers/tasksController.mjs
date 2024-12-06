import Tasks from "../models/tasksModel.mjs";
import fs from "fs";
import path from "path";
import { validationResult } from "express-validator";

class TasksController {
  static getAllTasks(req, res) {
    const tasks = Tasks.loadTasksList();
    res.render("tasks/tasksList", { tasks });
  }

  static getTasksById(req, res) {
    const task = Tasks.getTaskById(req.params.id);
    res.render("tasks/createFormTask", { errors: [], task });
  }

  static getCreateTasksForm(req, res) {
    res.render("tasks/createFormTask", { errors: [], task: {} });
  }

  static createTasks(req, res) {
    let errors = validationResult(req);

    console.log("----------------------------------errors");
    console.log(validationResult(req));

    if (!errors.isEmpty()) {
      const data = req.body;

      if (req.params.id) data.id = req.params.id;

      return res.status(400).render("./tasks/createFormTask", {
        errors: errors.array(),
        task: data,
      });
    }

    if (req.file) {
      const taskData = { imgSrc: req.file.filename, errors: [], ...req.body };
      Tasks.addNewTask(taskData);
    } else {
      Tasks.addNewTask({ errors: [], ...req.body });
    }

    res.redirect("/tasks");
  }

  static getEditTasksForm(req, res) {
    const task = Tasks.getTaskById(req.params.id);

    res.render("tasks/createFormTask", { errors: [], task });
  }

  static updateTask(req, res) {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formData = req.body;

      if (req.params.id) formData.id = req.params.id;

      return res.status(400).render("./tasks/createFormTask", {
        errors: errors.array(),
        task: formData,
      });
    }

    let taskToChange = Tasks.getTaskById(req.params.id);
    let data = req.file
      ? { imgSrc: req.file.filename, ...req.body }
      : { ...req.body };

    if (taskToChange.imgSrc && taskToChange.imgSrc !== data.imgSrc) {
      TasksController.deleteFile(taskToChange.imgSrc);
    }

    Tasks.updateTask(req.params.id, data);
    res.redirect("/tasks");
  }

  static deleteTask(req, res) {
    const task = Tasks.getTaskById(req.body.id);

    if (task.imgSrc) {
      TasksController.deleteFile(task.imgSrc);
    }

    Tasks.deleteTaskById(req.body.id);

    res.send(200, "ok");
  }

  static deleteFile(pathFile) {
    fs.unlinkSync(path.join(`uploads`, pathFile));
  }
}

export default TasksController;
