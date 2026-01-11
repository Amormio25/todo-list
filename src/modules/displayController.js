import { loadAllTasks } from "./pages/all";
import { loadTodayTasks } from "./pages/today";
import { loadUpcomingTasks } from "./pages/upcoming";
import { loadImportantTasks } from "./pages/important";
import { loadCompletedTasks } from "./pages/completed";

function setActivePage(event, sidebar) {
  if (!event.target.closest(".sidebar-item")) return;

  const linkText = event.target
    .closest(".sidebar-item")
    .querySelector(".sidebar-link span");

  const activePage = sidebar.querySelector(".active");
  activePage.classList.remove("active");
  event.target.closest(".sidebar-item").classList.add("active");

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

function handleCreateTask() {
  // plan
  // maybe separate into multiple functions
  // but this should be short and well organized such that when you open
  // the calendar or dropdown list, clicking on anything after closes it.
  // there probably shouldnt be so many if else blocks
  const createTaskContainer = document.querySelector("dialog");
  createTaskContainer.showModal();

  createTaskContainer.addEventListener("click", (event) => {
    if (event.target.matches(".select-date")) {
      createTaskContainer.querySelector(".calendar").style.opacity = 1;
    } else if (event.target.matches(".select-priority")) {
      createTaskContainer.querySelector(".dropdown-list").style.opacity = 1;
    }
  });
}

function handleCreateProject() {}
function displayWebsite() {
  const sidebar = document.querySelector(".sidebar");
  loadTodayTasks(); // load this by default
  sidebar.addEventListener("click", (event) => setActivePage(event, sidebar));

  const addTaskButton = document.querySelector(".view-add-tasks");
  addTaskButton.addEventListener("click", handleCreateTask);
}

export { displayWebsite };
