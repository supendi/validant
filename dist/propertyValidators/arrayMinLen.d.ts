import { PropertyValidator } from "../types";
/**
 * Specifies the minimum length of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const arrayMinLen: <TValue, TObject>(min: number, errorMessage?: string) => PropertyValidator<TValue[], TObject>;
