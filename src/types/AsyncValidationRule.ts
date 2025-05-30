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
     * The validation rule foreach element of an array.
     * Example:
     * { orderItems: { arrayElementRule: { qty: [minNumber(5)] } }
     */
    arrayElementRule?: AsyncValidationRule<PossiblyUndefined<ArrayElementType<TArrayValue>>, TRoot> | ((arrayItem: ArrayElementType<TArrayValue>, root: TRoot) => AsyncValidationRule<ArrayElementType<TArrayValue>, TRoot>);
};