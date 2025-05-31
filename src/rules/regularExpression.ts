import { ValidateFunc } from "../types/ValidationRule"
import { stringifyValue } from "./stringifyValue"

/**
 * Specifies the rule if a value is match with the specified regular expression.
 * @param regex 
 * @param errorMessage custom error message or default returned  
 */
export const regularExpression = <TObject extends Object>(regex: RegExp, ruleName?: string, errorMessage?: string): ValidateFunc<string, TObject> => {

    return (value) => {
        const stringifiedValue = stringifyValue(value)
        let resolvedErrorMessage = errorMessage ?? `The value '${stringifiedValue}' doesn't match with the specified regular expression.`

        const violation = {
            ruleName: ruleName ? ruleName : regularExpression.name,
            attemptedValue: value,
            errorMessage: resolvedErrorMessage
        }

        const isValid = regex.test(value)

        if (!isValid) {
            return violation
        }
    }
}