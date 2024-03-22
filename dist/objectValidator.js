"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObject = exports.getErrorOf = void 0;
/**
 * Do a single validation against single field
 * @param fieldName
 * @param object
 * @param fieldValidator
 * @returns
 */
const validateField = (fieldName, object, fieldValidator) => {
    const value = object[fieldName];
    const isValid = fieldValidator.validate(value, object);
    var errorMessage = fieldValidator.returningErrorMessage;
    if (fieldValidator.returningErrorMessage) {
        errorMessage = fieldValidator.returningErrorMessage.replace(":value", value);
    }
    const validationResult = {
        object: object,
        fieldName: fieldName,
        fieldValue: value,
        errorMessage: errorMessage,
        isValid: isValid
    };
    return validationResult;
};
/**
 * Validates and collects errors of each fields as array of string
 * @param object
 * @param validationRule
 * @returns
 */
const getErrorOf = (object, validationRule) => {
    var errors = undefined;
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = object[key];
            const rule = validationRule[key];
            if (!rule) {
                continue;
            }
            // if rule is array it probably means rule = fieldValidator []
            const isRuleAnArray = Array.isArray(rule);
            if (isRuleAnArray) {
                for (let index = 0; index < rule.length; index++) {
                    const fieldValidator = rule[index];
                    if (!fieldValidator) {
                        continue;
                    }
                    const isFieldValidator = !!fieldValidator.validate && !!fieldValidator.returningErrorMessage;
                    if (!isFieldValidator) {
                        continue;
                    }
                    const fieldValidationResult = validateField(key, object, fieldValidator);
                    const isValid = fieldValidationResult.isValid;
                    if (!isValid) {
                        if (!errors) {
                            errors = {};
                        }
                        if (!errors[key]) {
                            errors[key] = [];
                        }
                        errors[key].push(fieldValidationResult.errorMessage);
                    }
                }
                continue;
            }
            // If property value is an array, means the property data type is array and it has different treatment
            const valueIsArray = Array.isArray(value);
            if (valueIsArray) {
                const childObject = object[key];
                const childValidationRule = rule;
                if (childValidationRule.fieldValidators) {
                    for (let index = 0; index < childValidationRule.fieldValidators.length; index++) {
                        const fieldValidator = childValidationRule.fieldValidators[index];
                        if (!fieldValidator) {
                            continue;
                        }
                        const isFieldValidator = !!fieldValidator.validate && !!fieldValidator.returningErrorMessage;
                        if (!isFieldValidator) {
                            continue;
                        }
                        const fieldValidationResult = validateField(key, object, fieldValidator);
                        const isValid = fieldValidationResult.isValid;
                        if (!isValid) {
                            if (!errors) {
                                errors = {};
                            }
                            if (!errors[key]) {
                                errors[key] = {};
                            }
                            if (!errors[key].fieldErrors) {
                                errors[key].fieldErrors = [];
                            }
                            errors[key].fieldErrors.push(fieldValidationResult.errorMessage);
                        }
                    }
                }
                if (childValidationRule.validationRule) {
                    for (let index = 0; index < value.length; index++) {
                        const element = value[index];
                        const error = (0, exports.getErrorOf)(element, childValidationRule.validationRule);
                        if (error) {
                            if (!errors) {
                                errors = {};
                            }
                            if (!errors[key]) {
                                errors[key] = {};
                            }
                            if (!errors[key].indexedErrors) {
                                errors[key].indexedErrors = [];
                            }
                            errors[key].indexedErrors.push({
                                index: index,
                                errors: error,
                                validatedObject: element
                            });
                        }
                        continue;
                    }
                }
                continue;
            }
            const typeofValue = typeof (value);
            if (typeofValue === "object") {
                const childObject = object[key];
                const childValidationRule = rule;
                const error = (0, exports.getErrorOf)(childObject, childValidationRule);
                if (error) {
                    if (!errors) {
                        errors = {};
                    }
                    if (!errors[key]) {
                        errors[key] = {};
                    }
                    errors[key] = error;
                }
            }
        }
    }
    return errors;
};
exports.getErrorOf = getErrorOf;
/**
 * Validates an object with the specified validation rule
 * @param object
 * @param validationRule
 * @returns ValidationResult
 */
const validateObject = (object, validationRule, validationMessage = { okMessage: "Good to go.", errorMessage: "One or more validation errors occurred." }) => {
    const errors = (0, exports.getErrorOf)(object, validationRule);
    let isValid = true;
    for (const key in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, key)) {
            const error = errors[key];
            if (error) {
                isValid = false;
                break;
            }
        }
    }
    return {
        message: isValid ? validationMessage.okMessage : validationMessage.errorMessage,
        isValid: isValid,
        errors: errors,
    };
};
exports.validateObject = validateObject;
const validator = {
    validate: exports.validateObject
};
exports.default = validator;
