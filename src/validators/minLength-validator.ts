import { PropertyValidator, ValidatorFunc } from "../types"

type MinLengthValidator = (min: number, errorMessage?: string) => PropertyValidator

/**
 * Specifies the minimum length of an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const minLength: MinLengthValidator = (min: number, errorMessage?: string) => {

    let msg = `The minimum length for this field is ${min}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validateFunc: ValidatorFunc = (value: any, objRef?: any): boolean => {

        if (!value) {
            return false
        }
        if (min < 1) {
            console.error("Validator: min length should be > 0")
            return false
        }
        let actualLength = value.length
        return actualLength >= min
    }

    const propValidator: PropertyValidator = {
        description: "Specifies the minimum length of an array.",
        returningErrorMessage: msg,
        validate: validateFunc
    }
    return propValidator
}