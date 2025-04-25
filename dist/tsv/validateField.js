"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateField = void 0;
/**
 * Do a single validation against single property
 * @param propName
 * @param object
 * @param propValidator
 * @returns
 */
const validateField = (propName, object, propValidator) => {
    const value = object[propName];
    const isValid = propValidator.validate(value, object);
    var errorMessage = propValidator.returningErrorMessage;
    if (propValidator.returningErrorMessage) {
        errorMessage = propValidator.returningErrorMessage.replace(":value", value);
    }
    const validationResult = {
        object: object,
        propertyName: propName,
        propertyValue: value,
        errorMessage: isValid ? "" : errorMessage,
        isValid: isValid
    };
    return validationResult;
};
exports.validateField = validateField;
