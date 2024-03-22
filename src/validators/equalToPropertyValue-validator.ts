import { PropertyValidator, ValidatorFunc } from "../types";

type EqualToPropertyValueValidator = <T>(equalToPropName: keyof T, errorMessage?: string) => PropertyValidator<T>

/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const equalToPropertyValue: EqualToPropertyValueValidator = <T>(equalToPropName: keyof T, errorMessage?: string) => {
    let msg = `The value should be equal to the value of '${equalToPropName.toString()}'.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<T> = (value, object): boolean => {
        return value === object[equalToPropName]
    }

    const validator: PropertyValidator<T> = {
        description: "Specifies a rule that a value should equal to the specified property value.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}
