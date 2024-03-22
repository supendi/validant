import { PropertyValidator } from "../types";
declare type RequiredValidator = <TValue, TObject>(errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Specifies the rule that the property is required.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const required: RequiredValidator;
export {};
