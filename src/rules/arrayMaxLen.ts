import { PossiblyUndefined, PropertyRuleFunc } from "../types";

/**
 * Maximum length of array rule.
 * @param maxLen the maximum length of array
 * @param errorMessage custome error message or default returned.
 * @returns 
 */
export function arrayMaxLen<TValue, TObject extends Object>(maxLen: number, errorMessage?: string): PropertyRuleFunc<PossiblyUndefined<TValue[]>, TObject> {

  if (maxLen < 0) {
    throw new Error(`${arrayMaxLen.name}: The maximum length should be non negative and positive number. Your input was: ${maxLen}`)
  }
  
  return (array, object) => {

    const finalErrorMessage = errorMessage ?? `The maximum length for this field is ${maxLen}.`;

    if (!array) {
      return {
        isValid: false,
        errorMessage: finalErrorMessage
      }
    }

    if (!Array.isArray(array)) {
      throw new Error(`${arrayMaxLen.name}: Expected an array but received ${typeof array}.`)
    }

    const isValid = array.length <= maxLen;

    if (!isValid) {
      return {
        isValid,
        errorMessage: finalErrorMessage
      };
    }

    return {
      isValid
    }
  }
};
