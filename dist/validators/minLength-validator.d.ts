import { PropertyValidator } from "../types";
declare type MinLengthValidator = (min: number, errorMessage?: string) => PropertyValidator;
/**
 * Returns a minimum length validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minLength: MinLengthValidator;
export {};
