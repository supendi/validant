import { PropertyValidator, ValidatorFunc } from "../types";

type MinNumberValidator = (min: number, errorMessage?: string) => PropertyValidator


/**
 * Returns a minimum number validation rule
 * @param errorMessage Custom error messages
 * @returns 
 */
export const minNumber: MinNumberValidator = (min: number, errorMessage?: string) => {

    let msg = `The minimum value for this field is ${min}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc = (value: number, objRef?: any): boolean => {
        if (!value) {
            return false
        }

        return value >= min
    }

    const validator: PropertyValidator = {
        description: "Spesify the minimum value of number rule.",
        validate: validatorFunc,
        returningErrorMessage: msg,
    }

    return validator
}
