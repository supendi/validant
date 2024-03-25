import { PropertyValidator, TypeOfArray } from "../types";
/**
 * Specifies the rule of maximum sum of the spesified property name of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const maxSumOf: <TValue, TObject>(propNameToBeSummed: keyof TValue, maxSum: number, errorMessage?: string) => PropertyValidator<TValue[], TObject>;
