import { PropertyValidator, ValidatorFunc } from "../types";

type EqualToPropertyValueValidator = <TValue, TObject>(equalToPropName: keyof TObject, errorMessage?: string) => PropertyValidator<TValue, TObject>

/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const equalToPropertyValue: EqualToPropertyValueValidator = <TValue, TObject>(equalToPropName: keyof TObject, errorMessage?: string) => {
    let msg = `The value should be equal to the value of '${equalToPropName.toString()}'.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<TValue, TObject> = (value, object): boolean => {
        return (value as any) === object[equalToPropName]
    }

    const validator: PropertyValidator<TValue, TObject> = {
        description: "Specifies a rule that a value should equal to the specified property value.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}
