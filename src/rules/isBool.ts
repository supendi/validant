import { ValidateFunc } from "../types/ValidationRule";

/**
 * Ensure the value is a boolean.
 * @param errorMessage Custom error message or default returned
 * @returns 
 */
export const isBool = <TValue, TObject extends Object>(errorMessage?: string): ValidateFunc<TValue | null | undefined, TObject> => {
    return (value) => {
        const violation = {
            ruleName: isBool.name,
            attemptedValue: value,
            errorMessage: errorMessage ?? `This field is not a valid boolean, type of value was: ${typeof value}.`
        }

        const isValid = typeof value === "boolean";
        if (!isValid) {
            return violation;
        }
    };
};