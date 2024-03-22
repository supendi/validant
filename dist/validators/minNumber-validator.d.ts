import { PropertyValidator } from "../types";
declare type MinNumberValidator = <T>(min: number, errorMessage?: string) => PropertyValidator<T>;
/**
 * Returns a minimum number validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minNumber: MinNumberValidator;
export {};
