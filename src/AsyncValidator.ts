import { AsyncValidationRule } from "./types/AsyncValidationRule";
import { ValidantOptions, ValidationMessage, ValidationResult } from "./Validator";
import { validateFieldOfAsync } from "./validators/validateFieldOfAsync";
import { validateObjectAsync } from "./validators/validateObjectAsync";

export class AsyncValidator<T> {
    options: ValidantOptions
    asyncRule: AsyncValidationRule<T>

    constructor(asyncRule: AsyncValidationRule<T>, options?: ValidantOptions) {
        this.asyncRule = asyncRule
        this.options = options
    }

    /**
     * Validates an object with the specified validation rule
     * @param object 
     * @param validationRule 
     * @returns ValidationResult
     */
    async validateAsync(object: T, validationMessage: ValidationMessage = { okMessage: "Good to go.", errorMessage: "One or more validation errors occurred." }): Promise<ValidationResult<T>> {
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

        return {
            message: isValid ? validationMessage.okMessage : validationMessage.errorMessage,
            isValid: isValid,
            errors: errors,
        }
    }

    async validateFieldAsync(fieldName: Extract<keyof T, string>, object: T) {
        const propertyValidationRule = this.asyncRule[fieldName]

        // Doesnt have rule, its valid then
        if (!propertyValidationRule) {
            return {
                isValid: true,
                fieldName,
            };
        }

        return validateFieldOfAsync(object, fieldName, propertyValidationRule)
    }
} 
