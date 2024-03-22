import { PropertyValidator, ValidatorFunc } from "../types";

type MaxNumberValidator = <T>(max: number, errorMessage?: string) => PropertyValidator<T>

/**
 * Specifies the rule of maximum value of a number.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxNumber: MaxNumberValidator = <T>(max: number, errorMessage?: string) => {
    let msg = `The maximum value for this field is ${max}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<T> = (value, objRef): boolean => {
        if (!value) {
            return false
        }

        return value <= max
    }

    const validator: PropertyValidator<T> = {
        description: "Specifies the rule of maximum value of a number.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}