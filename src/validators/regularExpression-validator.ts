import { PropertyValidator, ValidatorFunc } from "../types"

type RegularExpressionValidator = <TValue, TObject>(regex: RegExp, errorMessage?: string) => PropertyValidator<TValue, TObject>

/**
 * Specifies the rule if a value is match with the specified regular expressin.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const regularExpression: RegularExpressionValidator = <TValue, TObject>(regex: RegExp, errorMessage?: string) => {
    let msg = `The value ':value' doesn't match withe the specified regular expression.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<TValue, TObject> = (value, objRef): boolean => {
        return regex.test(value as unknown as string)
    }

    const validator: PropertyValidator<TValue, TObject> = {
        description: "Specifies the rule if a value is match with the specified regular expression.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}