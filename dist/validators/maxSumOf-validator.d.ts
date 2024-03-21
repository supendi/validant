import { FieldValidator } from "../types";
declare type MaximumSumOfValidator = <T>(fieldNameToSum: keyof T, value: number, errorMessage?: string) => FieldValidator;
/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const maxSumOf: MaximumSumOfValidator;
export {};
