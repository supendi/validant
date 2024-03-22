import { PropertyValidator } from "../types";
declare type EqualToFieldValueValidator = (theFieldNameToCompare: string, errorMessage?: string) => PropertyValidator;
/**
 * Specifies a rule that a value should equal to the specified field value.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const equalToFieldValue: EqualToFieldValueValidator;
export {};
