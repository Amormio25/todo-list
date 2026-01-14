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
  },

  loadProjectTasks: () => {},

  // when click proj link, get its tasks, render, update view
};

export { projectManager };
