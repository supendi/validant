import { PropertyValidator } from "../types";
declare type EqualToPropertyValueValidator = (equalToPropName: string, errorMessage?: string) => PropertyValidator;
/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const equalToPropertyValue: EqualToPropertyValueValidator;
export {};
