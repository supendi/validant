import { PropertyRuleFunc } from "../types";

/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const equalToPropertyValue = <TValue, TObject>(propertyNameToCompare: keyof TObject, errorMessage?: string) => {
    let msg = `The value should be equal to the value of '${propertyNameToCompare.toString()}'.`
    if (errorMessage) {
        msg = errorMessage
    }

    const ruleFunc: PropertyRuleFunc<TValue, TObject> = (value: TValue, object: TObject) => {
        const isValid = (value as any) === object[propertyNameToCompare]
        return {
            isValid,
            errorMessage: isValid ? "" : msg
        };
    }

    return ruleFunc
}
