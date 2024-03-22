import { PropertyValidator, ValidatorFunc } from "../types"

type MinimumSumOfValidator = <T>(propNameToBeSummed: keyof T, value: number, errorMessage?: string) => PropertyValidator<T>

/**
 * Specifies the rule of minimum sum of the specified property name of an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const minSumOf: MinimumSumOfValidator = <T>(propNameToBeSummed: keyof T, minSum: number, errorMessage?: string) => {
    let msg = `The minimum sum of ${propNameToBeSummed.toString()} is ${minSum}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<T> = <T>(value: T[], objRef?: T): boolean => {
        if (!value) {
            return false
        }
        if (!Array.isArray(value)) {
            return false
        }
        const arr = [...value]

        const total = arr.reduce((accumulator, obj) => {
            const propValue = obj[propNameToBeSummed as unknown as keyof T] as any;
            if (!propValue) {
                return accumulator
            }
            const parsedNumber = parseFloat(propValue)
            return accumulator + parsedNumber
        }, 0);

        return minSum <= total
    }

    const validator: PropertyValidator<T> = {
        description: "Specifies the rule of minimum sum of the specified property name of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}