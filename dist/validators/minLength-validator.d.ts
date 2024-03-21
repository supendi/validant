import { FieldValidator } from "../types";
declare type MinLengthValidator = (min: number, errorMessage?: string) => FieldValidator;
/**
 * Returns a minimum length validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minLength: MinLengthValidator;
export {};
