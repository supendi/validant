import { ValidateFunc } from "../types/ValidationRule";

/**
 * Specifies the minimum length of a string.
 * @param minLen 
 * @param errorMessage 
 * @returns 
 */
export function stringMinLen<TObject>(minLen: number, errorMessage?: string): ValidateFunc<string, TObject> {
    if (minLen < 0) {
        throw new Error(`${stringMinLen.name}: The minimum length argument must be a non-negative number.`);
    }

    const validateFunc: ValidateFunc<string, TObject> = (value: string, objRef?: TObject) => {
        const valueIsString = typeof value === "string"
        if (!valueIsString) {
            throw new Error(`${stringMinLen.name}: Expected a string but received ${typeof value}.`)
        }

        const violation = {
            ruleName: stringMinLen.name,
            attemptedValue: value,
            errorMessage: errorMessage ?? `The min length allowed is ${minLen} characters.`
        }

        const isValid = value.length >= minLen;

        if (!isValid) {
            return violation
        }
    };

    return validateFunc;
}
