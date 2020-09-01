export const Autobind = (
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
