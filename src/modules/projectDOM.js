import projectList from "./projectList";

const createProjectElement = (title) => {
  console.log(title + "here");
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
};

export { createProjectElement };
