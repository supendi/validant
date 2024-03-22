import { PropertyValidator } from "../types";
declare type EqualToPropertyValueValidator = <T>(equalToPropName: keyof T, errorMessage?: string) => PropertyValidator<T>;
/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const equalToPropertyValue: EqualToPropertyValueValidator;
export {};
