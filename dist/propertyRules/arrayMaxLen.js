"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayMaxLen = void 0;
/**
 * Specifies the rule of the maximum number of elements allowed in an array.
 */
const arrayMaxLen = (max, errorMessage) => {
    const msg = errorMessage !== null && errorMessage !== void 0 ? errorMessage : `The maximum length for this field is ${max}.`;
    const ruleFunc = (value, object) => {
        if (!value || !Array.isArray(value)) {
            return {
                isValid: false,
                errorMessage: msg
            };
        }
        if (max < 0) {
            console.warn(`arrayMaxLen: max length should be >= 0`);
            return {
                isValid: false,
                errorMessage: msg
            };
        }
        const isValid = value.length <= max;
        return {
            isValid,
            errorMessage: isValid ? "" : msg
        };
    };
    return ruleFunc;
};
exports.arrayMaxLen = arrayMaxLen;
