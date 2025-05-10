import { PropertyRuleFunc, TypeOfArray } from "../types";
/**
 * Specifies the rule of minimum sum of the specified property name of an array.
 * @param propNameToBeSummed The property name whose values will be summed.
 * @param minSum The minimum sum that should be allowed.
 * @param errorMessage Custom error message.
 * @returns The validation rule.
 */
export declare const minSumOf: <TValue, TObject>(propNameToBeSummed: keyof TypeOfArray<TValue[]>, minSum: number, errorMessage?: string) => PropertyRuleFunc<TValue[], TObject>;
