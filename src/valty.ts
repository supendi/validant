import { ErrorOf, ValidationRule } from "./types";
import { validateObject } from "./validators/validateObject";

/**
 * Represents the final validation result. 
 */
export interface ValidationResult<T> {
    isValid: boolean;
    message: string;
    errors?: ErrorOf<T> | undefined;
}

/**
 * Represents the validation message when the validation process is done.
 */
export interface ValidationMessage {
    okMessage: string
    errorMessage: string
}

/**
 * Validates an object with the specified validation rule
 * @param object 
 * @param validationRule 
 * @returns ValidationResult
 */
export const validate = <T, TRoot>(object: T, validationRule: ValidationRule<T>, validationMessage: ValidationMessage = { okMessage: "Good to go.", errorMessage: "One or more validation errors occurred." }): ValidationResult<T> => {
    const errors = validateObject(object, object, validationRule)
    let isValid = true

    for (const key in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, key)) {
            const error = errors[key];
            if (error) {
                isValid = false
                break
            }
        }
    }

    return {
        message: isValid ? validationMessage.okMessage : validationMessage.errorMessage,
        isValid: isValid,
        errors: errors,
    }
}

const saferval = {
    validate: validate
}

export default saferval
