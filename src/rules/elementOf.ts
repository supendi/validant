import { PossiblyUndefined } from "../types/ErrorOf";
import { ValidateFunc } from "../types/ValidationRule";

/**
 * Specifies the rule if a value is an element of the specified array.
 * @param array The array of valid elements.
 * @param errorMessage Optional custom error message.
 */
export const elementOf = <TValue, TObject extends Object>(array: TValue[], errorMessage?: string): ValidateFunc<PossiblyUndefined<TValue>, TObject> => {

  if (!Array.isArray(array)) {
    throw new Error(`${elementOf.name}: Expected an array but received ${typeof array}.`)
  }

  return (value) => {
    const violation = {
      ruleName: elementOf.name,
      attemptedValue: value,
      errorMessage: errorMessage ?? `The value ':value' is not an element of [${array.join(", ")}].`
    }

    if (!array || !array.includes(value)) {
      return violation
    }
  };
};
