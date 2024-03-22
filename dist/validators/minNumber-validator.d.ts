import { PropertyValidator } from "../types";
declare type MinNumberValidator = (min: number, errorMessage?: string) => PropertyValidator;
/**
 * Returns a minimum number validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minNumber: MinNumberValidator;
export {};
