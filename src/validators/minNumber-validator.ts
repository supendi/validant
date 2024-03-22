import { PropertyValidator, ValidatorFunc } from "../types";

type MinNumberValidator = <TValue, TObject>(min: number, errorMessage?: string) => PropertyValidator<TValue, TObject>

/**
 * Returns a minimum number validation rule
 * @param errorMessage Custom error messages
 * @returns 
 */
export const minNumber: MinNumberValidator = <TValue, TObject>(min: number, errorMessage?: string) => {

    let msg = `The minimum value for this field is ${min}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<TValue, TObject> = (value: TValue, objRef?: TObject): boolean => {
        if (!value) {
            return false
        }
        const typeOfValue = typeof (value)
        const valueIsNumber = typeOfValue === "bigint" || typeOfValue === "number"
        if (valueIsNumber) {
            return (value as unknown as number) >= min
        }
    }

    const validator: PropertyValidator<TValue, TObject> = {
        description: "Spesify the minimum value of number rule.",
        validate: validatorFunc,
        returningErrorMessage: msg,
    }

    return validator
}
