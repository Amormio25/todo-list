import Task from "./task";
import projectList from "./projectList";
import { renderPage } from "./renderPage";
import { createProjectElement } from "./projectDOM";
import { renderCalendar } from "./calendarDOM";

// helpers
function taskExists(title, description, dueDate, priority) {
  const projects = projectList.getProjectList();
  return projects.some((project) =>
    project
      .getTasks()
      .some(
        (task) =>
          task.getTitle() === title &&
          task.getDescription() === description &&
          task.getDueDate().getTime() === dueDate &&
          task.getPriority() === priority
      )
  );
}

function findTaskInProjects(id) {
  const projects = projectList.getProjectList();
  for (const project of projects) {
    const task = project.getTask(id);
    if (task) {
      return task;
    }
  }
  return undefined;
}

function getActivePage(sidebar) {
  return sidebar.querySelector(".active").querySelector("span").textContent;
}

function getActiveProject(sidebar) {
  const activePage = sidebar
    .querySelector(".active")
    .querySelector("span").textContent;

  return projectList.getProject(activePage);
}

function isProjectPage(activePage) {
  const TASK_FILTERS = new Set([
    "All",
    "Today",
    "Upcoming",
    "Important",
    "Completed",
  ]);
  return !TASK_FILTERS.has(activePage);
}

// main handlers
function handleScreenChange(sidebar) {
  if (sidebar.classList.contains("open")) {
    sidebar.classList.remove("open");
  }
}

function toggleSidebar(sidebar) {
  const body = document.body;
  const mql = matchMedia("(max-width: 768px)");

  if (mql.matches) {
    // within the width should not change grid-tcs
    sidebar.classList.toggle("open");
    body.classList.remove("collapsed");
    sidebar.classList.remove("collapsed");
  } else {
    // outside width should change grid-tcs
    body.classList.toggle("collapsed");
    sidebar.classList.toggle("collapsed");
  }
}

function openTaskForm(target, sidebar, option) {
  handleScreenChange(sidebar);
  if (handleTaskUpdates(target, sidebar)) return;

  const taskDialog = document.querySelector("#tasks");
  let formTitle = taskDialog.querySelector(".form-title");
  let formDescription = taskDialog.querySelector(".form-description");
  const selectPriorityButton = taskDialog.querySelector(".select-priority");
  const dropdownList = taskDialog.querySelector(".dropdown-list");
  const selectDateButton = taskDialog.querySelector(".select-date");
  const calendar = taskDialog.querySelector(".calendar");
  const cancelButton = taskDialog.querySelector(".cancel");
  const submitButton = taskDialog.querySelector(".add");
  submitButton.textContent = option;

  const resetForm = () => {
    submitButton.textContent = option;
    selectDateButton.textContent = "Select date";
    selectPriorityButton.textContent = "Select priority";
    renderCalendar(new Date().getFullYear(), new Date().getMonth());
    taskDialog.querySelector("form").reset();
    taskDialog.querySelector(".form-submit span").textContent = "";
    taskDialog.close();
    detachListeners();
  };

  const populateForm = () => {
    if (option !== "Update") return;

    const taskItem = target.closest(".task-item");

    const task = findTaskInProjects(taskItem.id);
    formTitle.value = task.getTitle();
    formDescription.value = task.getDescription();

    const date = task.getDueDate();
    selectDateButton.textContent = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    selectPriorityButton.textContent = task.getPriority();
  };

  const handleSubmit = () => {
    if (
      formTitle.value.trim() === "" ||
      formTitle.value.length > 45 ||
      selectDateButton.textContent === "Select date" ||
      selectPriorityButton.textContent === "Select priority"
    ) {
      return;
    }
    const dueDate = new Date(selectDateButton.textContent);
    const priority = selectPriorityButton.textContent;

    if (taskExists(formTitle, formDescription, dueDate.getTime(), priority)) {
      taskDialog.querySelector(".form-submit span").textContent =
        "Cannot create duplicate tasks.";
      return;
    }
    if (option === "Create") {
      const project = getActiveProject(sidebar);
      project.addTask(
        new Task(
          formTitle.value,
          formDescription.value,
          dueDate,
          priority,
          false
        )
      );
    } else {
      const taskItem = target.closest(".task-item");
      const task = findTaskInProjects(taskItem.id);
      task.setTitle(formTitle.value);
      task.setDescription(formDescription.value);
      task.setDueDate(dueDate);
      task.setPriority(priority);
    }
    resetForm();
    renderPage(getActivePage(sidebar), isProjectPage(getActivePage(sidebar)));
  };

  const handleSelectDate = () => {
    calendar.classList.toggle("hide");
  };

  const handleSelectPriority = () => {
    dropdownList.classList.toggle("hide");
  };

  const handleCalendar = (event) => {
    if (event.target.matches(".date")) {
      calendar.classList.toggle("hide");
      selectDateButton.textContent = event.target.id;
    }
  };

  const handleDropdownList = (event) => {
    if (event.target.matches(".dropdown-option")) {
      selectPriorityButton.textContent = event.target.textContent;
      dropdownList.classList.toggle("hide");
    }
  };

  const attachListeners = () => {
    selectDateButton.addEventListener("click", handleSelectDate);
    selectPriorityButton.addEventListener("click", handleSelectPriority);
    calendar.addEventListener("click", handleCalendar);
    dropdownList.addEventListener("click", handleDropdownList);
    submitButton.addEventListener("click", handleSubmit);
  };

  const detachListeners = () => {
    selectDateButton.removeEventListener("click", handleSelectDate);
    selectPriorityButton.removeEventListener("click", handleSelectPriority);
    calendar.removeEventListener("click", handleCalendar);
    dropdownList.removeEventListener("click", handleDropdownList);
    submitButton.removeEventListener("click", handleSubmit);
  };

  // handle form escapes
  cancelButton.addEventListener(
    "click",
    () => {
      if (option === "Update") resetForm();
      taskDialog.close();
      detachListeners();
    },
    { once: true }
  );
  document.addEventListener(
    "keypress",
    (event) => {
      if (event.key === "Escape") {
        detachDialogListeners();
        if (option === "Update") resetForm();
      }
    },
    { once: true }
  );

  // collapse when clicking away
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

  // resetForm();
  populateForm();
  attachListeners();
  taskDialog.showModal();
}

function handleCreateProject(sidebar) {
  handleScreenChange(sidebar); // close sidebar if create project button clicked

  const projectDialog = document.querySelector("#projects");
  const cancelButton = projectDialog.querySelector(".cancel");
  const addButton = projectDialog.querySelector(".add");
  const title = projectDialog.querySelector(".form-title");
  const errorBox = document.querySelector(".error-box");

  function resetDialog() {
    projectDialog.close();
    title.classList.remove("invalid");
    errorBox.style.opacity = 0;
    addButton.removeEventListener("click", handleAddButton);
  }

  function handleAddButton() {
    if (title.classList.contains("invalid") || title.value.trim() === "")
      return;
    createProjectElement(title.value.trim());
    renderPage(title.value.trim(), true);
    resetDialog();
    projectDialog.querySelector("form").reset();
  }

  addButton.addEventListener("click", handleAddButton);

  cancelButton.addEventListener("click", () => resetDialog(), { once: true });

  document.addEventListener(
    "keypress",
    (event) => {
      if (event.key === "Escape") resetDialog();
    },
    { once: true }
  );

  title.addEventListener("blur", () => {
    if (title.value.trim() === "" || title.value.length > 45) {
      title.classList.add("invalid");
      errorBox.style.opacity = 1;
    } else {
      title.classList.remove("invalid");
      errorBox.style.opacity = 0;
    }
  });

  projectDialog.showModal();
}

function handleTaskUpdates(target, sidebar) {
  const taskItem = target.closest(".task-item");
  if (target.matches(".task-checkbox")) {
    target.classList.toggle("complete");
    setTimeout(() => {
      const task = findTaskInProjects(taskItem.id);
      task.setCompletedStatus(target.classList.contains("complete"));
      renderPage(getActivePage(sidebar), isProjectPage(getActivePage(sidebar)));
    }, 500);
    return true;
  } else if (target.closest(".delete")) {
    const projects = projectList.getProjectList();
    for (const project of projects) {
      const task = project.getTask(taskItem.id);
      if (task) {
        project.removeTask(task);
        renderPage(
          getActivePage(sidebar),
          isProjectPage(getActivePage(sidebar))
        );
        return true;
      }
    }
  }
  return false;
}

function setActivePage(target, sidebar) {
  const sidebarItem = target.closest(".sidebar-item");
  if (target.closest(".sidebar-item--header")) return;

  const linkText = sidebarItem
    .querySelector(".sidebar-link span")
    .textContent.trim();

  const activePage = sidebar.querySelector(".active");
  activePage.classList.remove("active");
  sidebarItem.classList.add("active");

  const isProject = target.closest(".sidebar-item.project-item");
  renderPage(linkText, isProject);
}

function displayWebsite() {
  createProjectElement("Home");
  renderPage("Home", true);

  const sidebar = document.querySelector(".sidebar");
  window.addEventListener("resize", () => handleScreenChange(sidebar));
  document.addEventListener("click", (event) => {
    const target = event.target;

    if (target.closest(".sidebar-toggle")) toggleSidebar(sidebar);
    else if (target.closest(".view-add-tasks"))
      openTaskForm(target, sidebar, "Create");
    else if (target.closest("#add-project")) handleCreateProject(sidebar);
    else if (target.closest(".task-item"))
      openTaskForm(target, sidebar, "Update");
    else if (target.closest(".sidebar-item")) setActivePage(target, sidebar);
    else if (!target.closest(".sidebar") && sidebar.classList.contains("open"))
      sidebar.classList.remove("open");
  });
}

export { displayWebsite };
