import { PropertyValidator, TypeOfArray, ValidatorFunc } from "../types"

type MaximumSumOfValidator = <TValue, TObject>(propNameToBeSummed: keyof TypeOfArray<TValue>, value: number, errorMessage?: string) => PropertyValidator<TValue, TObject>

/**
 * Specifies the rule of maximum sum of the spesified property name of an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxSumOf: MaximumSumOfValidator = <TValue, TObject>(propNameToBeSummed: keyof TypeOfArray<TValue>, maxSum: number, errorMessage?: string) => {
    let msg = `The maximum sum of ${propNameToBeSummed.toString()} is ${maxSum}.`
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
            const propValue = obj[propNameToBeSummed as unknown as keyof TValue];
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

    const validator: PropertyValidator<TValue, TObject> = {
        description: "Specifies the rule of maximum sum of the spesified property name of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}