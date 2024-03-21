import { FieldValidator, ValidatorFunc } from "../types";

type EqualToFieldValueValidator = (theFieldNameToCompare: string, errorMessage?: string) => FieldValidator

/**
 * Specifies a rule that a value should equal to the specified field value.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const equalToFieldValue: EqualToFieldValueValidator = (equalToFieldName: string, errorMessage?: string) => {
    let msg = `The value should be equal to the value of '${equalToFieldName}'`
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc = (value: any, objRef?: any): boolean => {
        return value === objRef[equalToFieldName]
    }

    const validator: FieldValidator = {
        description: "Specifies a rule that a value should equal to the specified field value.",
        validate: validatorFunc,
        returningErrorMessage: msg
    }
    return validator
}
