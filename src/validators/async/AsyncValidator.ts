import { AsyncValidationRule } from "../../types/AsyncValidationRule";
import { ValidationOptions, ValidationResult } from "../sync/Validator";
import { validateFieldAsync } from "./validateFieldAsync";
import { validateObjectAsync } from "./validateObjectAsync";

export class AsyncValidator {
    options: ValidationOptions

    constructor(options?: ValidationOptions) {
        const defaultOptions: ValidationOptions = {
            validationMessage: {
                successMessage: "Validation successful.",
                errorMessage: "Validation failed. Please check and fix the errors to continue."
            }
        }
        this.options = defaultOptions
        if (options) {
            this.options = options
        }
    }

    /**
     * Validates an object with the specified validation rule
     * @param object 
     * @param validationRule 
     * @returns ValidationResult
     */
    async validateAsync<T>(object: T, validationRule: AsyncValidationRule<T>): Promise<ValidationResult<T>> {
        const errors = await validateObjectAsync(object, object, validationRule)
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

        const validationMessage = this.options.validationMessage

        return {
            message: isValid ? validationMessage.successMessage : validationMessage.errorMessage,
            isValid: isValid,
            errors: errors,
        }
    }

    async validateFieldAsync<T>(object: T, fieldName: Extract<keyof T, string>, validationRule: AsyncValidationRule<T>) {
        const propertyValidationRule = validationRule[fieldName]

        // Doesnt have rule, its valid then
        if (!propertyValidationRule) {
            return {
                isValid: true,
                fieldName,
            };
        }

        return validateFieldAsync(object, fieldName, propertyValidationRule)
    }
} 
