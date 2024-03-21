
/**
 * Helps to get the original type of an array type.
 * See: https://stackoverflow.com/questions/46376468/how-to-get-type-of-array-items
 */
type GetArrayReturnType<T> = T extends (infer U)[] ? U : never;


/**
 * Represents the error of object which property data type is string
 */
export type StringifiedErrorOf<T> = { [key in keyof T]?: T[key] extends object
    ? T[key] extends Array<any> ? StringifiedValidationResult<T[key]>
    : T[key] extends Date ? string
    : StringifiedErrorOf<T[key]> : string }

/**
 * Represents the model of validation result returned by the validateObject and the validationField method
 */
export type StringifiedValidationResult<T> = {
    isValid: boolean,
    errorMessage: string | null
    errors?: StringifiedErrorOf<T> | null,
    subErrors?: StringifiedErrorOf<T> | null
}

export interface ValidationResult<T> {
    isValid: boolean
    errors: ArrayStringErrorOf<T>
}

export type IndexedArrayStringErrorOf<T> = { index: number, errors: ArrayStringErrorOf<T> }

/**
 * Represents the error of object which property data type array of string
 */
export type ArrayStringErrorOf<T> = { [key in keyof T]?: T[key] extends object
    ? T[key] extends Array<any> ? { fieldErrors?: string[], indexedErrors?: IndexedArrayStringErrorOf<GetArrayReturnType<T[key]>>[] } :
    T[key] extends Date
    ? string[] : ArrayStringErrorOf<T[key]>
    : string[] }

/**
 * Specifies the contract of validator function
 */
export type ValidatorFunc = (value: any, objRef?: any) => boolean

/**
 * Represents the object model of field validator
 */
export type FieldValidator = {
    description: string
    validate: ValidatorFunc
    returningErrorMessage: string
}

/**
 * Represents a collection of validation rules.
 * The validation schema should implement this type.
 */
export type ValidationRule<T> = { [key in keyof T]?: T[key] extends Array<any>
    ? ValidationRuleForArrayOf<GetArrayReturnType<T[key]>> : T[key] extends object
    ? ValidationRule<T[key]> : FieldValidator[] }

/**
 * Represents validation rule of array of T
 */
export type ValidationRuleForArrayOf<T> = {
    fieldValidators?: FieldValidator[],
    validationRule?: ValidationRule<T>
}

/**
 * Represents a single validation result of property/field 
 */
export interface FieldValidationResult {
    object: any,
    fieldName: string,
    fieldValue: any
    isValid: boolean,
    errorMessage: string
}
