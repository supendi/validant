import { PropertyRuleFunc } from "../types"

/**
 * Specifies the rule if a value is match with the specified regular expression.
 * @param regex 
 * @param errorMessage custom error message or default returned  
 */
export const regularExpression = <TObject extends Object>(regex: RegExp, errorMessage?: string): PropertyRuleFunc<string, TObject> => {
    let finalErrorMessage = `The value ':value' doesn't match with the specified regular expression.`
    if (errorMessage) {
        finalErrorMessage = errorMessage
    }

    return (value) => {
        const isValid = regex.test(value)

        if (!isValid) {
            return {
                isValid,
                errorMessage: finalErrorMessage
            }
        }

        return {
            isValid: true
        }
    }
}