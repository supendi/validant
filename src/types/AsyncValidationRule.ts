import { PossiblyUndefined, ArrayElementType } from "./ErrorOf";
import { PropertyRuleFunc, PropertyRuleValidationResult } from "./ValidationRule";

/**
* The signature of property validator function, used as property rule.
* Use this function signature for custom validation.
*/
export type AsyncPropertyRuleFunc<TValue, TRoot extends Object> = (value: TValue, root: TRoot) => Promise<PropertyRuleValidationResult>;

/**
 * A property rule function that can be either synchronous or asynchronous.
 */
export type GenericPropertyRuleFunc<TValue, TRoot extends Object> = AsyncPropertyRuleFunc<TValue, TRoot> | PropertyRuleFunc<TValue, TRoot>

/**
 * Represents a set of validation rules.
 * The validation rule should implement this type.
 */
export type AsyncValidationRule<T, TRoot extends Object = T> = { [key in keyof T]?
    : T[key] extends Date ? (GenericPropertyRuleFunc<T[key], TRoot>)[]
    : T[key] extends PossiblyUndefined<Array<any>> ? AsyncArrayValidationRule<T[key], TRoot> | ((value: T[key], root: TRoot) => AsyncArrayValidationRule<T[key], TRoot>)
    : T[key] extends PossiblyUndefined<object> ? AsyncValidationRule<T[key], TRoot>
    : GenericPropertyRuleFunc<T[key], TRoot>[] }

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
export type AsyncArrayValidationRule<TArrayValue, TRoot extends Object> = {
    /**
    * The validator of property where its type is array.
    * Example:
    * { orderItems: { validators: [arrayMinLength(5)] }.
    * Can be sync or async function.
    */
    arrayRules?: GenericPropertyRuleFunc<TArrayValue, TRoot>[];

    /**
     * The validation rule foreach element of an array.
     * Example:
     * { orderItems: { arrayItemRule: { qty: [minNumber(5)] } }
     */
    arrayItemRule?: AsyncValidationRule<PossiblyUndefined<ArrayElementType<TArrayValue>>, TRoot> | ((arrayItem: ArrayElementType<TArrayValue>, root: TRoot) => AsyncValidationRule<ArrayElementType<TArrayValue>, TRoot>);
};