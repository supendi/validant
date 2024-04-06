import { PropertyValidator } from "../types";
/**
 * Specifies the rule of maximum value of a number.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const maxNumber: <TObject>(max: number, errorMessage?: string) => PropertyValidator<number, TObject>;
