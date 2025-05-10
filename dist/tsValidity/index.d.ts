import { ErrorOf, ValidationRule } from "../types";
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
    okMessage: string;
    errorMessage: string;
}
/**
 * Validates an object with the specified validation rule
 * @param object
 * @param validationRule
 * @returns ValidationResult
 */
export declare const validate: <T>(object: T, validationRule: ValidationRule<T>, validationMessage?: ValidationMessage) => ValidationResult<T>;
declare const tsValidity: {
    validate: <T>(object: T, validationRule: ValidationRule<T>, validationMessage?: ValidationMessage) => ValidationResult<T>;
};
export default tsValidity;
