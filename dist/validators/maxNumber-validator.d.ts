import { PropertyValidator } from "../types";
declare type MaxNumberValidator = <TValue, TObject>(max: number, errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Specifies the rule of maximum value of a number.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const maxNumber: MaxNumberValidator;
export {};
