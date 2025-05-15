import { PossiblyUndefined } from "../types/ErrorOf";
import { PropertyRuleFunc } from "../types/ValidationRule";

/**
 * Array minimum length rule.
 * @param minLen the min lenght of array
 * @param errorMessage custom error message or default returned.
 * @returns 
 */
export const arrayMinLen = <TValue, TObject extends Object>(minLen: number, errorMessage?: string): PropertyRuleFunc<PossiblyUndefined<TValue[]>, TObject> => {

    if (minLen < 0) {
        throw new Error(`${arrayMinLen.name}: The minimum length should be non negative or positive number. Your input was: ${minLen}`)
    }

    return (array) => {

        const finalErrorMessage = errorMessage ?? `The minimum length for this field is ${minLen}.`;

        if (!array) {
            return {
                isValid: false,
                errorMessage: finalErrorMessage,
            };
        }

        if (!Array.isArray(array)) {
            throw new Error(`${arrayMinLen.name}: Expected an array but received ${typeof array}.`)
        }

        const isValid = array.length >= minLen
        if (!isValid) {
            return {
                isValid,
                errorMessage: finalErrorMessage,
            };
        }

        return {
            isValid
        }

    };
};
