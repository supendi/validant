import { PropertyRuleFunc, TypeOfArray } from "../types";
/**
 * Specifies the rule of maximum sum of the specified property name of an array.
 * @param propNameToBeSummed The property name whose sum is checked.
 * @param maxSum The maximum allowed sum.
 * @param errorMessage Optional custom error message.
 */
export declare const maxSumOf: <TValue, TObject>(propNameToBeSummed: keyof TypeOfArray<TValue[]>, maxSum: number, errorMessage?: string) => PropertyRuleFunc<TValue[], TObject>;
