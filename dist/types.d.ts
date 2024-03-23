/**
 * Helps to get the original type of an array type.
 * Example if we have a type of T[],
 * then the TypeOfArray<T[]> is T.
 * See: https://stackoverflow.com/questions/46376468/how-to-get-type-of-array-items
 */
export declare type TypeOfArray<T> = T extends (infer U)[] ? U : never;
/**
 * Represents the error of object which property data type is string.
 * Example: T = { name: string: age: number, birthDate: Date },
 * then the StringifiedErrorOf<T> =  { name: string: age: string, birthDate: string } (notice the type of its properties is all string).
 */
export declare type StringifiedErrorOf<T> = {
    [key in keyof T]?: T[key] extends object ? T[key] extends Array<any> ? StringifiedValidationResult<T[key]> : T[key] extends Date ? string : StringifiedErrorOf<T[key]> : string;
};
/**
 * Represents the model of validation result returned by the validateObject and the validationProperty method
 */
export declare type StringifiedValidationResult<T> = {
    isValid: boolean;
    errorMessage: string | null;
    errors?: StringifiedErrorOf<T> | null;
    subErrors?: StringifiedErrorOf<T> | null;
};
/**
 * Represents the validation result.
 * This model is the return type of validate() function.
 * See validator.validate().
 */
export interface ValidationResult<T> {
    isValid: boolean;
    message: string;
    errors: ErrorOf<T>;
}
/**
 * Represent the error that has index as one of its properties.
 */
export declare type IndexedErrorOf<T> = {
    index: number;
    errors: ErrorOf<T>;
    validatedObject: T | null | undefined;
};
/**
 * Represent the error model for array.
 * Example: If T { name: string, children: T[]}
 * Then ErrorOfArray<T> will be  { name: string[], children: { propertyErrors: string[], indexedErrors: { index: number, errors: ErrorOf<T>, validatedObject: T | null | undefined }}}
 */
export declare type ErrorOfArray<T> = {
    /**
     * Represents the error of the array as whole (or a single property that is validated).
     * Example:
     * { orderItems: OrderItem[] }
     * If we need the minimum count of order items to be 5 items. Then such error will be exist here.
     * The error will be represented as:
     * { orderItems: { arrayErrors: ["The minimum order is 5 items"]}}
     */
    errorOfArray?: string[];
    /**
     * If each element of array need to be validated.
     * The indexedErrors represents the errors of the each element of the array.
     */
    errorOfArrayElements?: IndexedErrorOf<TypeOfArray<T>>[];
};
/**
 * Represents an error of T.
 * Example: If T is { name: string }
 * Then ErrorOf<T> is { name: string[] }
 */
export declare type ErrorOf<T> = {
    [key in keyof T]?: T[key] extends object ? T[key] extends Array<any> ? ErrorOfArray<T[key]> : T[key] extends Date ? string[] : ErrorOf<T[key]> : string[];
};
/**
 * Specifies the contract of validator function.
 * See the PropertyValidator implementation of how the validator func being implemented.
 */
export declare type ValidatorFunc<TValue, TObject> = (value: TValue, objRef?: TObject) => boolean;
/**
 * Represents the object model of property validator.
 * See the validators implementation.
 */
export declare type PropertyValidator<TValue, TObject> = {
    description: string;
    validate: ValidatorFunc<TValue, TObject>;
    returningErrorMessage: string;
};
/**
 * Represents a collection of validation rules.
 * The validation schema should implement this type.
 */
export declare type ValidationRule<T> = {
    [key in keyof T]?: T[key] extends Date ? PropertyValidator<T[key], T>[] : T[key] extends Array<any> ? ValidationRuleForArrayOf<T, T[key]> : T[key] extends object ? ValidationRule<T[key]> : PropertyValidator<T[key], T>[];
};
/**
 * Represents validation rule of array of T
 */
export declare type ValidationRuleForArrayOf<TObject, TValue> = {
    validatorOfArray?: PropertyValidator<TValue, TObject>[];
    validationRuleOfArrayElement?: ValidationRule<TypeOfArray<TValue>>;
};
/**
 * Represents a single validation result of property
 */
export interface PropertyValidationResult<T> {
    object: any;
    propertyName: keyof T;
    propertyValue: any;
    isValid: boolean;
    errorMessage: string;
}
