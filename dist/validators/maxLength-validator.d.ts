import { PropertyValidator } from "../types";
declare type MaxLengthValidator = <T>(max: number, errorMessage?: string) => PropertyValidator<T>;
/**
 * Specifies the rule of the maximum number of element to exist in an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const maxLength: MaxLengthValidator;
export {};
