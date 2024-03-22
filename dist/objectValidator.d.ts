import { ErrorOf, ValidationResult, ValidationRule } from "./types";
/**
 * Validates and collects errors of each fields as array of string
 * @param object
 * @param validationRule
 * @returns
 */
export declare const getErrorOf: <T>(object: T, validationRule: ValidationRule<T>) => ErrorOf<T>;
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
declare const validator: {
    validate: <T>(object: T, validationRule: ValidationRule<T>, validationMessage?: ValidationMessage) => ValidationResult<T>;
};
export default validator;
