import { PossiblyUndefined, PropertyRuleFunc } from "../types";

/**
 * Specifies the minimum length of an array.
 * @param min The minimum number of elements required.
 * @param errorMessage Optional custom error message.
 */
export const arrayMinLen = <TValue, TObject>(
    min: number,
    errorMessage?: string
): PropertyRuleFunc<PossiblyUndefined<TValue[]>, TObject> => {
    const msg = errorMessage ?? `The minimum length for this field is ${min}.`;

    return (value) => {
        if (!value || !Array.isArray(value)) {
            return {
                isValid: false,
                errorMessage: msg,
            };
        }

        if (min < 1) {
            console.warn("arrayMinLen: min length should be > 0");
            return {
                isValid: false,
                errorMessage: msg,
            };
        }

        return {
            isValid: value.length >= min,
            errorMessage: msg,
        };
    };
};
