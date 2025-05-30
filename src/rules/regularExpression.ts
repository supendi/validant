import { ValidateFunc } from "../types/ValidationRule"

/**
 * Specifies the rule if a value is match with the specified regular expression.
 * @param regex 
 * @param errorMessage custom error message or default returned  
 */
export const regularExpression = <TObject extends Object>(regex: RegExp, ruleName?: string, errorMessage?: string): ValidateFunc<string, TObject> => {

    return (value) => {

        const violation = {
            ruleName: ruleName ? ruleName : regularExpression.name,
            attemptedValue: value,
            errorMessage: errorMessage ?? `The value ':value' doesn't match with the specified regular expression.`
        }

        const isValid = regex.test(value)

        if (!isValid) {
            return violation
        }
    }
}