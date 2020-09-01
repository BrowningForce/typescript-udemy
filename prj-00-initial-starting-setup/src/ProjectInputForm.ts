import Component from './Component';
import projectState from './ProjectState';

import { validate } from './helpers';
import { Validatable } from './interfaces';

export default class ProjectInputForm extends Component<
  HTMLDivElement,
  HTMLFormElement
> {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleQtyInput: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInput = this.element.querySelector(
      '#title'
    )! as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;
    this.peopleQtyInput = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;

    this.configure();
  }
  
  renderContent() {}
  
  configure() {
    this.element.addEventListener('submit', this.handleSubmit);
  }

  private handleSubmit = (e: Event) => {
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
      !validate(validatableTitle) ||
      !validate(validatableDescription) ||
      !validate(validatablePeopleQuantity)
    ) {
      alert('Please check your inputs and try submitting again');
      return;
    }

    return [title, description, +peopleQuantity];
  }
}
