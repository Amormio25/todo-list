import Task from "./task";
import { renderPage } from "./renderPage";
import { createProjectElement } from "./projectDOM";

// remember in the future to try switching to form post method with action
// linking to handler
// can see our add buttons have issue of keeping previously added name
function setActivePage(event, sidebar) {
  const sidebarItem = event.target.closest(".sidebar-item");
  if (!sidebarItem) return;

  const linkText = sidebarItem
    .querySelector(".sidebar-link span")
    .textContent.trim();

  const activePage = sidebar.querySelector(".active");
  activePage.classList.remove("active");
  sidebarItem.classList.add("active");

  const isProject = event.target.closest(".sidebar-item.project-item");
  renderPage(linkText, isProject);
}

// currently has a bug
// cancelling then returning makes the select buttons not work, then cancel again, then they do work, and it repeats
// this and project, try to find way to prevent default reload
// default should actually load home page, and filters shouldnt have an add task button
// also try to load home page by default
function handleCreateTask() {
  const taskDialog = document.querySelector("#tasks");
  const task = new Task();

  const selectPriorityButton = taskDialog.querySelector(".select-priority");
  const dropdownList = taskDialog.querySelector(".dropdown-list");
  const selectDateButton = taskDialog.querySelector(".select-date");
  const calendar = taskDialog.querySelector(".calendar");
  const cancelButton = taskDialog.querySelector(".cancel");
  const addButton = taskDialog.querySelector(".add");

  selectDateButton.addEventListener("click", () =>
    calendar.classList.toggle("hide")
  );

  calendar.addEventListener("click", (event) => {
    if (event.target.matches(".date")) {
      // task.setDueDate()
      // target.textconent = date
      // calendar.style.opacity = 0;
      calendar.classList.toggle("hide");
      selectDateButton.textContent = event.target.id;
    }
  });

  selectPriorityButton.addEventListener("click", () => {
    dropdownList.classList.toggle("hide");
  });

  dropdownList.addEventListener("click", (event) => {
    if (event.target.matches(".dropdown-option")) {
      selectPriorityButton.textContent = event.target.textContent;
      task.setPriority(event.target.textContent);

      // console.log("now here");
      // console.log(task.getPriority());
      dropdownList.classList.toggle("hide");
      // console.log(options.classList);
    }
  });

  cancelButton.addEventListener("click", () => {
    taskDialog.close();
  });

  addButton.addEventListener("click", () => {
    // prevent default (submit)
    // add the task to the current project (home by default)
    //    ensure that the current project resides in the only instance of
    //    the projectList so that the pages can call taskManager methods
    //    and find the project from the same projectList
    // re-render the current project view (diff func)
    // plan
    // make sidebar project links work first
  });

  // handle clicking away with open calendar/dropdown
  taskDialog.addEventListener("click", (event) => {
    if (
      !calendar.classList.contains("hide") &&
      !event.target.closest(".calendar") &&
      !event.target.matches(".select-date")
    ) {
      calendar.classList.toggle("hide");
    }
    if (
      !dropdownList.classList.contains("hide") &&
      !event.target.closest(".dropdown-list") &&
      !event.target.matches(".select-priority")
    ) {
      dropdownList.classList.toggle("hide");
    }
  });

  taskDialog.showModal();
}

function handleCreateProject() {
  const projectDialog = document.querySelector("#projects");
  projectDialog.showModal();

  const cancelButton = projectDialog.querySelector(".cancel");
  const addButton = projectDialog.querySelector(".add");

  cancelButton.addEventListener("click", () => {
    projectDialog.close();
  });

  addButton.addEventListener(
    "click",
    () => {
      const title = projectDialog.querySelector("#form-title").value;
      createProjectElement(title);
      renderPage(title, true);
      projectDialog.querySelector("form").reset();
      projectDialog.close();
    },
    { once: true }
  );
}

function handleTaskUpdates(target) {}

function displayWebsite() {
  const sidebar = document.querySelector(".sidebar");
  const createTaskButton = document.querySelector(".view-add-tasks");
  const tasksContainer = document.querySelector(".tasks-container");

  createProjectElement("Home");
  renderPage("Home", true);

  sidebar.addEventListener("click", (event) => {
    if (event.target.closest("#add-project")) {
      handleCreateProject();
    } else if (
      event.target.closest(".sidebar-item") &&
      !event.target.closest(".sidebar-item--header")
    ) {
      setActivePage(event, sidebar);
    }
  });
  createTaskButton.addEventListener("click", handleCreateTask);
  tasksContainer.addEventListener("click", handleTaskUpdates);
}

export { displayWebsite };
