import Project from './Project';
import { ProjectStatus } from './enums';
import State from './abstractClasses/State';

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  addProject(title: string, description: string, peopleQty: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      peopleQty,
      ProjectStatus.ACTIVE
    );

    this.projects.push(newProject);

    this.updateListeners();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
    }
    this.updateListeners();
  }

  private updateListeners() {
    this.listeners.forEach((listener) => listener(this.projects.slice()));
  }
}

export default ProjectState.getInstance();
