import { PropertyValidator } from "../types";
/**
 * Specifies the rule that the property is required.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const required: <TValue, TObject>(errorMessage?: string) => PropertyValidator<TValue, TObject>;
