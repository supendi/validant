import { PropertyValidator, ValidatorFunc } from "../types";

type MaxNumberValidator = (max: number, errorMessage?: string) => PropertyValidator

/**
 * Returns a maximum number validation rule
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxNumber: MaxNumberValidator = (max: number, errorMessage?: string) => {
    let msg = `The maximum value for this field is ${max}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc = (value: number, objRef?: any): boolean => {
        if (!value) {
            return false
        }

        return value <= max
    }

    const validator: PropertyValidator = {
        description: "Specifies the rule of maximum value of a number.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}