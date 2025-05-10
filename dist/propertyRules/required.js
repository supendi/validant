"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.required = void 0;
/**
 * Specifies the rule that the property is required.
 * @param errorMessage Custom error messages
 * @returns
 */
const required = (errorMessage) => {
    let msg = "This field is required.";
    if (errorMessage) {
        msg = errorMessage;
    }
    const ruleFunc = (value, objRef) => {
        if (!value) {
            return {
                isValid: false,
                errorMessage: msg
            };
        }
        if (Array.isArray(value)) {
            const isValid = value.length > 0;
            return {
                isValid,
                errorMessage: isValid ? "" : msg
            };
        }
        return {
            isValid: true,
        };
    };
    return ruleFunc;
};
exports.required = required;
