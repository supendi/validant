/**
 * Represents a generic type that is possibly undefined
 */
export type PossiblyUndefined<T> = T | undefined

/**
 * Infers array element type.
 * Example: if we have a type of T[], then the ArrayElementType<T[]> is T. 
 */
export type ArrayElementType<TArray> = TArray extends (infer U)[] ? U : never;

/**
 * Represents an error of T.
 * Example: If T is { name: string }
 * Then ErrorOf<T> is { name: string[] } 
 */
export type ErrorOf<T extends Object> = { [key in keyof T]?:
    T[key] extends Date ? string[]
    : T[key] extends PossiblyUndefined<Array<any>> ? ErrorOfArray<T[key]>
    : T[key] extends PossiblyUndefined<object> ? ErrorOf<T[key]>
    : string[] }

/**
 * Represent the error that has index as one of its properties.
 */
export type IndexedErrorOf<T extends Object> = {
    index: number,
    errors: ErrorOf<T>,
    validatedObject: T | null | undefined
}

/**
 * Represent the error model for array.
 * Example: If T { name: string, children: T[]}
 * Then ErrorOfArray<T> will be  { name: string[], children: { errors: string[], errorsEach: { index: number, errors: ErrorOf<T>, validatedObject: T | null | undefined }}[] }
 */
export type ErrorOfArray<TArray> = {
    /**
     * Represents the error on array level.
     * Example: 
     * { orderItems: OrderItem[] } 
     * If we specify rule minimum count of order items to be 5 items.
     * The error will be represented as:
     * { orderItems: { errors: ["The minimum order is 5 items"]}}
     */
    errors?: string[],

    /**
     * If each element of array need to be validated.
     * The errorsEach represents the errors of the each element of the array.
     * Example :
     * errorsEach: { index: number, errors: ErrorOf<T>, validatedObject: T | null | undefined }}[] 
     */
    errorsEach?: IndexedErrorOf<ArrayElementType<TArray>>[]
}


/**
 * Represents the return type or validation result when PropertyRuleFunc invoked 
 */
export interface PropertyRuleValidationResult {
    isValid: boolean;
    errorMessage?: string
}

/**
 * The signature of property validator function, used as property rule.
 * Use this function signature for custom validation.
 */
export type PropertyRuleFunc<TValue, TRoot extends Object> = (value: TValue, root: TRoot) => PropertyRuleValidationResult

/**
 * Represents a set of validation rules.
 * The validation schema should implement this type.
 */
export type ValidationRule<T, TRoot extends Object = T> = { [key in keyof T]?
    : T[key] extends Date ? PropertyRuleFunc<T[key], TRoot>[]
    : T[key] extends PossiblyUndefined<Array<any>> ? ArrayValidationRule<T[key], TRoot> | ((value: T[key], root: TRoot) => ArrayValidationRule<T[key], TRoot>)
    : T[key] extends PossiblyUndefined<object> ? ValidationRule<T[key], TRoot>
    : PropertyRuleFunc<T[key], TRoot>[] }

/**
 * Represents validation rule of array of T
 * Example:
 * {
        orderItems: {
            arrayRules: [arrayMinLength(3)],
            arrayItemRule: {
                qty: [minNumber(5)]
            }
        }
 * }
 */
export type ArrayValidationRule<TArrayValue, TRoot extends Object> = {
    /**
    * The validator of property where its type is array.
    * Example:
    * { orderItems: { validators: [arrayMinLength(5)] }
    */
    arrayRules?: PropertyRuleFunc<TArrayValue, TRoot>[],

    /**
     * The validation rule foreach element of an array.
     * Example:
     * { orderItems: { validationRule: { qty: [minNumber(5)] } }
     */
    arrayItemRule?: ValidationRule<PossiblyUndefined<ArrayElementType<TArrayValue>>, TRoot> | ((arrayItem: ArrayElementType<TArrayValue>, root: TRoot) => ValidationRule<ArrayElementType<TArrayValue>, TRoot>)
}


