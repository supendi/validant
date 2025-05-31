import { AsyncArrayValidationRule, AsyncValidationRule, GenericValidateFunc } from "../types/AsyncValidationRule";
import { ErrorOf, ErrorOfArray } from "../types/ErrorOf";
import { ArrayValidationRule } from "../types/ValidationRule";
import { ValidationRule } from "../types/ValidationRule";
import { validateFieldAsync } from "./validateFieldAsync";
import { Violations, ObjectFieldValidationResult, PrimitiveFieldValidationResult, PropertyType } from "./validateObject";

export function isAsyncArrayValidationRule<T, TRoot>(rule: AsyncValidationRule<T, TRoot>[Extract<keyof T, string>] | AsyncArrayValidationRule<T[Extract<keyof T, string>], TRoot>) {
    const allowedKeys = new Set(["arrayRules", "arrayElementRule"]);
    const keys = Object.keys(rule);

    const isArrayRule = keys.every(key => allowedKeys.has(key));
    return isArrayRule
}

export async function validatePrimitiveFieldAsync<T, TRoot>(key: Extract<keyof T, string>, object: T, root: TRoot, rule: GenericValidateFunc<T[Extract<keyof T, string>], TRoot>[]): Promise<PrimitiveFieldValidationResult> {
    var violations: Violations = [];
    for (let index = 0; index < rule.length; index++) {
        const validateFunc = rule[index];
        if (!validateFunc) {
            continue;
        }

        const isFunction = typeof (validateFunc) === "function";
        if (!isFunction) {
            throw Error("validateFunc is not a function")
            // continue;
        }

        const propValidationResult = await validateFieldAsync(key, object, root, validateFunc);

        const isValid = propValidationResult.isValid;

        if (!isValid) {
            violations.push({
                attemptedValue: propValidationResult.propertyValue,
                errorMessage: propValidationResult.errorMessage,
                ruleName: propValidationResult.ruleName,
            });
        }
    }
    const validationResult: PrimitiveFieldValidationResult = {
        errors: violations,
        isValid: violations.length === 0
    };
    return validationResult
}

async function validateArrayFieldAsync<T, TRoot>(key: Extract<keyof T, string>, object: T, root: TRoot, rule: AsyncValidationRule<T, TRoot>[Extract<keyof T, string>] | AsyncArrayValidationRule<T[Extract<keyof T, string>], TRoot>) {

    const value = object[key];

    // Support dynamic rule builder function
    if (typeof rule === "function") {
        const builtRule = rule(value, root)
        return validateArrayFieldAsync(key, object, root, builtRule) // Recurse into built rule
    }

    var arrayFieldErrors: ErrorOfArray<T> = {};

    const arrayValidationRule = rule as ArrayValidationRule<typeof value, TRoot>;

    if (arrayValidationRule.arrayRules) {
        for (let index = 0; index < arrayValidationRule.arrayRules.length; index++) {
            const primitiveFieldValidationResult = await validatePrimitiveFieldAsync(key, object, root, arrayValidationRule.arrayRules)
            if (!primitiveFieldValidationResult.isValid) {
                arrayFieldErrors.arrayErrors = primitiveFieldValidationResult.errors
            }
        }
    }

    if (arrayValidationRule.arrayElementRule && Array.isArray(value)) {
        for (let index = 0; index < value.length; index++) {
            const element = value[index];
            let error: ErrorOf<any> = undefined
            if (typeof arrayValidationRule.arrayElementRule === "function") {
                const validationRule = arrayValidationRule.arrayElementRule(element, root)
                error = await validateObjectAsync(element, root, validationRule);
            }
            else {
                error = await validateObjectAsync(element, root, arrayValidationRule.arrayElementRule);
            }
            if (error) {
                if (!arrayFieldErrors.arrayElementErrors) {
                    arrayFieldErrors.arrayElementErrors = []
                }

                arrayFieldErrors.arrayElementErrors.push({
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

async function validateObjectFieldAsync<T, TRoot>(key: Extract<keyof T, string>, object: T, root: TRoot, rule: AsyncValidationRule<T, TRoot>[Extract<keyof T, string>]): Promise<ObjectFieldValidationResult<T[Extract<keyof T, string>]>> {
    var violations: Violations = [];
    const value = object[key];

    const childValidationRule = rule as ValidationRule<typeof value, TRoot>;
    const error = await validateObjectAsync(value, root, childValidationRule);
    const validationResult: ObjectFieldValidationResult<T[Extract<keyof T, string>]> = {
        errors: error,
        isValid: violations.length === 0 && !error
    };
    return validationResult
}

/**
 * Validates and collects errors of each property as array of string
 * @param object
 * @param validationRule
 * @returns
 */
export const validateObjectAsync = async <T, TRoot>(object: T, rootObject: TRoot, validationRule: AsyncValidationRule<T, TRoot>): Promise<ErrorOf<T>> => {
    if (!validationRule) {
        throw new Error(`validant: validation rule is null or undefined.`)
    }
    if (!object) {
        object = {} as T
    }
    var errors: ErrorOf<T> = undefined;

    function assignErrorsIfAny(key: any, violations: Violations | ErrorOfArray<T> | ErrorOf<T[Extract<keyof T, string>]>) {
        if (!errors) {
            errors = {};
        }
        errors[key as any] = violations
    }

    //Iterate against validation rule instead.
    //Example : the rule is {name:[required()]}, if we passed an empty object {}, then the validation wont work. It will always returns empty errors, which is very wrong. 
    for (const key in validationRule) {
        if (Object.prototype.hasOwnProperty.call(validationRule, key)) {
            const value = object[key];
            const rule = validationRule[key];
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
            const isArrayProperty = isAsyncArrayValidationRule(rule)
            const isObjectProperty = typeof value === "object"

            if (isPrimitiveProperty) {
                const validationResult = await validatePrimitiveFieldAsync(key, object, rootObject, rule)
                if (!validationResult.isValid) {
                    assignErrorsIfAny(key, validationResult.errors)
                }
                continue
            }
            if (isArrayProperty) {
                const result = await validateArrayFieldAsync(key, object, rootObject, rule)
                if (result?.arrayErrors || result?.arrayElementErrors) {
                    assignErrorsIfAny(key, result)
                }
                continue
            }
            if (isObjectProperty) {
                const error = await validateObjectFieldAsync(key, object, rootObject, rule)
                if (error && !error.isValid) {
                    assignErrorsIfAny(key, error.errors)
                }
            }
        }
    }
    return errors;
};
