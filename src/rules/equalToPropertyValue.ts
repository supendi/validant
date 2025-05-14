import { PropertyRuleFunc } from "../types";

/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const equalToPropertyValue = <TObject extends Object>(propertyNameToCompare: keyof TObject, errorMessage?: string): PropertyRuleFunc<TObject[keyof TObject], TObject> => {
    let finalErrorMessage = `The value should be equal to the value of '${propertyNameToCompare.toString()}'.`
    if (errorMessage) {
        finalErrorMessage = errorMessage
    }

    return (value, object) => {
        const isValid = value === object[propertyNameToCompare]

        if (!isValid) {
            return {
                isValid,
                errorMessage: finalErrorMessage
            };
        }

        return {
            isValid: true
        };
    }
}
