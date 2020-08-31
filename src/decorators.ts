const Logger = (logString: string) => (constructor: Function) => {
  console.log(logString);
  console.log(constructor);
};

const WithTemplate = (template: string, hookId: string) => (
  constructor: any
) => {
  const hookEl = document.getElementById(hookId);
  const p = new constructor();
  if (hookEl) {
    hookEl.innerHTML = template;
    hookEl.querySelector('h1')!.textContent = p.name;
  }
};

// decorators for classes are invoked when TS compiler finds declaration of a decorated class
// @Logger('logging Person class definition')
@WithTemplate('<h1>Some text</h1>', 'root')
class Person {
  readonly name: string;

  constructor() {
    this.name = 'Alex';
    console.log('Creating person object');
  }
}

const person = new Person();

console.log(person.name);
