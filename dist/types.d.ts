/**
 * Represents the error of object which property data type is string
 */
export declare type StringifiedErrorOf<T> = {
    [key in keyof T]?: T[key] extends object ? T[key] extends Array<any> ? StringifiedValidationResult<T[key]> : T[key] extends Date ? string : StringifiedErrorOf<T[key]> : string;
};
/**
 * Represents the model of validation result returned by the validateObject and the validationField method
 */
export declare type StringifiedValidationResult<T> = {
    isValid: boolean;
    errorMessage: string | null;
    errors?: StringifiedErrorOf<T> | null;
    subErrors?: StringifiedErrorOf<T> | null;
};
export interface ValidationResult<T> {
    isValid: boolean;
    errors: ArrayStringErrorOf<T>;
}
/**
 * Represents the error of object which property data type array of string
 */
export declare type ArrayStringErrorOf<T> = {
    [key in keyof T]?: T[key] extends object ? T[key] extends Array<any> ? {
        fieldErrors?: string[];
        elementErrors?: ArrayStringErrorOf<T[key]>;
    } : T[key] extends Date ? string[] : ArrayStringErrorOf<T[key]> : string[];
};
/**
 * Specifies the contract of validator function
 */
export declare type ValidatorFunc = (value: any, objRef?: any) => boolean;
/**
 * Represents the object model of field validator
 */
export declare type FieldValidator = {
    description: string;
    validate: ValidatorFunc;
    returningErrorMessage: string;
};
/**
 * Represents a collection of validation rules.
 * The validation schema should implement this type.
 */
export declare type ValidationRule<T, U = T> = {
    [key in keyof T]?: T[key] extends Array<any> ? ValidationRuleForArrayOf<U> : T[key] extends object ? ValidationRule<T[key]> : FieldValidator[];
};
/**
 * Represents validation rule of array of T
 */
export declare type ValidationRuleForArrayOf<T> = {
    fieldValidators?: FieldValidator[];
    validationRule?: ValidationRule<T>;
};
/**
 * Represents a single validation result of property/field
 */
export interface FieldValidationResult {
    object: any;
    fieldName: string;
    fieldValue: any;
    isValid: boolean;
    errorMessage: string;
}
