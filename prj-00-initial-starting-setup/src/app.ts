// project state management

class ProjectState {
  private listeners: any[] = [];
  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  addListener(listener: Function) {
    this.listeners.push(listener);
  }

  addProject(title: string, description: string, peopleQty: number) {
    const newProject = {
      id: Math.random().toString(),
      title,
      description,
      people: peopleQty,
    };

    this.projects.push(newProject);

    for (const listener of this.listeners) {
      listener([...this.projects]);
    }
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new ProjectState();
    return this.instance;
  }
}

const projectState = ProjectState.getInstance();

// validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minimalInputLength?: number;
  maximalInputLength?: number;
  minimalNumberLength?: number;
  maximalNumberLength?: number;
}

const validate = (validatableInput: Validatable) => {
  let isValid = true;

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  if (
    validatableInput.minimalInputLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid &&
      validatableInput.value.length >= validatableInput.minimalInputLength;
  }

  if (
    validatableInput.maximalInputLength != null &&
    typeof validatableInput.value === 'string'
  ) {
    isValid =
      isValid &&
      validatableInput.value.length <= validatableInput.maximalInputLength;
  }

  if (
    validatableInput.minimalNumberLength != null &&
    typeof validatableInput.value === 'number'
  ) {
    isValid =
      isValid && validatableInput.value >= validatableInput.minimalNumberLength;
  }

  if (
    validatableInput.maximalNumberLength != null &&
    typeof validatableInput.value === 'number'
  ) {
    isValid =
      isValid && validatableInput.value <= validatableInput.maximalNumberLength;
  }
  return isValid;
};

// autobind decorator
const Autobind = (
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundMethod = originalMethod.bind(this);
      return boundMethod;
    },
  };

  return adjustedDescriptor;
};

class Project {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLUListElement;
  listItemElement: HTMLElement;

  constructor() {
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

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  sectionElement: HTMLElement;
  assignedProjects: any[];

  constructor(private type: 'active' | 'finished') {
    this.assignedProjects = [];
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.sectionElement = importedNode.firstElementChild! as HTMLElement;
    this.sectionElement.id = `${this.type}-projects`;

    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attachNode();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    this.assignedProjects.forEach((project) => {
      const listItem = document.createElement('li');
      listEl.textContent = project.title;
      listEl.appendChild(listItem);
    });
  }

  private attachNode() {
    this.hostElement.insertAdjacentElement('beforeend', this.sectionElement);
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;

    this.sectionElement.querySelector('ul')!.id = listId;
    this.sectionElement.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }
}

class ProjectInputForm {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  formElement: HTMLFormElement;
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleQtyInput: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.formElement = importedNode.firstElementChild! as HTMLFormElement;
    this.formElement.id = 'user-input';

    this.titleInput = this.formElement.querySelector(
      '#title'
    )! as HTMLInputElement;
    this.descriptionInput = this.formElement.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleQtyInput = this.formElement.querySelector(
      '#people'
    )! as HTMLInputElement;

    this.attachNode();
    this.configureForm();
  }

  private configureForm() {
    this.formElement.addEventListener('submit', this.handleSubmit);
  }

  @Autobind
  private handleSubmit(e: Event) {
    e.preventDefault();

    const userInput = this.getUserInput();

    if (Array.isArray(userInput)) {
      const [title, description, peopleQuantity] = userInput;
      projectState.addProject(title, description, peopleQuantity);
      this.clearInputs();
    }
  }

  private clearInputs() {
    this.titleInput.value = '';
    this.descriptionInput.value = '';
    this.peopleQtyInput.value = '';
  }

  private getUserInput(): [string, string, number] | void {
    const title = this.titleInput.value;
    const description = this.descriptionInput.value;
    const peopleQuantity = this.peopleQtyInput.value;

    const validatableTitle: Validatable = {
      value: title,
      required: true,
      minimalInputLength: 5,
    };
    const validatableDescription: Validatable = {
      value: description,
      required: true,
      minimalInputLength: 5,
    };
    const validatablePeopleQuantity: Validatable = {
      value: +peopleQuantity,
      required: true,
      minimalNumberLength: 1,
    };

    if (
      !(
        validate(validatableTitle) &&
        validate(validatableDescription) &&
        validate(validatablePeopleQuantity)
      )
    ) {
      alert('Please check your inputs and try submitting again');
      return;
    }

    return [title, description, +peopleQuantity];
  }

  private attachNode() {
    this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
  }
}

const projectInputForm = new ProjectInputForm();
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');
