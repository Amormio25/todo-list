import { taskManager } from "../taskManager";
import taskElement from "../taskElement";

function loadImportantTasks() {
  const heading = document.querySelector(".view-title");
  heading.textContent = "Important";

  const numTasks = document.querySelector(".view-num-tasks");
  numTasks.textContent = taskManager.getImportantTasks().length();

  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";

  const tasks = taskManager.getImportantTasks();
  tasks.forEach((task) => {
    taskObj = taskElement(task);
    tasksContainer.appendChild(taskObj);
  });
}
export { loadImportantTasks };
