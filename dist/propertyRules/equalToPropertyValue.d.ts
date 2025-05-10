import { PropertyRuleFunc } from "../types";
/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const equalToPropertyValue: <TValue, TObject>(propertyNameToCompare: keyof TObject, errorMessage?: string) => PropertyRuleFunc<TValue, TObject>;
