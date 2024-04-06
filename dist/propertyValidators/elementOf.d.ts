import { PropertyValidator } from "../types";
/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const elementOf: <TValue, TObject>(list: TValue[], errorMessage?: string) => PropertyValidator<TValue, TObject>;
