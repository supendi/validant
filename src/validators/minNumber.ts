import { PropertyValidator, ValidateFunc } from "../types";

/**
 * Returns a minimum number validation rule
 * @param errorMessage Custom error messages
 * @returns 
 */
export const minNumber = <TObject>(min: number, errorMessage?: string) => {
    let msg = `The minimum value for this field is ${min}.`
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
            console.warn(`${minNumber.name}: value is not a number. The type of value was '${typeOfValue}'`)
            return false
        }
        return value >= min
    }

    const validator: PropertyValidator<number, TObject> = {
        description: "Spesify the minimum value of number rule.",
        validate: validateFunc,
        returningErrorMessage: msg,
    }

    return validator
}
