import { PropertyValidator } from "../types";
declare type ArrayMaxLengthValidator = <TValue, TObject>(max: number, errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Specifies the rule of the maximum number of element to exist in an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const arrayMaxLength: ArrayMaxLengthValidator;
export {};
