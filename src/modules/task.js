export default class Task {
  constructor(title, description, dueDate, priority, completedStatus) {
    if (!new.target) {
      throw Error("Use the new operator to create a new object.");
    }
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completedStatus = completedStatus;
  }

  // SETTERS
  setTitle(title) {
    this.title = title;
  }
  setDescription(description) {
    this.description = description;
  }
  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }
  setPriority(priority) {
    this.priority = priority;
  }
  setCompletedStatus(completedStatus) {
    this.completedStatus = completedStatus;
  }

  // SETTERS
  getTitle() {
    return this.title;
  }
  getDescription() {
    return this.description;
  }
  getDueDate() {
    return this.dueDate;
  }
  getPriority() {
    return this.priority;
  }
  getCompletedStatus() {
    return this.completedStatus;
  }
}
