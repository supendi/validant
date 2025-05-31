import { ErrorOf } from "./types/ErrorOf";
import { ValidationRule } from "./types/ValidationRule";
import { validateField } from "./validators/validateField";
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

export interface ValidantOptions {
    flattenErrors: boolean
}

export class Validator<T> {
    options: ValidantOptions

    rule: ValidationRule<T>

    constructor(rule: ValidationRule<T>, options?: ValidantOptions) {
        this.rule = rule
        this.options = options
    }

    /**
     * Validates an object with the specified validation rule
     * @param object 
     * @param validationRule 
     * @returns ValidationResult
     */
    validate(object: T, validationMessage: ValidationMessage = { okMessage: "Good to go.", errorMessage: "One or more validation errors occurred." }): ValidationResult<T> {
        const errors = validateObject(object, object, this.rule)
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

    validateField(fieldName: Extract<keyof T, string>, object: T) {
        const propertyValidationRule = this.rule[fieldName]

        // Doesnt have rule, its valid then
        if (!propertyValidationRule) {
            return {
                isValid: true,
                fieldName,
            };
        }

        return validateField(object, fieldName, propertyValidationRule)
    }
} 
