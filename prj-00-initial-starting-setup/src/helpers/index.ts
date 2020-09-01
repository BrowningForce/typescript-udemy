import { Validatable } from '../interfaces';

export const validate = (validatableInput: Validatable) => {
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
