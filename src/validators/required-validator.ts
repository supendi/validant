import { PropertyValidator, ValidatorFunc } from "../types";

type RequiredValidator = <T>(errorMessage?: string) => PropertyValidator<T>

/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns 
 */
export const required: RequiredValidator = <T>(errorMessage?: string) => {
    let msg = "This field is required."
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<T> = (value: any, objRef?: T): boolean => {
        if (!value) {
            return false
        }
        return true
    }

    const propValidator: PropertyValidator<T> = {
        description: "Validates if a property value is required",
        returningErrorMessage: msg,
        validate: validatorFunc
    }
    return propValidator
}
