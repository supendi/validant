import { PropertyValidator, ValidatorFunc } from "../types";

type EqualToPropertyValueValidator = (equalToPropName: string, errorMessage?: string) => PropertyValidator

/**
 * Specifies a rule that a value should equal to the specified field value.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const equalToPropertyValue: EqualToPropertyValueValidator = (equalToPropName: string, errorMessage?: string) => {
    let msg = `The value should be equal to the value of '${equalToPropName}'.`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc = (value: any, objRef?: any): boolean => {
        return value === objRef[equalToPropName]
    }

    const validator: PropertyValidator = {
        description: "Specifies a rule that a value should equal to the specified property value.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}
