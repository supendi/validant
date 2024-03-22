import { PropertyValidator } from "../types";
declare type RegularExpressionValidator = <TValue, TObject>(regex: RegExp, errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Specifies the rule if a value is match with the specified regular expressin.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const regularExpression: RegularExpressionValidator;
export {};
