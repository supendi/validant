import { PropertyValidator } from "../types";
declare type MinLengthValidator = <T>(min: number, errorMessage?: string) => PropertyValidator<T>;
/**
 * Specifies the minimum length of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minLength: MinLengthValidator;
export {};
