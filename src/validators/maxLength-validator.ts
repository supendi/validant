import { PropertyValidator, ValidatorFunc } from "../types";

type MaxLengthValidator = <TValue, TObject>(max: number, errorMessage?: string) => PropertyValidator<TValue, TObject>

/**
 * Specifies the rule of the maximum number of element to exist in an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxLength: MaxLengthValidator = <TValue, TObject>(max: number, errorMessage?: string) => {

    let msg = `The maximum length for this field is ${max}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<TValue, TObject> = (value, objRef): boolean => {
        if (!value) {
            return false
        }
        if (max < 0) {
            console.error("Validator: max length should be > 0")
            return false
        }
        const valueIsArray = Array.isArray(value)
        if (!valueIsArray) {
            return false
        }
        let actualLength = value.length
        return actualLength <= max
    }

    const validator: PropertyValidator<TValue, TObject> = {
        description: "Specifies the rule of the maximum number of element to exist in an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}
