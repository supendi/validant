import { FieldValidator } from "../types";
declare type MinNumberValidator = (min: number, errorMessage?: string) => FieldValidator;
/**
 * Returns a minimum number validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minNumber: MinNumberValidator;
export {};
