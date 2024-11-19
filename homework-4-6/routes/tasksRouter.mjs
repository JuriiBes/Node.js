import { Router } from "express";
import TasksController from "../controllers/tasksController.mjs";
import multer from "multer";

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
router.post("/create", upload.single("taskFile"), TasksController.createTasks);

router.get("/edit/:id", TasksController.getEditTasksForm);
router.post("/edit/:id", upload.single("taskFile"), TasksController.updateTask);

router.delete("/", TasksController.deleteTask);

export default router;
