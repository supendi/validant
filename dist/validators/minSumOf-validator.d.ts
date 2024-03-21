import { FieldValidator } from "../types";
declare type MinimumSumOfValidator = <T>(fieldNameToSum: keyof T, value: number, errorMessage?: string) => FieldValidator;
/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minSumOf: MinimumSumOfValidator;
export {};
