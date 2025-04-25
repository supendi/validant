import { ValidationRule, ErrorOf, ArrayValidationRule, PropertyValidator, ErrorOfArray } from "../types";
import { validateField } from "./validateField";

type PropertyType = "array" | "object" | "primitive" | "undefined"

type PrimitiveRule<T> = PropertyValidator<T[Extract<keyof T, string>], T>[]

type FieldErrors = string[]

type PrimitiveFieldValidationResult = {
    isValid: boolean
    errors: FieldErrors
}

type ObjectFieldValidationResult<T> = {
    isValid: boolean
    errors?: ErrorOf<T> | FieldErrors
}

function isArrayValidationRule<T>(rule: ValidationRule<T>[Extract<keyof T, string>]) {
    const allowedKeys = new Set(["validators", "validationRule"]);
    const keys = Object.keys(rule);

    const isArrayRule = keys.every(key => allowedKeys.has(key));
    return isArrayRule
}

function ruleHasPrimitiveValidators<T>(rule: ValidationRule<T>[Extract<keyof T, string>]) { 
    const keys = Object.keys(rule);

    const isArrayRule = keys.includes("validators");
    return isArrayRule
}

function getPropertyTypeBasedOnItsRule<T>(rule: ValidationRule<T>[Extract<keyof T, string>]): PropertyType {
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

    return "object"
}

function validatePrimitiveField<T>(key: Extract<keyof T, string>, object: T, rule: PrimitiveRule<T>): PrimitiveFieldValidationResult {
    var fieldErrors: FieldErrors = [];
    for (let index = 0; index < rule.length; index++) {
        const propValidator = rule[index];
        if (!propValidator) {
            continue;
        }

        const hasValidateFunction = !!propValidator.validate;
        if (!hasValidateFunction) {
            continue;
        }

        const propValidationResult = validateField(key, object, propValidator);

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

function validateArrayField<T>(key: Extract<keyof T, string>, object: T, rule: ValidationRule<T>[Extract<keyof T, string>]) {
    const isArrayRule = isArrayValidationRule(rule)
    if (!isArrayRule) {
        return
    }
    var arrayFieldErrors: ErrorOfArray<T> = {};

    const value = object[key];
    const arrayValidationRule = rule as ArrayValidationRule<T, typeof value>;

    if (arrayValidationRule.validators) {
        for (let index = 0; index < arrayValidationRule.validators.length; index++) {
            const primitiveFieldValidationResult = validatePrimitiveField(key, object, arrayValidationRule.validators)
            if (!primitiveFieldValidationResult.isValid) {
                arrayFieldErrors.errors = primitiveFieldValidationResult.errors
            }
        }
    }

    if (arrayValidationRule.validationRule && Array.isArray(value)) {
        for (let index = 0; index < value.length; index++) {
            const element = value[index];
            const error = validateStruct(element, arrayValidationRule.validationRule);
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


function validateObjectField<T>(key: Extract<keyof T, string>, object: T, rule: ValidationRule<T>[Extract<keyof T, string>]): ObjectFieldValidationResult<T[Extract<keyof T, string>]> {
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

    const childValidationRule = rule as ValidationRule<typeof value>;
    const error = validateStruct(value, childValidationRule);
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
export const validateStruct = <T>(object: T, validationRule: ValidationRule<T>): ErrorOf<T> => {
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
                        const validationResult = validatePrimitiveField(key, object, rule)
                        if (!validationResult.isValid) {
                            assignErrorsIfAny(key, validationResult.errors)
                        }
                    }
                    break;
                case "array":
                    if (!value) {
                        const error = validateObjectField(key, object, rule)
                        if (error && !error.isValid) {
                            assignErrorsIfAny(key, error.errors)
                        }
                        break;
                    }
                    if (Array.isArray(value)) {
                        const result = validateArrayField(key, object, rule)
                        if (result.errors || result.errorsEach) {
                            assignErrorsIfAny(key, result)
                        }
                    }
                    break;
                case "object":
                    const error = validateObjectField(key, object, rule)
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
