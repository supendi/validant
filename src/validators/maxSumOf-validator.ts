import { PropertyValidator, ValidatorFunc } from "../types"

type MaximumSumOfValidator = <T>(propNameToBeSummed: string, value: number, errorMessage?: string) => PropertyValidator<T>

/**
 * Specifies the rule of maximum sum of the spesified property name of an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxSumOf: MaximumSumOfValidator = <T>(propNameToBeSummed: string, maxSum: number, errorMessage?: string) => {
    let msg = `The maximum sum of ${propNameToBeSummed.toString()} is ${maxSum}.`
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
            const propValue = obj[propNameToBeSummed as unknown as keyof T];
            const typeofValue = typeof (propValue)
            const isNumber = typeofValue === "bigint" || typeofValue === "number"
            if (!propValue || propValue === undefined || propValue === null || !isNumber) {
                return accumulator
            }
            const parsedNumber = parseFloat(propValue as any)
            return accumulator + parsedNumber
        }, 0);

        return maxSum >= total
    }

    const validator: PropertyValidator<T> = {
        description: "Specifies the rule of maximum sum of the spesified property name of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}