"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equalToPropertyValue = void 0;
/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns
 */
const equalToPropertyValue = (propertyNameToCompare, errorMessage) => {
    let msg = `The value should be equal to the value of '${propertyNameToCompare.toString()}'.`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const ruleFunc = (value, object) => {
        const isValid = value === object[propertyNameToCompare];
        return {
            isValid,
            errorMessage: isValid ? "" : msg
        };
    };
    return ruleFunc;
};
exports.equalToPropertyValue = equalToPropertyValue;
