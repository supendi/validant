import { PropertyValidator, ValidatorFunc } from "../types"

type ElementOfValidator = <T>(list: T[], errorMessage?: string) => PropertyValidator

/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const elementOf: ElementOfValidator = <T>(list: T[], errorMessage?: string) => {
    if (!list) {
        console.error(`Validator: the list is ${list}`)
    }
    let msg = `The value ':value' is not the element of [${list.join(", ")}].`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc = (value: any, objRef?: any): boolean => {
        if (!list) {
            return false
        }

        var element = list.find(x => x === value)
        return !!element
    }

    const validator: PropertyValidator = {
        description: "Specifies the rule if a value is an element of the specified array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}