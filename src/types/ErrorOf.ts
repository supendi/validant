import { RuleViolation } from "./ValidationRule";

/**
 * Represents a generic type that is possibly undefined.
 */
export type PossiblyUndefined<T> = T | undefined

/**
 * Infers the element type from an array type.
 * 
 * @example
 * ```typescript
 * type StringArray = string[];
 * type Element = ArrayElementType<StringArray>; // string
 * 
 * type NumberArray = number[];
 * type Element = ArrayElementType<NumberArray>; // number
 * ```
 */
export type ArrayElementType<TArray> = TArray extends (infer U)[] ? U : never;

/**
 * Represents the error structure for a given object type T.
 * Each property of T becomes an optional property in ErrorOf<T> with an array of RuleViolation.
 * 
 * @example
 * ```typescript
 * interface User {
 *   name: string;
 *   age: number;
 * }
 * 
 * type UserErrors = ErrorOf<User>;
 * // Result: { name?: RuleViolation[], age?: RuleViolation[] }
 * ```
 */
export type ErrorOf<T> = { [key in keyof T]?:
    T[key] extends Date ? RuleViolation[]
    : T[key] extends PossiblyUndefined<Array<infer U>> ? ErrorOfArray<U[]>
    : T[key] extends PossiblyUndefined<object> ? ErrorOf<T[key]>
    : RuleViolation[] }

/**
 * Represents an error for a specific array element, including its index and attempted value.
 */
export type IndexedErrorOf<T> = {
    /** The index of the array element that failed validation */
    index: number,
    /** The validation errors for this specific element */
    errors: T extends object ? ErrorOf<T> : RuleViolation[],
    /** The actual value that was attempted to be validated */
    attemptedValue: T | null | undefined
}

/**
 * Represents the error model for array validation.
 * Contains errors both at the array level (e.g., length constraints) and element level.
 * 
 * @example
 * ```typescript
 * interface OrderItem {
 *   name: string;
 *   quantity: number;
 * }
 * 
 * interface Order {
 *   items: OrderItem[];
 * }
 * 
 * // If validation fails, errors might look like:
 * const orderErrors: ErrorOf<Order> = {
 *   items: {
 *     arrayErrors: ["Minimum 1 item required"],
 *     arrayElementErrors: [
 *       {
 *         index: 0,
 *         errors: { name: ["Name is required"] },
 *         attemptedValue: { name: "", quantity: 1 }
 *       }
 *     ]
 *   }
 * };
 * ```
 */
export type ErrorOfArray<TArray> = {
    /**
     * Validation errors that apply to the array as a whole.
     * Examples: minimum/maximum length violations, required array constraints.
     */
    arrayErrors?: RuleViolation[],

    /**
     * Validation errors for individual array elements.
     * Each element error includes the index, specific field errors, and the attempted value.
     */
    arrayElementErrors?: IndexedErrorOf<ArrayElementType<TArray>>[]
}