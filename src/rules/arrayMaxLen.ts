import { PossiblyUndefined, PropertyRuleFunc } from "../types";

/**
 * Specifies the rule of the maximum number of elements allowed in an array.
 */
export const arrayMaxLen = <TValue, TObject>(
  max: number,
  errorMessage?: string
): PropertyRuleFunc<PossiblyUndefined<TValue[]>, TObject> => {
  const msg = errorMessage ?? `The maximum length for this field is ${max}.`;


  const ruleFunc: PropertyRuleFunc<PossiblyUndefined<TValue[]>, TObject> = (value: TValue[], object: TObject) => {
    if (!value || !Array.isArray(value)) {
      return {
        isValid: false,
        errorMessage: msg
      }
    }

    if (max < 0) {
      console.warn(`arrayMaxLen: max length should be >= 0`);
      return {
        isValid: false,
        errorMessage: msg
      };
    }

    const isValid = value.length <= max;
    return {
      isValid,
      errorMessage: isValid ? "" : msg
    };
  }

  return ruleFunc
};
