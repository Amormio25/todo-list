import { isToday, isThisWeek } from "date-fns";
import projectList from "./projectList";

const taskManager = {
  getAllTasks: () => {
    const projects = projectList.getProjectList();
    let tasks = [];
    projects.forEach((project) => {
      tasks = tasks.concat(project.getTasks());
    });
    return tasks;
  },
  getTodayTasks: () => {
    const tasks = taskManager.getAllTasks();
    return tasks.filter((task) => isToday(task.getDueDate()));
  },

  getUpcomingTasks: () => {
    const tasks = taskManager.getAllTasks();
    return tasks.filter((task) => isThisWeek(task.getDueDate()));
  },

  getImportantTasks: () => {
    const tasks = taskManager.getAllTasks();
    return tasks.filter((task) => task.getPriority() === "High");
  },

  getCompletedTasks: () => {
    const tasks = taskManager.getAllTasks();
    return tasks.filter((task) => task.getCompletedStatus() === true);
  },
};

export { taskManager };
