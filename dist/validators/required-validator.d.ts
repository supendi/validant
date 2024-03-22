import { PropertyValidator } from "../types";
declare type RequiredValidator = <TValue, TObject>(errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const required: RequiredValidator;
export {};
