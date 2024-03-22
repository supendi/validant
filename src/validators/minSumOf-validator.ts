import { PropertyValidator, TypeOfArray, ValidatorFunc } from "../types"

type MinimumSumOfValidator = <TValue, TObject>(propNameToBeSummed: keyof TypeOfArray<TValue>, value: number, errorMessage?: string) => PropertyValidator<TValue, TObject>

/**
 * Specifies the rule of minimum sum of the specified property name of an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const minSumOf: MinimumSumOfValidator = <TValue, TObject>(propNameToBeSummed: keyof TypeOfArray<TValue>, minSum: number, errorMessage?: string) => {
    let msg = `The minimum sum of ${propNameToBeSummed.toString()} is ${minSum}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<TValue, TObject> = (value: TValue, objRef?: TObject): boolean => {
        if (!value) {
            return false
        }
        if (!Array.isArray(value)) {
            return false
        }
        const arr = [...value]

        const total = arr.reduce((accumulator, obj) => {
            const propValue = obj[propNameToBeSummed as unknown as keyof TValue] as any;
            if (!propValue) {
                return accumulator
            }
            const parsedNumber = parseFloat(propValue)
            return accumulator + parsedNumber
        }, 0);

        return minSum <= total
    }

    const validator: PropertyValidator<TValue, TObject> = {
        description: "Specifies the rule of minimum sum of the specified property name of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}