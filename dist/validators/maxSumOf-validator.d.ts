import { PropertyValidator, TypeOfArray } from "../types";
declare type MaximumSumOfValidator = <TValue, TObject>(propNameToBeSummed: keyof TypeOfArray<TValue>, value: number, errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Specifies the rule of maximum sum of the spesified property name of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const maxSumOf: MaximumSumOfValidator;
export {};
