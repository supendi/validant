import { PossiblyUndefined, ArrayElementType } from "./ErrorOf";
import { ValidateFunc, RuleViolation } from "./ValidationRule";

/**
* The signature of property validator function, used as property rule.
* Use this function signature for custom validation.
*/
export type AsyncValidateFunc<TValue, TRoot extends Object> = (value: TValue, root: TRoot) => Promise<RuleViolation | undefined>;

/**
 * A property rule function that can be either synchronous or asynchronous.
 */
export type GenericValidateFunc<TValue, TRoot extends Object> = AsyncValidateFunc<TValue, TRoot> | ValidateFunc<TValue, TRoot>

/**
 * Represents a set of validation rules.
 * The validation rule should implement this type.
 */
export type AsyncValidationRule<T, TRoot extends Object = T> = { [key in keyof T]?
    : T[key] extends Date ? (GenericValidateFunc<T[key], TRoot>)[]
    : T[key] extends PossiblyUndefined<Array<any>> ? AsyncArrayValidationRule<T[key], TRoot> | ((value: T[key], root: TRoot) => AsyncArrayValidationRule<T[key], TRoot>)
    : T[key] extends PossiblyUndefined<object> ? AsyncValidationRule<T[key], TRoot>
    : GenericValidateFunc<T[key], TRoot>[] }

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
export type AsyncArrayValidationRule<TArrayValue, TRoot extends Object> = {
    /**
    * The validator of property where its type is array.
    * Example:
    * { orderItems: { validators: [arrayMinLength(5)] }.
    * Can be sync or async function.
    */
    arrayRules?: GenericValidateFunc<TArrayValue, TRoot>[];

    /**
     * The validation rule for each element of an array.
     * 
     * For object arrays: AsyncValidationRule<T> or function returning AsyncValidationRule<T>
     * For primitive arrays: GenericValidateFunc<T>[] or function returning GenericValidateFunc<T>[]
     * 
     * Examples:
     * Object array: { orderItems: { arrayElementRule: { qty: [minNumber(5)] } } }
     * Primitive array: { tags: { arrayElementRule: [required(), stringMinLen(3)] } }
     * Dynamic object: { orderItems: { arrayElementRule: (item, root) => ({ qty: [minNumber(item.type === 'bulk' ? 10 : 1)] }) } }
     * Dynamic primitive: { tags: { arrayElementRule: (tag, root) => [required(), stringMinLen(root.isAdmin ? 1 : 3)] } }
     */
    arrayElementRule?: ArrayElementType<TArrayValue> extends string | number | boolean | Date
        ? // Primitive elements: GenericValidateFunc[] or function returning GenericValidateFunc[]
          GenericValidateFunc<ArrayElementType<TArrayValue>, TRoot>[] | 
          ((element: ArrayElementType<TArrayValue>, root: TRoot) => GenericValidateFunc<ArrayElementType<TArrayValue>, TRoot>[])
        : // Object elements: AsyncValidationRule or function returning AsyncValidationRule
          AsyncValidationRule<PossiblyUndefined<ArrayElementType<TArrayValue>>, TRoot> | 
          ((element: ArrayElementType<TArrayValue>, root: TRoot) => AsyncValidationRule<ArrayElementType<TArrayValue>, TRoot>);
};