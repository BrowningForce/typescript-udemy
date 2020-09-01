import Component from './Component';
import Project from './Project';
import { Draggable } from './interfaces';

export default class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);

    this.project = project;

    this.configure();
    this.renderContent();
  }

  dragStartHandler = (event: DragEvent) => {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  };

  dragEndHandler = (_: DragEvent) => {
    console.log('Event end');
  };

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = `${
      this.project.people
    } assigned member${this.project.people > 1 ? 's' : ''}`;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
