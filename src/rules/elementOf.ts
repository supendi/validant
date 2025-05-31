import { PossiblyUndefined } from "../types/ErrorOf";
import { ValidateFunc } from "../types/ValidationRule";
import { stringifyValue } from "./stringifyValue";

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
    const stringifiedValue = stringifyValue(value)
    let resolvedErrorMessage = errorMessage ?? `The value '${stringifiedValue}' is not an element of [${array.join(", ")}].`

    const violation = {
      ruleName: elementOf.name,
      attemptedValue: value,
      errorMessage: resolvedErrorMessage
    }

    if (!array || !array.includes(value)) {
      return violation
    }
  };
};
