import { PropertyValidator } from "../types";
declare type RequiredValidator = (errorMessage?: string) => PropertyValidator;
/**
 * The validator of required field
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const required: RequiredValidator;
export {};
