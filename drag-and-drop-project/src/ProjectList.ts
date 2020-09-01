import Component from './Component';
import Project from './Project';

import { ProjectStatus } from './enums';
import projectState from './ProjectState';
import ProjectItem from './ProjectItem';
import { DragTarget } from './interfaces';

export default class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    this.assignedProjects.forEach((project) => {
      new ProjectItem(this.element.querySelector('ul')!.id, project);
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;

    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  configure = () => {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

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
  };

  dragOverHandler = (event: DragEvent) => {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  };

  dropHandler = (event: DragEvent) => {
    const projectId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      projectId,
      this.type === 'active' ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED
    );
  }

  dragLeaveHandler = (_event: DragEvent) => {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  };
}
