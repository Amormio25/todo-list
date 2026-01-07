import { isToday, isThisWeek } from "date-fns";
import projectList from "./projectList";

// current setup
// tasks are accessed through this flow:
//     projectList -> getProjects -> getTasks (for each project)
// once we get all tasks then we can have different functions to filter

const getAllTasks = () => {
  const projects = projectList.getProjectList();
  let tasks = [];
  projects.forEach((project) => {
    tasks = tasks.concat(project.getTasks());
  });
  return tasks;
};

const getTodayTasks = () => {
  const tasks = getAllTasks();
  return tasks.filter((task) => isToday(task.getDueDate()));
};

const getUpcomingTasks = () => {
  const tasks = getAllTasks();
  return tasks.filter((task) => isThisWeek(task.getDueDate()));
};

const getImportantTasks = () => {
  const tasks = getAllTasks();
  return tasks.filter((task) => task.getPriority() === "High");
};

const getCompletedTasks = () => {
  const tasks = getAllTasks();
  return tasks.filter((task) => task.getCompletedStatus() === true);
};

export {
  getAllTasks,
  getTodayTasks,
  getUpcomingTasks,
  getImportantTasks,
  getCompletedTasks,
};
