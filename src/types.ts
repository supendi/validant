/**
 * Represents a generic type that is possibly undefined
 */
export type PossiblyUndefined<T> = T | undefined

/**
 * Helps to get the original type of an array type.
 * Example: if we have a type of T[], then the TypeOfArray<T[]> is T.
 * See: https://stackoverflow.com/questions/46376468/how-to-get-type-of-array-items
 */
export type TypeOfArray<T> = T extends (infer U)[] ? U : never;

/**
 * Represents an error of T.
 * Example: If T is { name: string }
 * Then ErrorOf<T> is { name: string[] } 
 */
export type ErrorOf<T> = { [key in keyof T]?:
    T[key] extends Date ? string[]
    : T[key] extends PossiblyUndefined<Array<any>> ? ErrorOfArray<T[key]>
    : T[key] extends PossiblyUndefined<object> ? ErrorOf<T[key]>
    : string[] }

/**
 * Represent the error that has index as one of its properties.
 */
export type IndexedErrorOf<T> = { index: number, errors: ErrorOf<T>, validatedObject: T | null | undefined }

/**
 * Represent the error model for array.
 * Example: If T { name: string, children: T[]}
 * Then ErrorOfArray<T> will be  { name: string[], children: { propertyErrors: string[], indexedErrors: { index: number, errors: ErrorOf<T>, validatedObject: T | null | undefined }}}
 */
export type ErrorOfArray<TArray> = {
    /**
     * Represents the error of the array as whole (or a single property that is validated).
     * Example: 
     * { orderItems: OrderItem[] } 
     * If we need the minimum count of order items to be 5 items. Then such error will be exist here.   
     * The error will be represented as:
     * { orderItems: { errors: ["The minimum order is 5 items"]}}
     */
    errors?: string[],

    /**
     * If each element of array need to be validated.
     * The errorsEach represents the errors of the each element of the array.
     */
    errorsEach?: IndexedErrorOf<TypeOfArray<TArray>>[]
}

/**
 * Specifies the contract of validator function.
 * See the PropertyRule implementation of how the validator func being implemented.
 */
export type ValidateFunc<TValue, TObject> = (value: TValue, objRef?: TObject) => boolean

/**
 * Represents the object model of property rule.
 * See the validators implementation.
 */
export type PropertyRuleFunc<TValue, TObject> = (value: TValue, objRef?: TObject) => {
    isValid: boolean;
    errorMessage?: string
}

/**
 * Represents a collection of validation rules.
 * The validation schema should implement this type.
 */
export type ValidationRule<T> = { [key in keyof T]?
    : T[key] extends Date ? PropertyRuleFunc<T[key], T>[]
    : T[key] extends PossiblyUndefined<Array<any>> ? ArrayValidationRule<T[key], T> | ((value: T[key], objRef?: T) => ArrayValidationRule<T[key], T>)
    : T[key] extends PossiblyUndefined<object> ? ValidationRule<T[key]>
    : PropertyRuleFunc<T[key], T>[] }

/**
 * Represents validation rule of array of T
 * Example:
 * {
        orderItems: {
            validators: [arrayMinLength(3)],
            validationRule: {
                qty: [minNumber(5)]
            }
        }
 * }
 */
export type ArrayValidationRule<TValue, TObject> = {
    /**
    * The validator of property where its type is array.
    * Example:
    * { orderItems: { validators: [arrayMinLength(5)] }
    */
    arrayRules?: PropertyRuleFunc<TValue, TObject>[],

    /**
     * The validation rule foreach element of an array.
     * Example:
     * { orderItems: { validationRule: { qty: [minNumber(5)] } }
     */
    arrayItemRule?: ValidationRule<PossiblyUndefined<TypeOfArray<TValue>>> | ((a: TypeOfArray<TValue>, b: TObject) => ValidationRule<TypeOfArray<TValue>>)
}


