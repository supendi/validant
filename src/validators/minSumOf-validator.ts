import { FieldValidator, ValidatorFunc } from "../types"

type MinimumSumOfValidator = <T>(fieldNameToSum: keyof T, value: number, errorMessage?: string) => FieldValidator

/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const minSumOf: MinimumSumOfValidator = <T>(fieldNameToSum: keyof T, minSum: number, errorMessage?: string) => {
    let msg = `The minimum sum of ${fieldNameToSum.toString()} is ${minSum}.`
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

        return minSum <= total
    }

    const validator: FieldValidator = {
        description: "Specifies the rule of minimum sum of the spesified field of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}