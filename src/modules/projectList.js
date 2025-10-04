import Project from "./project";

export default class ProjectList {
    #projectList = [];

    constructor() {
        this.#projectList = [ 
            new Project("Default Project") 
        ];
    }

    addProject(title) {
        this.#projectList.push(new Project(title));
    }

    removeProject(project) {
        this.#projectList = this.#projectList.filter(item => item !== project);
    }

    getProjectList() {
        return [...this.#projectList];
    }

    getProject(title) {
        return this.#projectList.find(project => project.getProjectTitle() === title);
    }
}