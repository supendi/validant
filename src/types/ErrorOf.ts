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

export type ErrorValueOf<T, K extends keyof T> =
    T[K] extends Date
    ? string[]
    : T[K] extends PossiblyUndefined<Array<any>>
    ? ErrorOfArray<T[K]>
    : T[K] extends PossiblyUndefined<object>
    ? ErrorOf<T[K]>
    : string[];

export interface FieldErrorOf<T, K extends keyof T = keyof T> {
    isValid: boolean;
    fieldName: K;
    errors?: {
        [P in K]: ErrorValueOf<T, P>;
    };
}

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