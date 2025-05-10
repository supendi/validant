import { PossiblyUndefined, PropertyRuleFunc } from "../types";
/**
 * Specifies the rule of the maximum number of elements allowed in an array.
 */
export declare const arrayMaxLen: <TValue, TObject>(max: number, errorMessage?: string) => PropertyRuleFunc<PossiblyUndefined<TValue[]>, TObject>;
