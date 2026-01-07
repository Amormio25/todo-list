function createElementWithClass(element, className) {
  const element = document.createElement(element);
  element.classList.add(className);

  return element;
}

export const taskElement = (task) => {
  const taskItem = createElementWithClass("div", "task-item");
  const checkbox = createElementWithClass("button", "task-checkbox");
  const taskItemRight = createElementWithClass("div", "task-item-right");
  const taskTextDiv = createElementWithClass("div", "task-text");
  const taskDetails = createElementWithClass("div", "task-details");

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskItemRight);
  taskItemRight.appendChild(taskTextDiv);
  taskItemRight.appendChild(taskDetails);

  const taskTitle = createElementWithClass("h1", "task-title");
  const taskDescription = createElementWithClass("div", "task-description");
  taskTitle.textContent = task.getTitle();
  taskDescription.textContent = task.getDescription();
  taskTextDiv.appendChild(taskTitle);
  taskTextDiv.appendChild(taskDescription);

  const taskDate = createElementWithClass("div", "task-date");
  taskDate.textContent = task.getDueDate();

  const editSvg = document.createElement("svg");
  editSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  editSvg.setAttribute("viewBox", "0 0 24 24");
  const editPath = document.createElement("path");
  editPath.setAttribute(
    "d",
    "M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5Z"
  );
  editSvg.appendChild(editPath);

  const deleteSvg = document.createElement("svg");
  deleteSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  deleteSvg.setAttribute("viewBox", "0 0 24 24");
  const deletePath = document.createElement("path");
  deletePath.setAttribute(
    "d",
    "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z"
  );
  deleteSvg.appendChild(deletePath);

  taskDetails.appendChild(taskDate);
  taskDetails.appendChild(editSvg);
  taskDetails.appendChild(deleteSvg);

  return taskItem;
};
