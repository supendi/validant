import { PropertyRuleFunc } from "../types";
/**
 * Specifies the rule of maximum value of a number.
 * @param max The maximum allowed value.
 * @param errorMessage Optional custom error message.
 */
export declare const maxNumber: <TObject>(max: number, errorMessage?: string) => PropertyRuleFunc<number, TObject>;
