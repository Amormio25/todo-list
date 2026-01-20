import Task from "./task";
import projectList from "./projectList";
import { renderPage } from "./renderPage";
import { createProjectElement } from "./projectDOM";
import { renderCalendar } from "./calendarDOM";

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

function handleCreateTask() {
  const taskDialog = document.querySelector("#tasks");

  const selectPriorityButton = taskDialog.querySelector(".select-priority");
  const dropdownList = taskDialog.querySelector(".dropdown-list");
  const selectDateButton = taskDialog.querySelector(".select-date");
  const calendar = taskDialog.querySelector(".calendar");
  const cancelButton = taskDialog.querySelector(".cancel");
  const addButton = taskDialog.querySelector(".add");

  function handleSelectDate() {
    calendar.classList.toggle("hide");
  }

  function handleSelectPriority() {
    dropdownList.classList.toggle("hide");
  }

  function handleCalendar() {
    if (event.target.matches(".date")) {
      // task.setDueDate()
      // target.textconent = date
      // calendar.style.opacity = 0;
      calendar.classList.toggle("hide");
      selectDateButton.textContent = event.target.id;
    }
  }

  function handleDropdownList() {
    if (event.target.matches(".dropdown-option")) {
      selectPriorityButton.textContent = event.target.textContent;
      // task.setPriority(event.target.textContent);

      // console.log("now here");
      // console.log(task.getPriority());
      dropdownList.classList.toggle("hide");
      // console.log(options.classList);
    }
  }

  function handleAddButton() {
    const title = taskDialog.querySelector(".form-title").value;
    const description = taskDialog.querySelector("#form-description").value;
    const completedStatus = false;

    if (
      title.trim() === "" ||
      title.length > 45 ||
      selectDateButton.textContent === "Select date" ||
      selectPriorityButton.textContent === "Select priority"
    ) {
      return;
    }
    const dueDate = new Date(selectDateButton.textContent);
    const priority = selectPriorityButton.textContent;

    const sidebar = document.querySelector(".sidebar");
    const activePage = sidebar
      .querySelector(".active")
      .querySelector("span").textContent;

    const project = projectList.getProject(activePage);
    const taskExists = project.getTasks().some((task) => {
      return (
        task.getTitle() === title &&
        task.getDescription() === description &&
        task.getDueDate().getTime() === dueDate.getTime() &&
        task.getPriority() === priority
      );
    });
    if (taskExists) {
      taskDialog.querySelector(".form-submit span").textContent =
        "Cannot create duplicate tasks.";
      return;
    }

    project.addTask(
      new Task(title, description, dueDate, priority, completedStatus)
    );

    function resetForm() {
      taskDialog.querySelector("form").reset();
      selectDateButton.textContent = "Select date";
      selectPriorityButton.textContent = "Select priority";
      renderCalendar(new Date().getFullYear(), new Date().getMonth());
      taskDialog.querySelector(".form-submit span").textContent = "";
      taskDialog.close();
      detachDialogListeners();
    }
    renderPage(activePage, true);
    resetForm();
  }

  function attachDialogListeners() {
    selectDateButton.addEventListener("click", handleSelectDate);
    selectPriorityButton.addEventListener("click", handleSelectPriority);
    calendar.addEventListener("click", handleCalendar);
    dropdownList.addEventListener("click", handleDropdownList);
    addButton.addEventListener("click", handleAddButton);
  }

  function detachDialogListeners() {
    selectDateButton.removeEventListener("click", handleSelectDate);
    selectPriorityButton.removeEventListener("click", handleSelectPriority);
    calendar.removeEventListener("click", handleCalendar);
    dropdownList.removeEventListener("click", handleDropdownList);
    addButton.removeEventListener("click", handleAddButton);
  }

  cancelButton.addEventListener(
    "click",
    () => {
      taskDialog.close();
      detachDialogListeners();
    },
    { once: true }
  );

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
  attachDialogListeners();
}

function handleCreateProject() {
  const projectDialog = document.querySelector("#projects");
  projectDialog.showModal();

  const cancelButton = projectDialog.querySelector(".cancel");
  const addButton = projectDialog.querySelector(".add");

  cancelButton.addEventListener(
    "click",
    () => {
      projectDialog.close();
      addButton.removeEventListener("click", handleAddButton);
    },
    { once: true }
  );

  const title = projectDialog.querySelector(".form-title");
  const errorBox = document.querySelector(".error-box");
  title.addEventListener("blur", () => {
    if (title.value.trim() === "" || title.value.length > 45) {
      title.classList.add("invalid");
      errorBox.style.opacity = 1;
    } else {
      title.classList.remove("invalid");
      errorBox.style.opacity = 0;
    }
  });

  function handleAddButton() {
    if (title.classList.contains("invalid")) return;
    createProjectElement(title.value.trim());
    renderPage(title.value.trim(), true);
    projectDialog.querySelector("form").reset();
    projectDialog.close();
    addButton.removeEventListener("click", handleAddButton);
  }
  addButton.addEventListener("click", handleAddButton);
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
