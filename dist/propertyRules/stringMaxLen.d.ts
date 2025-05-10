import { PropertyRuleFunc } from "../types";
/**
 * Specifies the maximum length of a string.
 * @param maxLength The maximum number of characters allowed.
 * @param errorMessage Custom error message.
 * @returns A property rule function.
 */
export declare function stringMaxLen<TObject>(maxLength: number, errorMessage?: string): PropertyRuleFunc<string, TObject>;
