import { PossiblyUndefined, PropertyRuleFunc } from "../types";
/**
 * Specifies the minimum length of an array.
 * @param min The minimum number of elements required.
 * @param errorMessage Optional custom error message.
 */
export declare const arrayMinLen: <TValue, TObject>(min: number, errorMessage?: string) => PropertyRuleFunc<PossiblyUndefined<TValue[]>, TObject>;
