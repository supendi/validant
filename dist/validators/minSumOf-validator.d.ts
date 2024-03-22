import { PropertyValidator } from "../types";
declare type MinimumSumOfValidator = <T>(propNameToBeSummed: keyof T, value: number, errorMessage?: string) => PropertyValidator;
/**
 * Specifies the rule of minimum sum of the specified property name of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minSumOf: MinimumSumOfValidator;
export {};
