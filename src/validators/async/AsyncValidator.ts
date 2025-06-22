import { AsyncValidationRule } from "../../types/AsyncValidationRule";
import { ValidationOptions, ValidationResult } from "../sync/Validator";
import { validateFieldAsync } from "./validateFieldAsync";
import { validateObjectAsync } from "./validateObjectAsync";

export class AsyncValidator<T> {
    options: ValidationOptions
    asyncRule: AsyncValidationRule<T>

    constructor(asyncRule: AsyncValidationRule<T>, options?: ValidationOptions) {
        this.asyncRule = asyncRule
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
    async validateAsync(object: T): Promise<ValidationResult<T>> {
        const errors = await validateObjectAsync(object, object, this.asyncRule)
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

    async validateFieldAsync(object: T, fieldName: Extract<keyof T, string>) {
        const propertyValidationRule = this.asyncRule[fieldName]

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
