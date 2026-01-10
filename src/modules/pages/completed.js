import { taskManager } from "../taskManager";
import taskElement from "../taskElement";

function loadCompletedTasks() {
  const heading = document.querySelector(".view-title");
  heading.textContent = "Completed";

  const numTasks = document.querySelector(".view-num-tasks");
  numTasks.textContent = taskManager.getCompletedTasks().length;

  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";

  const tasks = taskManager.getCompletedTasks();
  tasks.forEach((task) => {
    const taskObj = taskElement(task);
    tasksContainer.appendChild(taskObj);
  });
}
export { loadCompletedTasks };
