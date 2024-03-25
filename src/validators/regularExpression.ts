import { PropertyValidator, ValidatorFunc } from "../types"

/**
 * Specifies the rule if a value is match with the specified regular expression.
 * @param regex 
 * @param errorMessage 
 * @param description 
 * @returns 
 */
export const regularExpression = <TValue, TObject>(regex: RegExp, errorMessage?: string, description?: string) => {
    let msg = `The value ':value' doesn't match with the specified regular expression.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<TValue, TObject> = (value, objRef): boolean => {
        return regex.test(value as unknown as string)
    }

    const validator: PropertyValidator<TValue, TObject> = {
        description: description ? description : "Specifies the rule if a value is match with the specified regular expression.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}