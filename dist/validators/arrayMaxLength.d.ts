import { PropertyValidator } from "../types";
/**
 * Specifies the rule of the maximum number of element to exist in an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const arrayMaxLength: <TValue, TObject>(max: number, errorMessage?: string) => PropertyValidator<TValue[], TObject>;
