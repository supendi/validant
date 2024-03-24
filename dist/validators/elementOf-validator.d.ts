import { PropertyValidator } from "../types";
declare type ElementOfValidator = <TValue, TObject>(list: any[], errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const elementOf: ElementOfValidator;
export {};
