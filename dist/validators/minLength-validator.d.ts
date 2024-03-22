import { PropertyValidator } from "../types";
declare type MinLengthValidator = <TValue, TObject>(min: number, errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Specifies the minimum length of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minLength: MinLengthValidator;
export {};
