import { PropertyValidator, PropertyValidationResult } from "../types";
/**
 * Do a single validation against single property
 * @param propName
 * @param object
 * @param propValidator
 * @returns
 */
export declare const validateField: <TValue, TObject>(propName: keyof TObject, object: TObject, propValidator: PropertyValidator<TValue, TObject>) => PropertyValidationResult<TObject>;
