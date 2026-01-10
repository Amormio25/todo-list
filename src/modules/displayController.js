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

function displayWebsite() {
  const sidebar = document.querySelector(".sidebar");
  loadTodayTasks(); // load this by default
  sidebar.addEventListener("click", (event) => setActivePage(event, sidebar));
}

export { displayWebsite };
