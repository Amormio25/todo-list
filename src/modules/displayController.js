import { loadAllTasks } from "./pages/all";
import { loadTodayTasks } from "./pages/today";
import { loadUpcomingTasks } from "./pages/upcoming";
import { loadImportantTasks } from "./pages/important";
import { loadCompletedTasks } from "./pages/completed";
import Task from "./task";

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

// need event listeners for handling sidebar (think about if u want to implement
// the project links here or somewhere else)
// need event listeners for creating task (which should also encapsulate buttons
// in the task form)
// need event listeners for task container which should respond to edit, delete,
// completed, and clicking on the task element which should bring up the task editor

// function handleSidebar() {}

function handleCreateTask() {
  const taskForm = document.querySelector("dialog");
  const task = new Task();

  const selectPriorityButton = taskForm.querySelector(".select-priority");
  const dropdownList = taskForm.querySelector(".dropdown-list");
  const selectDateButton = taskForm.querySelector(".select-date");
  const calendar = taskForm.querySelector(".calendar");

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

function handleFormButtons(target) {
  // if cancel closemodal
  // else add the task to project and update task filters and re-render current page
}

function handleTaskUpdates(target) {}

// function handleCreateProject() {}

function displayWebsite() {
  const sidebar = document.querySelector(".sidebar");
  const createTaskButton = document.querySelector(".view-add-tasks");
  const tasksContainer = document.querySelector(".tasks-container");

  loadTodayTasks(); // load this by default

  sidebar.addEventListener("click", (event) => setActivePage(event, sidebar));
  createTaskButton.addEventListener("click", handleCreateTask);
  tasksContainer.addEventListener("click", handleTaskUpdates);
}

export { displayWebsite };
