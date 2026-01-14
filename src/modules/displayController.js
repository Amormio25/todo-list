import { loadAllTasks } from "./task_pages/all";
import { loadTodayTasks } from "./task_pages/today";
import { loadUpcomingTasks } from "./task_pages/upcoming";
import { loadImportantTasks } from "./task_pages/important";
import { loadCompletedTasks } from "./task_pages/completed";
import Task from "./task";
import projectList from "./projectList";
import { projectManager } from "./projectManager";

function setActivePage(event, sidebar) {
  // probably add logic here to work for projects as well
  const sidebarItem = event.target.closest(".sidebar-item");
  if (!sidebarItem) return;

  const linkText = sidebarItem.querySelector(".sidebar-link span");

  const activePage = sidebar.querySelector(".active");
  activePage.classList.remove("active");
  sidebarItem.classList.add("active");

  const pageLoaders = {
    All: loadAllTasks,
    Today: loadTodayTasks,
    Upcoming: loadUpcomingTasks,
    Important: loadImportantTasks,
    Completed: loadCompletedTasks,
  };
  const loadPage = pageLoaders[linkText.textContent.trim()];
  loadPage();
}

// currently has a bug
// cancelling then returning makes the select buttons not work, then cancel again, then they do work, and it repeats
// this and project, try to find way to prevent default reload
// default should actually load home page, and filters shouldnt have an add task button
function handleCreateTask() {
  const taskForm = document.querySelector("#tasks");
  const task = new Task();

  const selectPriorityButton = taskForm.querySelector(".select-priority");
  const dropdownList = taskForm.querySelector(".dropdown-list");
  const selectDateButton = taskForm.querySelector(".select-date");
  const calendar = taskForm.querySelector(".calendar");
  const cancelButton = taskForm.querySelector(".cancel");
  const addButton = taskForm.querySelector(".add");

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
    taskForm.close();
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
  taskForm.addEventListener("click", (event) => {
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

  taskForm.showModal();
}

function handleCreateProject() {
  const projectForm = document.querySelector("#projects");
  projectForm.showModal();

  const cancelButton = projectForm.querySelector(".cancel");
  const addButton = projectForm.querySelector(".add");

  cancelButton.addEventListener("click", () => {
    projectForm.close();
  });

  addButton.addEventListener("click", () => {
    const title = projectForm.querySelector("#form-title").value;
    projectManager.createProject(title);
    // projectList.addProject(title);
    // console.log(projectList.getProjectList());
    // add the project as a sidebar item, make it active
    // display the project view
    projectForm.close();
  });
}

function handleTaskUpdates(target) {}

// function handleCreateProject() {}

function displayWebsite() {
  const sidebar = document.querySelector(".sidebar");
  const createTaskButton = document.querySelector(".view-add-tasks");
  const tasksContainer = document.querySelector(".tasks-container");

  loadTodayTasks(); // load this by default

  sidebar.addEventListener("click", (event) => {
    if (event.target.closest("#add-project")) {
      handleCreateProject();
    } else if (!event.target.closest(".sidebar-item--header")) {
      setActivePage(event, sidebar);
    }
  });
  createTaskButton.addEventListener("click", handleCreateTask);
  tasksContainer.addEventListener("click", handleTaskUpdates);
}

export { displayWebsite };
