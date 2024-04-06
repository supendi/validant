import { PropertyValidator, TypeOfArray } from "../types";
/**
 * Specifies the rule of minimum sum of the specified property name of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minSumOf: <TValue, TObject>(propNameToBeSummed: keyof TValue, minSum: number, errorMessage?: string) => PropertyValidator<TValue[], TObject>;
