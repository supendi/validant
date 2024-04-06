import { PropertyValidator, ValidateFunc } from "../types";

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

    const validateFunc: ValidateFunc<TValue, TObject> = (value: TValue, objRef?: TObject): boolean => {
        if (!value) {
            return false
        }
        return true
    }

    const propValidator: PropertyValidator<TValue, TObject> = {
        description: "Specifies the rule that the property is required.",
        returningErrorMessage: msg,
        validate: validateFunc
    }
    return propValidator
}
