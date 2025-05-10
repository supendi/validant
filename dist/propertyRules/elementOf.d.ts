import { PossiblyUndefined, PropertyRuleFunc } from "../types";
/**
 * Specifies the rule if a value is an element of the specified array.
 * @param list The array of valid elements.
 * @param errorMessage Optional custom error message.
 */
export declare const elementOf: <TValue, TObject>(list: TValue[], errorMessage?: string) => PropertyRuleFunc<PossiblyUndefined<TValue>, TObject>;
