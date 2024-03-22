import { PropertyValidator, TypeOfArray } from "../types";
declare type MinimumSumOfValidator = <TValue, TObject>(propNameToBeSummed: keyof TypeOfArray<TValue>, value: number, errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Specifies the rule of minimum sum of the specified property name of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minSumOf: MinimumSumOfValidator;
export {};
