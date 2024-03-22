import { PropertyValidator } from "../types";
declare type MaximumSumOfValidator = <T>(propNameToBeSummed: keyof T, value: number, errorMessage?: string) => PropertyValidator<T>;
/**
 * Specifies the rule of maximum sum of the spesified property name of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const maxSumOf: MaximumSumOfValidator;
export {};
