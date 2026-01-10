import { taskManager } from "../taskManager";
import taskElement from "../taskElement";

function loadAllTasks() {
  const heading = document.querySelector(".view-title");
  heading.textContent = "All";

  const numTasks = document.querySelector(".view-num-tasks");
  numTasks.textContent = taskManager.getAllTasks().length;

  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";

  const tasks = taskManager.getAllTasks();
  tasks.forEach((task) => {
    const taskObj = taskElement(task);
    tasksContainer.appendChild(taskObj);
  });
}
export { loadAllTasks };
