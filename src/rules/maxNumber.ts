import { ValidateFunc } from "../types/ValidationRule";

/**
 * Specifies the rule of maximum value of a number.
 * @param max The maximum allowed value.
 * @param errorMessage Optional custom error message.
 */
export const maxNumber = <TObject extends Object>(max: number, errorMessage?: string): ValidateFunc<number, TObject> => {

    return (value) => {
        const valueIsNumber = typeof value === "number" || typeof value === "bigint";

        if (!valueIsNumber) {
            throw new Error(`${maxNumber.name}: Value is not a number. The value was: ${value} (type: '${typeof value}')`)
        }

        const violation = {
            ruleName: maxNumber.name,
            attemptedValue: value,
            errorMessage: errorMessage ?? `The maximum value for this field is ${max}.`
        }

        const isValid = value <= max

        if (!isValid) {
            return violation
        }
    };
};
