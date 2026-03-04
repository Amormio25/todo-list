export default class Project {
  #title;
  #todoList = [];

  constructor(title) {
    if (!new.target) {
      throw Error("Use the new operator to create a new object.");
    }
    this.#title = title;
  }

  addTask(task) {
    this.#todoList.push(task);
    console.log("Task added successfully");
    return 1;
  }

  removeTask(task) {
    this.#todoList = this.#todoList.filter((item) => item !== task);
  }

  getTasks() {
    return [...this.#todoList];
  }

  getTask(id) {
    return this.#todoList.find((task) => task.getId() === id);
  }

  renameProject(title) {
    this.#title = title;
  }

  getProjectTitle() {
    return this.#title;
  }
}
