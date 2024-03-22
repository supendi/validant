import { PropertyValidator, ValidatorFunc } from "../types";
declare type CustomValidator = <T>(func: ValidatorFunc<T>, errorMessage: string) => PropertyValidator<T>;
/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const custom: CustomValidator;
export {};
