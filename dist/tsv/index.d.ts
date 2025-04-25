import { ValidationResult, ValidationRule } from "../types";
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
export declare const validateObject: <T>(object: T, validationRule: ValidationRule<T>, validationMessage?: ValidationMessage) => ValidationResult<T>;
declare const tsv: {
    validate: <T>(object: T, validationRule: ValidationRule<T>, validationMessage?: ValidationMessage) => ValidationResult<T>;
};
export default tsv;
