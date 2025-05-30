import { ValidateFunc } from "../types/ValidationRule";

/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const equalToPropertyValue = <TObject extends Object>(propertyNameToCompare: keyof TObject, errorMessage?: string): ValidateFunc<TObject[keyof TObject], TObject> => {
    return (value, object) => {
        const violation = {
            ruleName: equalToPropertyValue.name,
            attemptedValue: value,
            errorMessage: errorMessage ?? `The value should be equal to the value of '${propertyNameToCompare.toString()}'.`
        }

        const isValid = value === object[propertyNameToCompare]

        if (!isValid) {
            return violation
        }
    }
}
