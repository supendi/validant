import { PropertyRuleFunc } from "../types";
/**
 * Returns a minimum number validation rule.
 * @param min The minimum value that is allowed.
 * @param errorMessage Custom error message.
 * @returns The validation rule.
 */
export declare const minNumber: <TObject>(min: number, errorMessage?: string) => PropertyRuleFunc<number, TObject>;
