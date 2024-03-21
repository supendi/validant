import { FieldValidator, ValidatorFunc } from "../types";

type RequiredValidator = (errorMessage?: string) => FieldValidator

/**
 * The validator of required field
 * @param errorMessage Custom error messages
 * @returns 
 */
export const required: RequiredValidator = (errorMessage?: string) => {
    let msg = "This field is required."
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc = (value: any, objRef?: any): boolean => {
        if (!value) {
            return false
        }
        return true
    }

    const fieldValidator: FieldValidator = {
        description: "Validates if a field value is required",
        returningErrorMessage: msg,
        validate: validatorFunc
    }
    return fieldValidator
}
