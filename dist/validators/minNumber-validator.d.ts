import { PropertyValidator } from "../types";
declare type MinNumberValidator = <TValue, TObject>(min: number, errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Returns a minimum number validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minNumber: MinNumberValidator;
export {};
