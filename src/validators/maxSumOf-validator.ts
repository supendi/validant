import { FieldValidator, ValidatorFunc } from "../types"

type MaximumSumOfValidator = <T>(fieldNameToSum: keyof T, value: number, errorMessage?: string) => FieldValidator

/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxSumOf: MaximumSumOfValidator = <T>(fieldNameToSum: keyof T, maxSum: number, errorMessage?: string) => {
    let msg = `The maximum sum of ${fieldNameToSum.toString()} is ${maxSum}.`
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
            const fieldValue = obj[fieldNameToSum] as any;
            if (!fieldValue) {
                return accumulator
            }
            const parsedNumber = parseFloat(fieldValue)
            return accumulator + parsedNumber
        }, 0);

        return maxSum >= total
    }

    const validator: FieldValidator = {
        description: "Specifies the rule of maximum sum of the spesified field of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}