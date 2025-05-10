"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateField = void 0;
/**
 * Do a single validation against single property
 * @param propName
 * @param object
 * @param propertyRuleFunc
 * @returns
 */
const validateField = (propName, object, root, propertyRuleFunc) => {
    const value = object[propName];
    const { isValid, errorMessage } = propertyRuleFunc(value, root);
    let resolvedErrorMessage = errorMessage;
    if (resolvedErrorMessage) {
        resolvedErrorMessage = resolvedErrorMessage.replace(":value", value);
    }
    const validationResult = {
        object: object,
        propertyName: propName,
        propertyValue: value,
        errorMessage: isValid ? "" : resolvedErrorMessage,
        isValid: isValid
    };
    return validationResult;
};
exports.validateField = validateField;
