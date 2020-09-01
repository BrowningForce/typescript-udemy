export interface Validatable {
  value: string | number;
  required?: boolean;
  minimalInputLength?: number;
  maximalInputLength?: number;
  minimalNumberLength?: number;
  maximalNumberLength?: number;
}
