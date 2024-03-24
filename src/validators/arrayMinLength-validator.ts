import { PropertyValidator, ValidatorFunc } from "../types"

type ArrayMinLengthValidator = <TValue, TObject>(min: number, errorMessage?: string) => PropertyValidator<TValue, TObject>

/**
 * Specifies the minimum length of an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const arrayMinLength: ArrayMinLengthValidator = <TValue, TObject>(min: number, errorMessage?: string) => {

    let msg = `The minimum length for this field is ${min}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validateFunc: ValidatorFunc<TValue, TObject> = (value, objRef): boolean => {

        if (!value) {
            return false
        }
        if (min < 1) {
            console.error("Validator: min length should be > 0")
            return false
        }
        const valueIsArray = Array.isArray(value)
        if (!valueIsArray) {
            return false
        }
        let actualLength = value.length
        return actualLength >= min
    }

    const propValidator: PropertyValidator<TValue, TObject> = {
        description: "Specifies the minimum length of an array.",
        returningErrorMessage: msg,
        validate: validateFunc
    }
    return propValidator
}