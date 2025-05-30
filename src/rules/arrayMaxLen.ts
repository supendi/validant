import { PossiblyUndefined } from "../types/ErrorOf";
import { ValidateFunc } from "../types/ValidationRule";

/**
 * Maximum length of array rule.
 * @param maxLen the maximum length of array
 * @param errorMessage custome error message or default returned.
 * @returns 
 */
export function arrayMaxLen<TValue, TObject extends Object>(maxLen: number, errorMessage?: string): ValidateFunc<PossiblyUndefined<TValue[]>, TObject> {

  if (maxLen < 0) {
    throw new Error(`${arrayMaxLen.name}: The maximum length should be non negative and positive number. Your input was: ${maxLen}`)
  }

  return (array, object) => {
    const violation = {
      ruleName: arrayMaxLen.name,
      attemptedValue: array,
      errorMessage: errorMessage ?? `The maximum length for this field is ${maxLen}.`
    }

    const isNullOrUndefined = array === null || array === undefined;
    const isArray = Array.isArray(array);

    if (!isArray && !isNullOrUndefined) {
      throw new Error(`${arrayMaxLen.name}: Expected an array but received ${typeof array}.`)
    }

    const isValid = isNullOrUndefined || array.length <= maxLen;

    if (!isValid) {
      return violation;
    }
  }
};
