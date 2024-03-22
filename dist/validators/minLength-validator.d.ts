import { PropertyValidator } from "../types";
declare type MinLengthValidator = (min: number, errorMessage?: string) => PropertyValidator;
/**
 * Specifies the minimum length of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minLength: MinLengthValidator;
export {};
