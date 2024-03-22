import { PropertyValidator, ValidatorFunc } from "../types";

type RequiredValidator = <TValue, TObject>(errorMessage?: string) => PropertyValidator<TValue, TObject>

/**
 * Specifies the rule that the property is required.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const required: RequiredValidator = <TValue, TObject>(errorMessage?: string) => {
    let msg = "This field is required."
    if (errorMessage) {
        msg = errorMessage
    }

    const validatorFunc: ValidatorFunc<TValue, TObject> = (value: TValue, objRef?: TObject): boolean => {
        if (!value) {
            return false
        }
        return true
    }

    const propValidator: PropertyValidator<TValue, TObject> = {
        description: "Specifies the rule that the property is required.",
        returningErrorMessage: msg,
        validate: validatorFunc
    }
    return propValidator
}
