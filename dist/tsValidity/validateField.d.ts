import { PropertyRuleFunc } from "../types";
/**
 * Represents a single validation result of property
 */
export interface PropertyValidationResult<T> {
    object: T;
    propertyName: keyof T;
    propertyValue: any;
    isValid: boolean;
    errorMessage: string;
}
/**
 * Do a single validation against single property
 * @param propName
 * @param object
 * @param propertyRuleFunc
 * @returns
 */
export declare const validateField: <TValue, TObject>(propName: keyof TObject, object: TObject, propertyRuleFunc: PropertyRuleFunc<TValue, TObject>) => PropertyValidationResult<TObject>;
