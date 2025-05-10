import { PropertyRuleFunc } from "../types";
/**
 * Specifies the rule if a value is match with the specified regular expression.
 * @param regex
 * @param errorMessage
 * @param description
 * @returns
 */
export declare const regularExpression: <TValue, TObject>(regex: RegExp, errorMessage?: string, description?: string) => PropertyRuleFunc<TValue, TObject>;
