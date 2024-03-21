import { FieldValidator, ValidatorFunc } from "../types";

type MaxLengthValidator = (max: number, errorMessage?: string) => FieldValidator

/**
 * Specifies the rule of the maximum number of element to exist in an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxLength: MaxLengthValidator = (max: number, errorMessage?: string) => {

    let msg = `The maximum length for this field is ${max}`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc = (value: any, objRef?: any): boolean => {
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

    const validator: FieldValidator = {
        description: "Specifies the rule of the maximum number of element to exist in an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}
