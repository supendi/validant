import { PropertyRuleFunc } from "../types";
/**
 * Specifies the minimum length of a string.
 * @param minLen
 * @param errorMessage
 * @returns
 */
export declare function stringMinLen<TObject>(minLen: number, errorMessage?: string): PropertyRuleFunc<string, TObject>;
