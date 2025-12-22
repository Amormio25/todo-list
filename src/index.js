import Task from "./modules/task";
import Project from "./modules/project";
import ProjectList from "./modules/projectList";
import { updateCalendar } from "./modules/calendar";
import "./assets/css/reset.css";
import "./assets/css/style.css";
import { appendCalendarTo } from "./modules/calendarDOM";

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
// const item2 = new Task("testT", "testDesc", "testDue", "testP", "testC");

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

const formDetailsContainer = document.querySelector(".form-details");
appendCalendarTo(formDetailsContainer);
