import { PossiblyUndefined, ArrayElementType } from "./ErrorOf";

/**
 * Represents the return type or validation result when PropertyRuleFunc invoked
 */
export interface PropertyRuleValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

/**
* The signature of property rule function, used as property rule.
* Use this function signature for custom validation.
*/
export type PropertyRuleFunc<TValue, TRoot extends Object> = (value: TValue, root: TRoot) => PropertyRuleValidationResult;

/**
 * Represents a set of validation rules.
 * The validation rule should implement this type.
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
    arrayRules?: PropertyRuleFunc<TArrayValue, TRoot>[];

    /**
     * The validation rule foreach element of an array.
     * Example:
     * { orderItems: { arrayElementRule: { qty: [minNumber(5)] } }
     */
    arrayElementRule?: ValidationRule<PossiblyUndefined<ArrayElementType<TArrayValue>>, TRoot> | ((arrayItem: ArrayElementType<TArrayValue>, root: TRoot) => ValidationRule<ArrayElementType<TArrayValue>, TRoot>);
};