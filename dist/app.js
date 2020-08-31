"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Logger = (logString) => (constructor) => {
    console.log(logString);
    console.log(constructor);
};
const WithTemplate = (template, hookId) => (constructor) => {
    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
        hookEl.innerHTML = template;
        hookEl.querySelector('h1').textContent = p.name;
    }
};
// decorators for classes are invoked when TS compiler finds declaration of a decorated class
// @Logger('logging Person class definition')
let Person = class Person {
    constructor() {
        this.name = 'Alex';
        console.log('Creating person object');
    }
};
Person = __decorate([
    WithTemplate('<h1>Some text</h1>', 'root')
], Person);
const person = new Person();
console.log(person.name);
