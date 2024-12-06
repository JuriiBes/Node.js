import dataFileManager from "../utils/DataFileManager.mjs";

class Tasks {
  static loadTasksList() {
    try {
      return dataFileManager.loadData();
    } catch (error) {
      throw new Error("Не вдалось заватажити список продуктів");
    }
  }
  static addNewTask(productObj) {
    try {
      dataFileManager.addItem({ id: new Date().getTime(), ...productObj });
    } catch (error) {
      throw new Error("Операція з даними не пройшла!");
    }
  }
  static getTaskById(id) {
    try {
      return dataFileManager.getItemById(id);
    } catch (error) {
      throw new Error("Операція з даними не пройшла!");
    }
  }
  static updateTask(id, productData) {
    try {
      dataFileManager.updateItemById(id, productData);
    } catch (error) {
      throw new Error("Операція з даними не пройшла!");
    }
  }
  static deleteTaskById(id) {
    // console.log("====================================== delete id");
    // console.log(id);

    try {
      dataFileManager.deleteItemById(id);
    } catch (error) {
      throw new Error("Операція з даними не пройшла!");
    }
  }
}

export default Tasks;
