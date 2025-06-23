import { AsyncArrayValidationRule, AsyncValidationRule, GenericValidateFunc } from "../../types/AsyncValidationRule";
import { ErrorOf, ErrorOfArray } from "../../types/ErrorOf";
import { ArrayValidationRule } from "../../types/ValidationRule";
import { ValidationRule } from "../../types/ValidationRule";
import { Violations, ObjectFieldValidationResult, PrimitiveFieldValidationResult, PropertyType } from "../sync/validateObject";

export function isAsyncArrayValidationRule<T, TRoot>(rule: AsyncValidationRule<T, TRoot>[Extract<keyof T, string>] | AsyncArrayValidationRule<T[Extract<keyof T, string>], TRoot>) {
    const allowedKeys = new Set(["arrayRules", "arrayElementRule"]);
    const keys = Object.keys(rule);

    const isArrayRule = keys.every(key => allowedKeys.has(key));
    return isArrayRule
}

export async function validatePrimitiveFieldAsync<T, TRoot>(key: Extract<keyof T, string>, object: T, root: TRoot, rule: GenericValidateFunc<T[Extract<keyof T, string>], TRoot>[]): Promise<PrimitiveFieldValidationResult> {
    const value = object[key];
    
    // Create promises for all validation functions to run in parallel
    const validationPromises = rule.map(async (validateFunc) => {
        if (!validateFunc) {
            return null;
        }

        const isFunction = typeof (validateFunc) === "function";
        if (!isFunction) {
            throw Error("validateFunc is not a function")
        }

        const violation = await validateFunc(value, root);
        return violation;
    });

    // Execute all validations in parallel
    const results = await Promise.all(validationPromises);
    
    // Filter out null/undefined results to get actual violations
    const violations: Violations = results.filter(result => result !== null && result !== undefined);
    
    const validationResult: PrimitiveFieldValidationResult = {
        errors: violations,
        isValid: violations.length === 0
    };
    return validationResult
}

// Helper function to validate a single primitive element asynchronously
async function validatePrimitiveElementAsync<T, TRoot>(element: T, root: TRoot, rules: GenericValidateFunc<T, TRoot>[]): Promise<Violations> {
    // Create promises for all validation functions to run in parallel
    const validationPromises = rules.map(async (validateFunc) => {
        if (!validateFunc) {
            return null;
        }

        const isFunction = typeof (validateFunc) === "function";
        if (!isFunction) {
            throw Error("validateFunc is not a function")
        }

        const violation = await validateFunc(element, root);
        return violation;
    });

    // Execute all validations in parallel
    const results = await Promise.all(validationPromises);
    
    // Filter out null/undefined results to get actual violations
    const violations: Violations = results.filter(result => result !== null && result !== undefined);
    
    return violations;
}

async function validateArrayFieldAsync<T, TRoot>(key: Extract<keyof T, string>, object: T, root: TRoot, rule: AsyncValidationRule<T, TRoot>[Extract<keyof T, string>] | AsyncArrayValidationRule<T[Extract<keyof T, string>], TRoot>) {

    const value = object[key];

    // Support dynamic rule builder function
    if (typeof rule === "function") {
        const builtRule = rule(value, root)
        return validateArrayFieldAsync(key, object, root, builtRule) // Recurse into built rule
    }

    var arrayFieldErrors: ErrorOfArray<T> = {};

    const arrayValidationRule = rule as AsyncArrayValidationRule<typeof value, TRoot>;

    if (arrayValidationRule.arrayRules) {
        for (let index = 0; index < arrayValidationRule.arrayRules.length; index++) {
            const primitiveFieldValidationResult = await validatePrimitiveFieldAsync(key, object, root, arrayValidationRule.arrayRules)
            if (!primitiveFieldValidationResult.isValid) {
                arrayFieldErrors.arrayErrors = primitiveFieldValidationResult.errors
            }
        }
    }

    if (arrayValidationRule.arrayElementRule && Array.isArray(value)) {
        // Collect promises for parallel validation of array elements
        const elementValidationPromises = value.map(async (element, index) => {
            if (typeof arrayValidationRule.arrayElementRule === "function") {
                const elementRule = await arrayValidationRule.arrayElementRule(element, root);
                
                // Check if the returned rule is for primitives or objects
                if (Array.isArray(elementRule)) {
                    // Primitive element validation
                    const violations = await validatePrimitiveElementAsync(element, root, elementRule);
                    if (violations.length > 0) {
                        return {
                            index,
                            errors: violations as any,
                            attemptedValue: element
                        };
                    }
                } else {
                    // Object element validation
                    const error = await validateObjectAsync(element, root, elementRule as any);
                    if (error) {
                        return {
                            index,
                            errors: error as any,
                            attemptedValue: element
                        };
                    }
                }
            } else {
                // Static rule
                if (Array.isArray(arrayValidationRule.arrayElementRule)) {
                    // Primitive element validation
                    const violations = await validatePrimitiveElementAsync(element, root, arrayValidationRule.arrayElementRule);
                    if (violations.length > 0) {
                        return {
                            index,
                            errors: violations as any,
                            attemptedValue: element
                        };
                    }
                } else {
                    // Object element validation
                    const error = await validateObjectAsync(element, root, arrayValidationRule.arrayElementRule as any);
                    if (error) {
                        return {
                            index,
                            errors: error as any,
                            attemptedValue: element
                        };
                    }
                }
            }
            return null; // No error
        });

        // Execute all element validations in parallel
        const results = await Promise.all(elementValidationPromises);
        
        // Filter out null results and collect errors
        const elementErrors = results.filter(result => result !== null);
        if (elementErrors.length > 0) {
            arrayFieldErrors.arrayElementErrors = elementErrors;
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

    // Collect all validation promises for parallel execution
    const validationPromises: Array<{
        key: Extract<keyof T, string>;
        promise: Promise<{
            key: Extract<keyof T, string>;
            violations?: Violations | ErrorOfArray<T> | ErrorOf<T[Extract<keyof T, string>]>;
            hasErrors: boolean;
        }>;
    }> = [];

    // First pass: collect all validation promises
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

            let validationPromise: Promise<{
                key: Extract<keyof T, string>;
                violations?: Violations | ErrorOfArray<T> | ErrorOf<T[Extract<keyof T, string>]>;
                hasErrors: boolean;
            }>;

            if (isPrimitiveProperty) {
                validationPromise = validatePrimitiveFieldAsync(key, object, rootObject, rule)
                    .then(validationResult => ({
                        key,
                        violations: validationResult.isValid ? undefined : validationResult.errors,
                        hasErrors: !validationResult.isValid
                    }));
            } else if (isArrayProperty) {
                validationPromise = validateArrayFieldAsync(key, object, rootObject, rule)
                    .then(result => ({
                        key,
                        violations: (result?.arrayErrors || result?.arrayElementErrors) ? result : undefined,
                        hasErrors: !!(result?.arrayErrors || result?.arrayElementErrors)
                    }));
            } else if (isObjectProperty) {
                validationPromise = validateObjectFieldAsync(key, object, rootObject, rule)
                    .then(error => ({
                        key,
                        violations: (error && !error.isValid) ? error.errors : undefined,
                        hasErrors: !!(error && !error.isValid)
                    }));
            } else {
                // Skip invalid property types
                continue;
            }

            validationPromises.push({
                key,
                promise: validationPromise
            });
        }
    }

    // Execute all validations in parallel
    const results = await Promise.all(validationPromises.map(vp => vp.promise));

    // Process results and collect errors
    var errors: ErrorOf<T> = undefined;

    function assignErrorsIfAny(key: any, violations: Violations | ErrorOfArray<T> | ErrorOf<T[Extract<keyof T, string>]>) {
        if (!errors) {
            errors = {};
        }
        errors[key as any] = violations
    }

    for (const result of results) {
        if (result.hasErrors && result.violations) {
            assignErrorsIfAny(result.key, result.violations);
        }
    }

    return errors;
};
