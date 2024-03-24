import { PropertyValidator } from "../types";
declare type ArrayMinLengthValidator = <TValue, TObject>(min: number, errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Specifies the minimum length of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const arrayMinLength: ArrayMinLengthValidator;
export {};
