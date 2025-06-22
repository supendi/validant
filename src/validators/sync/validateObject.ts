import { ErrorOf, ErrorOfArray } from "../../types/ErrorOf";
import { ArrayValidationRule, RuleViolation } from "../../types/ValidationRule";
import { ValidateFunc } from "../../types/ValidationRule";
import { ValidationRule } from "../../types/ValidationRule";

// Types for better organization
export type PropertyType = "array" | "object" | "primitive" | "undefined"
export type Violations = RuleViolation[]

export type PrimitiveFieldValidationResult = {
    isValid: boolean
    errors: Violations
}

export type ObjectFieldValidationResult<T> = {
    isValid: boolean 
    errors?: ErrorOf<T> | Violations
}

// Utility functions
export function isArrayValidationRule<T, TRoot>(
    rule: ValidationRule<T, TRoot>[Extract<keyof T, string>] | ArrayValidationRule<T[Extract<keyof T, string>], TRoot>
): rule is ArrayValidationRule<T[Extract<keyof T, string>], TRoot> {
    if (typeof rule !== 'object' || Array.isArray(rule) || !rule) {
        return false;
    }
    
    const allowedKeys = new Set(["arrayRules", "arrayElementRule"]);
    const keys = Object.keys(rule);
    return keys.every(key => allowedKeys.has(key));
}

// Validation Functions - cleaner but compatible with original logic
export function validatePrimitiveField<T, TRoot>(
    key: Extract<keyof T, string>, 
    object: T, 
    root: TRoot, 
    rule: ValidateFunc<T[Extract<keyof T, string>], TRoot>[]
): PrimitiveFieldValidationResult {
    const violations: Violations = [];
    
    for (let index = 0; index < rule.length; index++) {
        const validateFunc = rule[index];
        if (!validateFunc) {
            continue;
        }

        const isFunction = typeof (validateFunc) === "function";
        if (!isFunction) {
            throw Error("propertyRuleFunc is not a function")
        }

        const value = object[key];
        const violation = validateFunc(value, root);

        if (violation) {
            violations.push(violation);
        }
    }

    return {
        errors: violations,
        isValid: violations.length === 0
    };
}

// Helper function to validate a single primitive element
function validatePrimitiveElement<T, TRoot>(element: T, root: TRoot, rules: ValidateFunc<T, TRoot>[]): Violations {
    const violations: Violations = [];
    
    for (let index = 0; index < rules.length; index++) {
        const validateFunc = rules[index];
        if (!validateFunc) {
            continue;
        }

        const isFunction = typeof (validateFunc) === "function";
        if (!isFunction) {
            throw Error("validateFunc is not a function")
        }

        const violation = validateFunc(element, root);

        if (violation) {
            violations.push(violation);
        }
    }
    return violations;
}

function validateArrayField<T, TRoot>(
    key: Extract<keyof T, string>, 
    object: T, 
    root: TRoot, 
    rule: ValidationRule<T, TRoot>[Extract<keyof T, string>] | ArrayValidationRule<T[Extract<keyof T, string>], TRoot>
): ErrorOfArray<T> {
    const value = object[key];

    // Support dynamic rule builder function
    if (typeof rule === "function") {
        const arrayRule = rule(value, root)
        return validateArrayField(key, object, root, arrayRule) // Recurse into built rule
    }

    let arrayFieldErrors: ErrorOfArray<T> = {};
    const arrayValidationRule = rule as ArrayValidationRule<typeof value, TRoot>;

    if (arrayValidationRule.arrayRules) {
        const primitiveFieldValidationResult = validatePrimitiveField(key, object, root, arrayValidationRule.arrayRules)
        if (!primitiveFieldValidationResult.isValid) {
            arrayFieldErrors.arrayErrors = primitiveFieldValidationResult.errors
        }
    }

    if (arrayValidationRule.arrayElementRule && Array.isArray(value)) {
        for (let index = 0; index < value.length; index++) {
            const element = value[index];
            
            if (typeof arrayValidationRule.arrayElementRule === "function") {
                const elementRule = arrayValidationRule.arrayElementRule(element, root);
                
                // Check if the returned rule is for primitives or objects
                if (Array.isArray(elementRule)) {
                    // Primitive element validation
                    const violations = validatePrimitiveElement(element, root, elementRule);
                    if (violations.length > 0) {
                        if (!arrayFieldErrors.arrayElementErrors) {
                            arrayFieldErrors.arrayElementErrors = []
                        }
                        arrayFieldErrors.arrayElementErrors.push({
                            index: index,
                            errors: violations as any, // Type assertion for now
                            attemptedValue: element
                        });
                    }
                } else {
                    // Object element validation
                    const error = validateObject(element, root, elementRule);
                    if (error) {
                        if (!arrayFieldErrors.arrayElementErrors) {
                            arrayFieldErrors.arrayElementErrors = []
                        }
                        arrayFieldErrors.arrayElementErrors.push({
                            index: index,
                            errors: error as any,
                            attemptedValue: element
                        });
                    }
                }
            } else {
                // Static rule
                if (Array.isArray(arrayValidationRule.arrayElementRule)) {
                    // Primitive element validation
                    const violations = validatePrimitiveElement(element, root, arrayValidationRule.arrayElementRule);
                    if (violations.length > 0) {
                        if (!arrayFieldErrors.arrayElementErrors) {
                            arrayFieldErrors.arrayElementErrors = []
                        }
                        arrayFieldErrors.arrayElementErrors.push({
                            index: index,
                            errors: violations as any, // Type assertion for now
                            attemptedValue: element
                        });
                    }
                } else {
                    // Object element validation
                    const error = validateObject(element, root, arrayValidationRule.arrayElementRule);
                    if (error) {
                        if (!arrayFieldErrors.arrayElementErrors) {
                            arrayFieldErrors.arrayElementErrors = []
                        }
                        arrayFieldErrors.arrayElementErrors.push({
                            index: index,
                            errors: error as any,
                            attemptedValue: element
                        });
                    }
                }
            }
        }
    }

    return arrayFieldErrors
}

function validateObjectField<T, TRoot>(
    key: Extract<keyof T, string>, 
    object: T, 
    root: TRoot, 
    rule: ValidationRule<T, TRoot>[Extract<keyof T, string>]
): ObjectFieldValidationResult<T[Extract<keyof T, string>]> {
    const violations: Violations = [];
    const value = object[key];

    const childValidationRule = rule as ValidationRule<typeof value, TRoot>;
    const error = validateObject(value, root, childValidationRule);
    
    return {
        errors: error,
        isValid: violations.length === 0 && !error
    };
}

/**
 * Validates and collects errors of each property as array of string
 * @param object - The object to validate
 * @param rootObject - The root object for context  
 * @param validationRule - The validation rules to apply
 * @returns ErrorOf<T> or undefined if no errors
 */
export const validateObject = <T, TRoot>(
    object: T, 
    rootObject: TRoot, 
    validationRule: ValidationRule<T, TRoot>
): ErrorOf<T> => {
    if (!validationRule) {
        throw new Error(`validant: validation rule is null or undefined.`)
    }
    if (!object) {
        object = {} as T
    }
    
    let errors: ErrorOf<T> = undefined;

    function assignErrorsIfAny(key: any, violations: Violations | ErrorOfArray<T> | ErrorOf<T[Extract<keyof T, string>]>) {
        if (!errors) {
            errors = {};
        }
        errors[key as any] = violations
    }

    // Iterate against validation rule instead.
    // Example: the rule is {name:[required()]}, if we passed an empty object {}, then the validation won't work. It will always return empty errors, which is very wrong.
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
            const isFunctionRule = typeof rule === "function"

            if (isPrimitiveProperty) {
                const validationResult = validatePrimitiveField(key, object, rootObject, rule)
                if (!validationResult.isValid) {
                    assignErrorsIfAny(key, validationResult.errors)
                }
                continue
            }
            if (isArrayProperty) {
                const result = validateArrayField(key, object, rootObject, rule)
                if (result?.arrayErrors || result?.arrayElementErrors) {
                    assignErrorsIfAny(key, result)
                }
                continue
            }
            if (isFunctionRule) {
                // Handle function rules - call the function to get the actual validation rules
                const resolvedRule = rule(value, rootObject)
                const result = validateArrayField(key, object, rootObject, resolvedRule)
                if (result?.arrayErrors || result?.arrayElementErrors) {
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
