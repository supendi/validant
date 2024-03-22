import { PropertyValidator } from "../types";
declare type CustomValidator = <T>(func: Function, errorMessage: string) => PropertyValidator<T>;
/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const custom: CustomValidator;
export {};
