import { PropertyRuleFunc } from "../types"

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

    const ruleFunc: PropertyRuleFunc<TValue, TObject> = (value, objRef) => {
        const isValid = regex.test(value as unknown as string)
        return {
            isValid,
            errorMessage: isValid ? "" : msg
        }
    }

    return ruleFunc
}