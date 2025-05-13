import { PossiblyUndefined, PropertyRuleFunc } from "../types";

/**
 * Specifies the rule if a value is an element of the specified array.
 * @param list The array of valid elements.
 * @param errorMessage Optional custom error message.
 */
export const elementOf = <TValue, TObject>(
  list: TValue[],
  errorMessage?: string
): PropertyRuleFunc<PossiblyUndefined<TValue>, TObject> => {
  if (!list) {
    console.warn(`elementOf: the list is ${list}`);
  }

  const msg = errorMessage ?? `The value ':value' is not an element of [${list.join(", ")}].`;

  return (value) => {
    if (!list || !list.includes(value)) {
      return {
        isValid: false,
        errorMessage: msg,
      };
    }

    return {
      isValid: true,
      errorMessage: msg,
    };
  };
};
