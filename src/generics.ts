// Generics extending types - constraints

const merge = <T extends object, U extends object>(obj1: T, obj2: U) =>
  Object.assign(obj1, obj2);

console.log(merge({ name: 'Wax' }, { age: 30 }));

// keyof constraint

const extractAndConvert = <T extends object, U extends keyof T>(
  obj: T,
  key: U
) => 'Value: ' + obj[key];
