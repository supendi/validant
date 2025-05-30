import { PossiblyUndefined } from "../types/ErrorOf";
import { ValidateFunc } from "../types/ValidationRule";

/**
 * Array minimum length rule.
 * @param minLen the min lenght of array
 * @param errorMessage custom error message or default returned.
 * @returns 
 */
export const arrayMinLen = <TValue, TObject extends Object>(minLen: number, errorMessage?: string): ValidateFunc<PossiblyUndefined<TValue[]>, TObject> => {

    if (minLen < 0) {
        throw new Error(`${arrayMinLen.name}: The minimum length should be non negative or positive number. Your input was: ${minLen}`)
    }

    return (array) => {
        const isNullOrUndefined = array === null || array === undefined;
        const isArray = Array.isArray(array);

        if (!isArray && !isNullOrUndefined) {
            throw new Error(`${arrayMinLen.name}: Expected an array but received ${typeof array}.`)
        }
        
        const violation = {
            ruleName: arrayMinLen.name,
            attemptedValue: array,
            errorMessage: errorMessage ?? `The minimum length for this field is ${minLen}.`
        }

        if (!array) {
            return violation
        }

        const isValid = array.length >= minLen
        if (!isValid) {
            return violation
        }

    };
};
