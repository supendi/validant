import { PropertyValidator } from "../types";
declare type ElementOfValidator = <T>(list: T[], errorMessage?: string) => PropertyValidator;
/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const elementOf: ElementOfValidator;
export {};
