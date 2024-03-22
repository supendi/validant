import { PropertyValidator, ValidatorFunc } from "../types";
declare type CustomValidator = <TValue, TObject>(func: ValidatorFunc<TValue, TObject>, errorMessage: string) => PropertyValidator<TValue, TObject>;
/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const custom: CustomValidator;
export {};
