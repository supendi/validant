import { PropertyValidator } from "../types";
declare type RequiredValidator = <T>(errorMessage?: string) => PropertyValidator;
/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const required: RequiredValidator;
export {};
