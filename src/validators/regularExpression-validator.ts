import { PropertyValidator, ValidatorFunc } from "../types"

type RegularExpressionValidator = <T>(regex: RegExp, errorMessage?: string) => PropertyValidator<T>

/**
 * Specifies the rule if a value is match with the specified regular expressin.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const regularExpression: RegularExpressionValidator = <T>(regex: RegExp, errorMessage?: string) => {
    let msg = `The value ':value' doesn't match withe the specified regular expression.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<T> = (value, objRef): boolean => {
        return regex.test(value)
    }

    const validator: PropertyValidator<T> = {
        description: "Specifies the rule if a value is match with the specified regular expression.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}