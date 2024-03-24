import { PropertyValidator } from "../types";
declare type EqualToPropertyValueValidator = <TValue, TObject>(equalToPropName: keyof TObject, errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const equalToPropertyValue: EqualToPropertyValueValidator;
export {};
