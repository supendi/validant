import { PropertyValidator, TypeOfArray, ValidateFunc } from "../types"

/**
 * Specifies the rule of maximum sum of the spesified property name of an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const maxSumOf = <TValue, TObject>(propNameToBeSummed: keyof TypeOfArray<TValue[]>, maxSum: number, errorMessage?: string) => {
    let msg = `The maximum sum of ${propNameToBeSummed.toString()} is ${maxSum}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validateFunc: ValidateFunc<TValue[], TObject> = (value, objRef): boolean => {
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
            if (!propValue) {
                return accumulator
            }
            if (!isNumber) {
                console.warn(`${maxSumOf.name}: value is not a number. The type of value was '${typeofValue}'. The walue was '${value}'`)
                return accumulator
            }
            const parsedNumber = parseFloat(propValue as any)
            if (isNaN(parsedNumber)) {
                console.warn(`${maxSumOf.name}: value is NaN. The walue was '${value}'`)
                return accumulator
            }
            return accumulator + parsedNumber
        }, 0);

        return maxSum >= total
    }

    const validator: PropertyValidator<TValue[], TObject> = {
        description: "Specifies the rule of maximum sum of the spesified property name of an array.",
        validate: validateFunc,
        returningErrorMessage: msg
    }
    return validator
}