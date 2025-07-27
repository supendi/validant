import { ErrorOf } from "../../types/ErrorOf";
import { ValidationRule } from "../../types/ValidationRule";
import { validateField } from "./validateField";
import { validateObject } from "./validateObject";

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
    successMessage: string
    errorMessage: string
}

export interface ValidationOptions {
    validationMessage?: ValidationMessage
}

export class Validator {
    options: ValidationOptions

    constructor(options?: ValidationOptions) {
        const defaultOptions: ValidationOptions = {
            validationMessage: {
                successMessage: "Validation successful.",
                errorMessage: "Validation failed. Please check and fix the errors to continue."
            }
        }
        this.options = { ...defaultOptions }
        if (options) {
            this.options = { ...defaultOptions, ...options }
        }
    }

    /**
     * Validates an object with the specified validation rule
     * @param object 
     * @param validationRule 
     * @returns ValidationResult
     */
    validate<T>(object: T, rule: ValidationRule<T>): ValidationResult<T> {
        const errors = validateObject(object, object, rule)
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

        const validationMessage = this.options.validationMessage!

        return {
            message: isValid ? validationMessage.successMessage : validationMessage.errorMessage,
            isValid: isValid,
            errors: errors,
        }
    }

    validateField<T>(object: T, fieldName: Extract<keyof T, string>, rule: ValidationRule<T>) {
        const propertyValidationRule = rule[fieldName]

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
