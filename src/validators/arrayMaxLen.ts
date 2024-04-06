import { PropertyValidator, ValidateFunc } from "../types";

/**
 * Specifies the rule of the maximum number of element to exist in an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const arrayMaxLen = <TValue, TObject>(max: number, errorMessage?: string,) => {

    let msg = `The maximum length for this field is ${max}.`
    if (errorMessage) {
        msg = errorMessage
    }
    
    const validateFunc: ValidateFunc<TValue[], TObject> = (value, objRef): boolean => {
        if (!value) {
            return false
        }
        if (max < 0) {
            console.warn(`arrayMaxLen: max length should be >= 0`)
            return false
        }
        const valueIsArray = Array.isArray(value)
        if (!valueIsArray) {
            return false
        }
        let actualLength = value.length
        return actualLength <= max
    }

    const validator: PropertyValidator<TValue[], TObject> = {
        description: "Specifies the rule of the maximum number of element to exist in an array.",
        validate: validateFunc,
        returningErrorMessage: msg
    }
    return validator
}
