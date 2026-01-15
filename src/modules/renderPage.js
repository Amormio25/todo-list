import { taskManager } from "./taskManager";
import taskElement from "./taskElement";
import projectList from "./projectList";

// is project - allow add task feature
// check if need to validate pageName
function renderPage(pageName, isProject) {
  const heading = document.querySelector(".view-title");
  heading.textContent = pageName;
  console.log(pageName);
  const numTasks = document.querySelector(".view-num-tasks");
  console.log(projectList.getProject(pageName));
  const tasks = isProject
    ? projectList.getProject(pageName).getTasks()
    : taskManager[`get${pageName}Tasks`]();
  numTasks.textContent =
    tasks.length != 1 ? tasks.length + " tasks" : tasks.length + " task";

  const tasksContainer = document.querySelector(".tasks-container");
  tasksContainer.innerHTML = "";
  tasks.forEach((task) => {
    const taskObj = taskElement(task);
    tasksContainer.appendChild(taskObj);
  });
}
export { renderPage };
