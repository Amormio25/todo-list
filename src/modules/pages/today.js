import { taskManager } from "../taskManager";
import taskElement from "../taskElement";

function loadTodayTasks() {
  const heading = document.querySelector(".view-title");
  heading.textContent = "Today";

  const numTasks = document.querySelector(".view-num-tasks");
  numTasks.textContent = taskManager.getTodayTasks().length;

  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";

  const tasks = taskManager.getTodayTasks();
  tasks.forEach((task) => {
    const taskObj = taskElement(task);
    tasksContainer.appendChild(taskObj);
  });
}
export { loadTodayTasks };
