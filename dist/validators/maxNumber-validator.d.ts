import { FieldValidator } from "../types";
declare type MaxNumberValidator = (max: number, errorMessage?: string) => FieldValidator;
/**
 * Returns a maximum number validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const maxNumber: MaxNumberValidator;
export {};
