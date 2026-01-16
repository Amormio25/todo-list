import { taskManager } from "./taskManager";
import createTaskElement from "./taskDOM";
import projectList from "./projectList";

function renderPage(pageName, isProject) {
  const heading = document.querySelector(".view-title");
  heading.textContent = pageName;

  const numTasks = document.querySelector(".view-num-tasks");
  const tasks = isProject
    ? projectList.getProject(pageName).getTasks()
    : taskManager[`get${pageName}Tasks`]();

  numTasks.textContent =
    tasks.length != 1 ? tasks.length + " tasks" : tasks.length + " task";

  const addTaskButton = document.querySelector(".view-add-tasks");
  if (isProject) {
    addTaskButton.classList.remove("hide");
  } else {
    addTaskButton.classList.add("hide");
  }

  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";
  tasks.forEach((task) => {
    const taskObj = createTaskElement(task);
    tasksContainer.appendChild(taskObj);
  });
}
export { renderPage };
