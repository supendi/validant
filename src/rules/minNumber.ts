import { ValidateFunc } from "../types/ValidationRule";

/**
 * Returns a minimum number validation rule.
 * @param min The minimum value that is allowed.
 * @param errorMessage Custom error message.
 * @returns The validation rule.
 */
export const minNumber = <TObject extends Object>(min: number, errorMessage?: string): ValidateFunc<number, TObject> => {

    return (value: number) => {
        const typeOfValue = typeof value;
        const valueIsNumber = typeOfValue === "bigint" || typeOfValue === "number";

        if (!valueIsNumber) {
            throw new Error(`${minNumber.name}: Value is not a number. The value was: ${value} (type: '${typeof value}')`)
        }

        const violation = {
            ruleName: minNumber.name,
            attemptedValue: value,
            errorMessage: errorMessage ?? `The minimum value for this field is ${min}.`
        }
        
        const isValid = value >= min

        if (!isValid) {
            return violation
        }
    };

};
