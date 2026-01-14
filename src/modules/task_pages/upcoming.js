import { taskManager } from "../taskManager";
import taskElement from "../taskElement";

function loadUpcomingTasks() {
  const heading = document.querySelector(".view-title");
  heading.textContent = "Upcoming";

  const numTasks = document.querySelector(".view-num-tasks");
  numTasks.textContent =
    taskManager.getUpcomingTasks().length != 1
      ? taskManager.getUpcomingTasks().length + " tasks"
      : taskManager.getUpcomingTasks().length + " task";

  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";

  const tasks = taskManager.getUpcomingTasks();
  tasks.forEach((task) => {
    console.log("here");
    const taskObj = taskElement(task);
    tasksContainer.appendChild(taskObj);
  });
}
export { loadUpcomingTasks };
