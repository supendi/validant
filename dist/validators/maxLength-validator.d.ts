import { FieldValidator } from "../types";
declare type MaxLengthValidator = (max: number, errorMessage?: string) => FieldValidator;
/**
 * Specifies the rule of the maximum number of element to exist in an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const maxLength: MaxLengthValidator;
export {};
