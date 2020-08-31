"use strict";
// Generics extending types - constraints
const merge = (obj1, obj2) => Object.assign(obj1, obj2);
console.log(merge({ name: 'Wax' }, { age: 30 }));
// keyof constraint
const extractAndConvert = (obj, key) => 'Value: ' + obj[key];
