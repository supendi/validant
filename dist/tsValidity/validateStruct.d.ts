import { ValidationRule, ErrorOf } from "../types";
/**
 * Validates and collects errors of each property as array of string
 * @param object
 * @param validationRule
 * @returns
 */
export declare const validateStruct: <T, TRoot>(object: T, rootObject: TRoot, validationRule: ValidationRule<T, TRoot>) => ErrorOf<T>;
