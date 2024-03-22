import { PropertyValidator, ValidatorFunc } from "../types"

type MinLengthValidator = <T>(min: number, errorMessage?: string) => PropertyValidator<T>

/**
 * Specifies the minimum length of an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const minLength: MinLengthValidator = <T>(min: number, errorMessage?: string) => {

    let msg = `The minimum length for this field is ${min}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validateFunc: ValidatorFunc<T> = (value, objRef): boolean => {

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

    const propValidator: PropertyValidator<T> = {
        description: "Specifies the minimum length of an array.",
        returningErrorMessage: msg,
        validate: validateFunc
    }
    return propValidator
}