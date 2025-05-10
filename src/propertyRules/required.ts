import { PropertyRuleFunc, ValidateFunc } from "../types";

/**
 * Specifies the rule that the property is required.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const required = <TValue, TObject>(errorMessage?: string) => {
    let msg = "This field is required."
    if (errorMessage) {
        msg = errorMessage
    }

    const ruleFunc: PropertyRuleFunc<TValue, TObject> = (value: TValue, objRef?: TObject) => {
        if (!value) {
            return {
                isValid: false,
                errorMessage: msg
            }
        }
        if (Array.isArray(value)) {
            const isValid = value.length > 0
            return {
                isValid,
                errorMessage: isValid ? "" : msg
            }
        }
        return {
            isValid: true,
        }
    }


    return ruleFunc
}
