import { PropertyValidator, ValidatorFunc } from "../types"

type MaximumSumOfValidator = <T>(propNameToBeSummed: keyof T, value: number, errorMessage?: string) => PropertyValidator

/**
 * Specifies the rule of maximum sum of the spesified property name of an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxSumOf: MaximumSumOfValidator = <T>(propNameToBeSummed: keyof T, maxSum: number, errorMessage?: string) => {
    let msg = `The maximum sum of ${propNameToBeSummed.toString()} is ${maxSum}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc = (value: T[], objRef?: any): boolean => {
        if (!value) {
            return false
        }
        if (!Array.isArray(value)) {
            return false
        }
        const arr = [...value]

        const total = arr.reduce((accumulator, obj) => {
            const propValue = obj[propNameToBeSummed] as any;
            if (!propValue) {
                return accumulator
            }
            const parsedNumber = parseFloat(propValue)
            return accumulator + parsedNumber
        }, 0);

        return maxSum >= total
    }

    const validator: PropertyValidator = {
        description: "Specifies the rule of maximum sum of the spesified property name of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}