import { ErrorOf, ValidationResult, ValidationRule } from "./types";
/**
 * Validates and collects errors of each fields as array of string
 * @param object
 * @param validationRule
 * @returns
 */
export declare const getErrorOf: <T>(object: T, validationRule: ValidationRule<T>) => ErrorOf<T>;
/**
 * Validates an object with the specified validation rule
 * @param object
 * @param validationRule
 * @returns ValidationResult
 */
export declare const validateObject: <T>(object: T, validationRule: ValidationRule<T>) => ValidationResult<T>;
declare const validator: {
    validate: <T>(object: T, validationRule: ValidationRule<T>) => ValidationResult<T>;
};
export default validator;
