import { PropertyValidator, ValidatorFunc } from "../types";

type MaxLengthValidator = <T>(max: number, errorMessage?: string) => PropertyValidator<T>

/**
 * Specifies the rule of the maximum number of element to exist in an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxLength: MaxLengthValidator = <T>(max: number, errorMessage?: string) => {

    let msg = `The maximum length for this field is ${max}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<T> = (value, objRef): boolean => {
        if (!value) {
            return false
        }
        if (max < 0) {
            console.error("Validator: max length should be > 0")
            return false
        }
        let actualLength = value.length
        return actualLength <= max
    }

    const validator: PropertyValidator<T> = {
        description: "Specifies the rule of the maximum number of element to exist in an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}
