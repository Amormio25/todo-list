import Task from "./modules/task";
import Project from "./modules/project";
import projectList from "./modules/projectList";
// import { updateCalendar } from "./modules/calendar";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import "./modules/calendarDOM";
import { displayWebsite } from "./modules/displayController";

// projectList.addProject("Project");
// const proj = projectList.getProject("Project");
// proj.addTask(
//   new Task(
//     "testT",
//     "I need to write some random stuff to test I need to write some random stuff to test I need to write some random stuff to test",
//     new Date(),
//     "High",
//     "false"
//   )
// );
// console.log(projectList.getProjectList());
// console.log(proj.getTasks());
/************** MAY HAVE TO UPDATE MODULE PARAMETERS LATER ON ***************/
// for example, when interacting with DOM to delete project, will clicking its
// div return its title and then parse the list for the title?
// Or should it return its index and simply remove the index from projectList?

//************************* ProjectList test ***************************/
// const list = new ProjectList();
// console.log(list.getProjectList());

// list.addProject("New project");
// console.log(list.getProjectList());

// console.log(list.getProject("New project"));
// list.removeProject(list.getProject("New project"));
// console.log(list.getProjectList());

// CHECK IF ANY FUNCTIONS NEED OTHER RETURN STATEMENTS

/*********************** Project and Task test ************************/
// const proj = new Project("Project");
// const item = new Task("testT", "testDesc", "testDue", "testP", "testC");
// const item2 = new Task("testT", "testDesc", new Date(), "testP", "testC");

// console.log(item.getTitle());

// proj.addTask(item);
// console.log(proj.getTasks());
// proj.addTask(item2);
// console.log("should not be 2 tasks below");
// console.log(proj.getTasks());

// proj.removeTask(item);
// console.log(proj.getTasks());
// console.log(proj.getProjectTitle());

/******************************** Plan *********************************/
// create basic ui with grid
// create dialog popups for new project and new task
//      these popups should take a form and use the ctors to create the objects
// for editing, have the same popup but since we're not creating a new object
//      find a way to use the getters and setters to do the work

// todo
// create add task button
// create different pages for the sidebar links
//      first update the heading
//      then by using filter, find # of tasks and display
//      for tasks not due today, display from closest to farthest due
// then handle adding new tasks and displaying after adding
//      take into account how it would need to update all displays for each
//      sidebar option
// document.addEventListener("click", (e) => {
//   console.log(`You clicked on: ${e.target.className}`);
//   if (
//     e.target.closest(".sidebar-item") &&
//     e.target.textContent.trim() === "All"
//   ) {
//     loadAllTasks();
//   } else if (
//     e.target.closest(".sidebar-item") &&
//     e.target.textContent.trim() === "Upcoming"
//   ) {
//     loadUpcomingTasks();
//   }
// });
displayWebsite();
// after creating dom logic for going through different task filters,
// try actually creating a task and see if it will pop up there
// or if only the html is currently displaying
