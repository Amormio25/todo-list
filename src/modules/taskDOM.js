function createElementWithClass(element, className) {
  const newElement = document.createElement(element);
  newElement.classList.add(className);

  return newElement;
}

const createTaskElement = (task) => {
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

  const options = {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    task.getDueDate()
  );
  taskDate.textContent = formattedDate;

  const svgNS = "http://www.w3.org/2000/svg";
  const editSvg = document.createElementNS(svgNS, "svg");
  editSvg.setAttribute("viewBox", "0 0 24 24");
  const editPath = document.createElementNS(svgNS, "path");
  editPath.setAttribute(
    "d",
    "M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z"
  );
  editSvg.appendChild(editPath);

  const deleteSvg = document.createElementNS(svgNS, "svg");
  deleteSvg.setAttribute("viewBox", "0 0 24 24");
  const deletePath = document.createElementNS(svgNS, "path");
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

export default createTaskElement;
