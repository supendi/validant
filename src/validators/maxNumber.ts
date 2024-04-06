import { PropertyValidator, ValidateFunc } from "../types";

/**
 * Specifies the rule of maximum value of a number.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxNumber = <TObject>(max: number, errorMessage?: string) => {
    let msg = `The maximum value for this field is ${max}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validateFunc: ValidateFunc<number, TObject> = (value, objRef): boolean => {
        if (!value) {
            return false
        }
        const typeOfValue = typeof (value)
        const valueIsNumber = typeOfValue === "bigint" || typeOfValue === "number"
        if (!valueIsNumber) {
            console.warn(`${maxNumber.name}: value is not a number. The type of value was '${typeOfValue}'`)
            return false
        }
        return value <= max
    }

    const validator: PropertyValidator<number, TObject> = {
        description: "Specifies the rule of maximum value of a number.",
        validate: validateFunc,
        returningErrorMessage: msg
    }
    return validator
}