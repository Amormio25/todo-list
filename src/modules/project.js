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
    const taskExists = this.#todoList.some((item) => item.title === task.title);
    if (taskExists) {
      console.log("Task with the same title already exists.");
      return 0;
    }
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

  renameProject(title) {
    this.#title = title;
  }

  getProjectTitle() {
    return this.#title;
  }
}
