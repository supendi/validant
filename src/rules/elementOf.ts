import { PossiblyUndefined, PropertyRuleFunc } from "../types";

/**
 * Specifies the rule if a value is an element of the specified array.
 * @param array The array of valid elements.
 * @param errorMessage Optional custom error message.
 */
export const elementOf = <TValue, TObject extends Object>(array: TValue[], errorMessage?: string): PropertyRuleFunc<PossiblyUndefined<TValue>, TObject> => {

  if (!Array.isArray(array)) {
    throw new Error(`${elementOf.name}: Expected an array but received ${typeof array}.`)
  }

  return (value) => {
    const finalErrorMessage = errorMessage ?? `The value ':value' is not an element of [${array.join(", ")}].`;

    if (!array || !array.includes(value)) {
      return {
        isValid: false,
        errorMessage: finalErrorMessage,
      };
    }

    return {
      isValid: true
    };
  };
};
