import { ValidateFunc } from "../types/ValidationRule";

/**
 * Specifies the maximum length of a string.
 * @param maxLength The maximum number of characters allowed.
 * @param errorMessage Custom error message.
 * @returns A property rule function.
 */
export function stringMaxLen<TObject extends Object>(maxLength: number, errorMessage?: string): ValidateFunc<string, TObject> {
    if (maxLength < 0) {
        throw new Error(`${stringMaxLen.name}: The maximum length argument must be a non-negative number.`);
    }

    return (value: string) => {
        const valueIsString = typeof value === "string"
        if (!valueIsString) {
            throw new Error(`${stringMaxLen.name}: Expected a string but received ${typeof value}.`)
        }

        const violation = {
            ruleName: stringMaxLen.name,
            attemptedValue: value,
            errorMessage: errorMessage ?? `The maximum length allowed is ${maxLength} characters.`
        }

        const isValid = value.length <= maxLength;

        if (!isValid) {
            return violation
        }

    };
}
