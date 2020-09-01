import Component from './Component';
import Project from './Project';

import { ProjectStatus } from './enums';
import projectState from './ProjectState';

export default class ProjectList extends Component<
  HTMLDivElement,
  HTMLElement
> {
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((project) => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.ACTIVE;
        }
        return project.status === ProjectStatus.FINISHED;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    this.assignedProjects.forEach((project) => {
      const listItem = document.createElement('li');
      listItem.textContent = project.title;
      listEl.appendChild(listItem);
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;

    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  configureForm = () => {};
}
