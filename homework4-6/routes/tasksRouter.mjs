import { Router } from "express";
import TasksController from "../controllers/tasksController.mjs";
import multer from "multer";
import TaskValidator from "../models/taskValidator.mjs";
import { checkSchema } from "express-validator";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", TasksController.getAllTasks);

router.get("/create", TasksController.getCreateTasksForm);
router.post(
  "/create",
  checkSchema(TaskValidator.taskSchema),
  upload.single("taskFile"),
  TasksController.createTasks
);

router.get("/edit/:id", TasksController.getEditTasksForm);
router.post(
  "/edit/:id",
  checkSchema(TaskValidator.taskSchema),
  upload.single("taskFile"),
  TasksController.updateTask
);

router.delete("/", TasksController.deleteTask);

export default router;
