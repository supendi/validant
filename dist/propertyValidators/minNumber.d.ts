import { PropertyValidator } from "../types";
/**
 * Returns a minimum number validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const minNumber: <TObject>(min: number, errorMessage?: string) => PropertyValidator<number, TObject>;
