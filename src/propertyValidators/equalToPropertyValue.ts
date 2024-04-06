import { PropertyValidator, ValidateFunc } from "../types";

/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const equalToPropertyValue = <TValue, TObject>(equalToPropName: keyof TObject, errorMessage?: string) => {
    let msg = `The value should be equal to the value of '${equalToPropName.toString()}'.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validateFunc: ValidateFunc<TValue, TObject> = (value, object): boolean => {
        return (value as any) === object[equalToPropName]
    }

    const validator: PropertyValidator<TValue, TObject> = {
        description: "Specifies a rule that a value should equal to the specified property value.",
        validate: validateFunc,
        returningErrorMessage: msg
    }
    return validator
}
