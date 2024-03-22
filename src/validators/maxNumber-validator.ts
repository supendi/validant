import { PropertyValidator, ValidatorFunc } from "../types";

type MaxNumberValidator = <TValue, TObject>(max: number, errorMessage?: string) => PropertyValidator<TValue, TObject>

/**
 * Specifies the rule of maximum value of a number.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxNumber: MaxNumberValidator = <TValue, TObject>(max: number, errorMessage?: string) => {
    let msg = `The maximum value for this field is ${max}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<TValue, TObject> = (value, objRef): boolean => {
        if (!value) {
            return false
        }
        const typeOfValue = typeof (value)
        const valueIsNumber = typeOfValue === "bigint" || typeOfValue === "number"
        if (valueIsNumber) {
            return (value as unknown as number) <= max
        }

    }

    const validator: PropertyValidator<TValue, TObject> = {
        description: "Specifies the rule of maximum value of a number.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}