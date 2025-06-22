import { PossiblyUndefined, ArrayElementType } from "./ErrorOf";

/**
 * Represents the return type or validation result when ValidateFunc invoked
 */
export interface RuleViolation {
    ruleName: string;
    attemptedValue: any;
    errorMessage: string;
}

/**
* The signature of property rule function, used as property rule.
* Use this function signature for custom validation.
*/
export type ValidateFunc<TValue, TRoot extends Object> = (value: TValue, root: TRoot) => RuleViolation | undefined;

/**
 * Represents a set of validation rules.
 * The validation rule should implement this type.
 */
export type ValidationRule<T, TRoot extends Object = T> = { [key in keyof T]?
    : T[key] extends Date ? ValidateFunc<T[key], TRoot>[]
    : T[key] extends PossiblyUndefined<Array<any>> ? ArrayValidationRule<T[key], TRoot> | ((value: T[key], root: TRoot) => ArrayValidationRule<T[key], TRoot>)
    : T[key] extends PossiblyUndefined<object> ? ValidationRule<T[key], TRoot>
    : ValidateFunc<T[key], TRoot>[] }

/**
* Represents validation rule of array of T
* Example:
* {
    orderItems: {
        arrayRules: [arrayMinLength(3)],
        arrayElementRule: {
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
    arrayRules?: ValidateFunc<TArrayValue, TRoot>[];

    /**
     * The validation rule for each element of an array.
     * 
     * For object arrays: ValidationRule<T> or function returning ValidationRule<T>
     * For primitive arrays: ValidateFunc<T>[] or function returning ValidateFunc<T>[]
     * 
     * Examples:
     * Object array: { orderItems: { arrayElementRule: { qty: [minNumber(5)] } } }
     * Primitive array: { tags: { arrayElementRule: [required(), stringMinLen(3)] } }
     * Dynamic object: { orderItems: { arrayElementRule: (item, root) => ({ qty: [minNumber(item.type === 'bulk' ? 10 : 1)] }) } }
     * Dynamic primitive: { tags: { arrayElementRule: (tag, root) => [required(), stringMinLen(root.isAdmin ? 1 : 3)] } }
     */
    arrayElementRule?: ArrayElementType<TArrayValue> extends string | number | boolean | Date
        ? // Primitive elements: ValidateFunc[] or function returning ValidateFunc[]
          ValidateFunc<ArrayElementType<TArrayValue>, TRoot>[] | 
          ((element: ArrayElementType<TArrayValue>, root: TRoot) => ValidateFunc<ArrayElementType<TArrayValue>, TRoot>[])
        : // Object elements: ValidationRule or function returning ValidationRule
          ValidationRule<PossiblyUndefined<ArrayElementType<TArrayValue>>, TRoot> | 
          ((element: ArrayElementType<TArrayValue>, root: TRoot) => ValidationRule<ArrayElementType<TArrayValue>, TRoot>);
};