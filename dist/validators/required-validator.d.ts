import { FieldValidator } from "../types";
declare type RequiredValidator = (errorMessage?: string) => FieldValidator;
/**
 * The validator of required field
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const required: RequiredValidator;
export {};
