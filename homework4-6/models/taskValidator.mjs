// import { body } from "express-validator";

class TaskValidator {
  static taskSchema = {
    task: {
      isLength: {
        options: { max: 1000 },
        errorMessage:
          "Your task is too long. Try wording changes to make it clear and understandable.",
      },
      trim: true,
      escape: true,
    },
  };
}

export default TaskValidator;
