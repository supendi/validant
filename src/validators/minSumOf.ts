import { PropertyValidator, TypeOfArray, ValidatorFunc } from "../types"

/**
 * Specifies the rule of minimum sum of the specified property name of an array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const minSumOf = <TValue, TObject>(propNameToBeSummed: keyof TypeOfArray<TValue[]>, minSum: number, errorMessage?: string) => {
    let msg = `The minimum sum of ${propNameToBeSummed.toString()} is ${minSum}.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<TValue[], TObject> = (value, objRef): boolean => {
        if (!value) {
            return false
        }
        if (!Array.isArray(value)) {
            return false
        }
        const arr = [...value]

        const total = arr.reduce((accumulator, obj) => {
            const propValue = obj[propNameToBeSummed];
            if (!propValue) {
                return accumulator
            }

            const typeofValue = typeof (propValue)
            const isNumber = typeofValue === "bigint" || typeofValue === "number"

            if (!isNumber) {
                console.warn(`${minSumOf.name}: value is not a number. The type of value was '${typeofValue}'. The walue was '${value}'`)
                return accumulator
            }
            const parsedNumber = parseFloat(propValue as any)
            if (isNaN(parsedNumber)) {
                console.warn(`${minSumOf.name}: value is NaN. The walue was '${value}'`)
                return accumulator
            }
            return accumulator + parsedNumber
        }, 0);

        return minSum <= total
    }

    const validator: PropertyValidator<TValue[], TObject> = {
        description: "Specifies the rule of minimum sum of the specified property name of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}