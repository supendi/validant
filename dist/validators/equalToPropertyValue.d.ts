import { PropertyValidator } from "../types";
/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const equalToPropertyValue: <TValue, TObject>(equalToPropName: keyof TObject, errorMessage?: string) => PropertyValidator<TValue, TObject>;
