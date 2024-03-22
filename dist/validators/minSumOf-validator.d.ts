import { PropertyValidator } from "../types";
declare type MinimumSumOfValidator = <T>(propNameToBeSummed: string, value: number, errorMessage?: string) => PropertyValidator<T>;
/**
 * Specifies the rule of minimum sum of the specified property name of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minSumOf: MinimumSumOfValidator;
export {};
