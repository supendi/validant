import { PropertyValidator, ValidatorFunc } from "../types"

/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const elementOf = <TValue, TObject>(list: TValue[], errorMessage?: string) => {
    if (!list) {
        console.warn(`elementOf: the list is ${list}`)
    }
    let msg = `The value ':value' is not the element of [${list.join(", ")}].`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<TValue, TObject> = (value, object): boolean => {
        if (!list) {
            return false
        }
        var element = list.find(element => element === value)
        return !!element
    }

    const validator: PropertyValidator<TValue, TObject> = {
        description: "Specifies the rule if a value is an element of the specified array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}