import { ProjectStatus } from './enums';

export default class Project{
  templateElement: HTMLTemplateElement;
  hostElement: HTMLUListElement;
  listItemElement: HTMLElement;

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {
    this.templateElement = document.getElementById(
      'single-project'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(
      'active-projects-list'
    )! as HTMLUListElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.listItemElement = importedNode.firstElementChild! as HTMLElement;
    this.listItemElement.className = 'project';

    this.attachNode();
  }

  private attachNode() {
    this.hostElement.insertAdjacentElement('afterbegin', this.listItemElement);
  }
}
