import { FieldValidator, ValidatorFunc } from "../types"

type RegularExpressionValidator = (regex: RegExp, errorMessage?: string) => FieldValidator

/**
 * Specifies the rule if a value is match with the specified regular expressin.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const regularExpression: RegularExpressionValidator = (regex: RegExp, errorMessage?: string) => {
    let msg = `The value ':value' doesn't match withe the specified regular expression.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc = (value: any, objRef?: any): boolean => {
        return regex.test(value)
    }

    const validator: FieldValidator = {
        description: "Specifies the rule if a value is match with the specified regular expression.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}