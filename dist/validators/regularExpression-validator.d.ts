import { PropertyValidator } from "../types";
declare type RegularExpressionValidator = <T>(regex: RegExp, errorMessage?: string) => PropertyValidator<T>;
/**
 * Specifies the rule if a value is match with the specified regular expressin.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const regularExpression: RegularExpressionValidator;
export {};
