import { ErrorOf, ErrorOfArray } from "../types/ErrorOf";
import { ArrayValidationRule } from "../types/ValidationRule";
import { PropertyRuleFunc } from "../types/ValidationRule";
import { ValidationRule } from "../types/ValidationRule";
import { validateField } from "./validateField";

export type PropertyType = "array" | "object" | "primitive" | "undefined"

type PrimitiveRule<T, TRoot> = PropertyRuleFunc<T[Extract<keyof T, string>], TRoot>[]

export type FieldErrors = string[]

export type PrimitiveFieldValidationResult = {
    isValid: boolean
    errors: FieldErrors
}

export type ObjectFieldValidationResult<T> = {
    isValid: boolean
    errors?: ErrorOf<T> | FieldErrors
}

export function isArrayValidationRule<T, TRoot>(rule: ValidationRule<T, TRoot>[Extract<keyof T, string>] | ArrayValidationRule<T[Extract<keyof T, string>], TRoot>) {
    const allowedKeys = new Set(["arrayRules", "arrayItemRule"]);
    const keys = Object.keys(rule);

    const isArrayRule = keys.every(key => allowedKeys.has(key));
    return isArrayRule
}

export function validatePrimitiveField<T, TRoot>(key: Extract<keyof T, string>, object: T, root: TRoot, rule: PrimitiveRule<T, TRoot>): PrimitiveFieldValidationResult {
    var fieldErrors: FieldErrors = [];
    for (let index = 0; index < rule.length; index++) {
        const propertyRuleFunc = rule[index];
        if (!propertyRuleFunc) {
            continue;
        }

        const isFunction = typeof (propertyRuleFunc) === "function";
        if (!isFunction) {
            throw Error("propertyRuleFunc is not a function")
        }

        const propValidationResult = validateField(key, object, root, propertyRuleFunc);

        const isValid = propValidationResult.isValid;

        if (!isValid) {
            fieldErrors.push(propValidationResult.errorMessage);
        }
    }
    const validationResult: PrimitiveFieldValidationResult = {
        errors: fieldErrors,
        isValid: fieldErrors.length === 0
    };
    return validationResult
}

function validateArrayField<T, TRoot>(key: Extract<keyof T, string>, object: T, root: TRoot, rule: ValidationRule<T, TRoot>[Extract<keyof T, string>] | ArrayValidationRule<T[Extract<keyof T, string>], TRoot>) {

    const value = object[key];

    // Support dynamic rule builder function
    if (typeof rule === "function") {
        const arrayRule = rule(value, root)
        return validateArrayField(key, object, root, arrayRule) // Recurse into built rule
    }

    var arrayFieldErrors: ErrorOfArray<T> = {};

    const arrayValidationRule = rule as ArrayValidationRule<typeof value, TRoot>;

    if (arrayValidationRule.arrayRules) {
        for (let index = 0; index < arrayValidationRule.arrayRules.length; index++) {
            const primitiveFieldValidationResult = validatePrimitiveField(key, object, root, arrayValidationRule.arrayRules)
            if (!primitiveFieldValidationResult.isValid) {
                arrayFieldErrors.errors = primitiveFieldValidationResult.errors
            }
        }
    }

    if (arrayValidationRule.arrayItemRule && Array.isArray(value)) {
        for (let index = 0; index < value.length; index++) {
            const element = value[index];
            let error: ErrorOf<any> = undefined
            if (typeof arrayValidationRule.arrayItemRule === "function") {
                const validationRule = arrayValidationRule.arrayItemRule(element, root)
                error = validateObject(element, root, validationRule);
            }
            else {
                error = validateObject(element, root, arrayValidationRule.arrayItemRule);
            }
            if (error) {
                if (!arrayFieldErrors.errorsEach) {
                    arrayFieldErrors.errorsEach = []
                }

                arrayFieldErrors.errorsEach.push({
                    index: index,
                    errors: error,
                    validatedObject: element
                });
            }
            continue;
        }
    }

    return arrayFieldErrors
}


function validateObjectField<T, TRoot>(key: Extract<keyof T, string>, object: T, root: TRoot, rule: ValidationRule<T, TRoot>[Extract<keyof T, string>]): ObjectFieldValidationResult<T[Extract<keyof T, string>]> {
    var fieldErrors: FieldErrors = [];
    const value = object[key];

    const childValidationRule = rule as ValidationRule<typeof value, TRoot>;
    const error = validateObject(value, root, childValidationRule);
    const validationResult: ObjectFieldValidationResult<T[Extract<keyof T, string>]> = {
        errors: error,
        isValid: fieldErrors.length === 0 && !error
    };
    return validationResult
}

/**
 * Validates and collects errors of each property as array of string
 * @param object
 * @param validationRule
 * @returns
 */
export const validateObject = <T, TRoot>(object: T, rootObject: TRoot, validationRule: ValidationRule<T, TRoot>): ErrorOf<T> => {
    if (!object) {
        throw new Error(`validant: object is null or undefined during validation.`)
    }
    if (!validationRule) {
        throw new Error(`validant: validation rule is null or undefined.`)
    }
    var errors: ErrorOf<T> = undefined;

    function assignErrorsIfAny(key: any, fieldErrors: FieldErrors | ErrorOfArray<T> | ErrorOf<T[Extract<keyof T, string>]>) {
        if (!errors) {
            errors = {};
        }
        errors[key as any] = fieldErrors
    }

    //Iterate against validation rule instead.
    //Example : the rule is {name:[required()]}, if we passed an empty object {}, then the validation wont work. It will always returns empty errors, which is very wrong. 
    for (const key in validationRule) {
        if (Object.prototype.hasOwnProperty.call(validationRule, key)) {
            const rule = validationRule[key];
            const value = object[key]
            if (!rule) {
                continue;
            }

            const allowedRules = ["array", "object", "function"]
            const typeOfRule = typeof rule
            const isValidRuleType = allowedRules.includes(typeOfRule)
            if (!isValidRuleType) {
                throw new Error(`${typeOfRule} is not a valid rule.`)
            }

            const isPrimitiveProperty = Array.isArray(rule)
            const isArrayProperty = isArrayValidationRule(rule)
            const isObjectProperty = typeof value === "object"

            if (isPrimitiveProperty) {
                const validationResult = validatePrimitiveField(key, object, rootObject, rule)
                if (!validationResult.isValid) {
                    assignErrorsIfAny(key, validationResult.errors)
                }
                continue
            }
            if (isArrayProperty) {
                const result = validateArrayField(key, object, rootObject, rule)
                if (result?.errors || result?.errorsEach) {
                    assignErrorsIfAny(key, result)
                }
                continue
            }
            if (isObjectProperty) {
                const error = validateObjectField(key, object, rootObject, rule)
                if (error && !error.isValid) {
                    assignErrorsIfAny(key, error.errors)
                }
            }
        }
    }
    return errors;
};
