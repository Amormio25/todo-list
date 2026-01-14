import projectList from "./projectList";

const projectManager = {
  createProject: (title) => {
    projectList.addProject(title);

    const projectSection = document.querySelector(".sidebar-section--projects");
    const projectItem = document.createElement("li");
    const projectLink = document.createElement("a");
    const projectText = document.createElement("span");

    projectItem.className = "sidebar-item project-item";
    projectLink.className = "sidebar-link";
    projectText.textContent = title;

    projectLink.appendChild(projectText);
    projectItem.appendChild(projectLink);
    projectSection.appendChild(projectItem);

    const sidebar = document.querySelector(".sidebar");
    const activePage = sidebar.querySelector(".active");
    activePage.classList.remove("active");
    projectItem.classList.add("active");
  },

  loadProjectView: (title) => {
    const project = projectList.getProject(title);
    const heading = document.querySelector(".view-title");
    heading.textContent = project.getProjectTitle();

    const numTasks = document.querySelector(".view-num-tasks");
    numTasks.textContent =
      project.getTasks().length != 1
        ? project.getTasks().length + " tasks"
        : project.getTasks().length + " task";

    const tasksContainer = document.querySelector(".tasks-container");
    tasksContainer.innerHTML = "";

    const tasks = project.getTasks();
    tasks.forEach((task) => {
      const taskObj = taskElement(task);
      tasksContainer.appendChild(taskObj);
    });
  },
};

export { projectManager };
