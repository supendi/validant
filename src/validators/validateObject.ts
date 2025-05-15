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

function isArrayValidationRule<T, TRoot>(rule: ValidationRule<T, TRoot>[Extract<keyof T, string>] | ArrayValidationRule<T[Extract<keyof T, string>], TRoot>) {
    const allowedKeys = new Set(["arrayRules", "arrayItemRule"]);
    const keys = Object.keys(rule);

    const isArrayRule = keys.every(key => allowedKeys.has(key));
    return isArrayRule
}

function getPropertyTypeBasedOnItsRule<T, TRoot>(rule: ValidationRule<T, TRoot>[Extract<keyof T, string>]): PropertyType {
    if (!rule) {
        return "undefined"
    }

    if (Array.isArray(rule)) {
        return "primitive"
    }

    if (typeof rule === "object") {
        const isArrayRule = isArrayValidationRule(rule)
        return isArrayRule ? "array" : "object";
    }

    if (typeof rule === "function") {
        return "array"
    }

    return "object"
}

function validatePrimitiveField<T, TRoot>(key: Extract<keyof T, string>, object: T, root: TRoot, rule: PrimitiveRule<T, TRoot>): PrimitiveFieldValidationResult {
    var fieldErrors: FieldErrors = [];
    for (let index = 0; index < rule.length; index++) {
        const propertyRuleFunc = rule[index];
        if (!propertyRuleFunc) {
            continue;
        }

        const isFunction = typeof (propertyRuleFunc) === "function";
        if (!isFunction) {
            throw Error("propertyRuleFunc is not a function")
            // continue;
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
        const builtRule = rule(value, root)
        return validateArrayField(key, object, root, builtRule) // Recurse into built rule
    }

    const isArrayRule = isArrayValidationRule(rule)
    if (!isArrayRule) {
        return
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

    // Example case
    // interface Person {
    //     name?: string
    //     children?: Person[]
    // }

    // const person: Person = {
    //     name: "",
    //     children: null <= notice this
    // }

    if (!value) {
        // validateArrayField(key, object, root, rule)
        // I am gonna leave this silently not be validated for now. 
        return {
            isValid: true
        };

        // fieldErrors.push(`Could not validate property '${key}', the value is ${value}`)

        // return {
        //     errors: fieldErrors,
        //     isValid: false
        // };
    }

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
        if (!fieldErrors) {
            return
        }
        if (!errors) {
            errors = {};
        }
        errors[key as any] = fieldErrors
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

            let typeOfProperty: PropertyType = getPropertyTypeBasedOnItsRule(rule)

            switch (typeOfProperty) {
                case "primitive":
                    if (Array.isArray(rule)) {
                        const validationResult = validatePrimitiveField(key, object, rootObject, rule)
                        if (!validationResult.isValid) {
                            assignErrorsIfAny(key, validationResult.errors)
                        }
                    }
                    break;
                case "array":
                    if (!value && isArrayValidationRule(rule)) {
                        const result = validateArrayField(key, object, rootObject, rule)
                        if (result?.errors || result?.errorsEach) {
                            assignErrorsIfAny(key, result)
                        }
                        break;
                    }
                    if (Array.isArray(value)) {
                        const result = validateArrayField(key, object, rootObject, rule)
                        if (result?.errors || result?.errorsEach) {
                            assignErrorsIfAny(key, result)
                        }
                    }
                    break;
                case "object":
                    const error = validateObjectField(key, object, rootObject, rule)
                    if (error && !error.isValid) {
                        assignErrorsIfAny(key, error.errors)
                    }
                    break;
                default:
                    // I dont know what should be the default validator
                    break;
            }
        }
    }
    return errors;
};
