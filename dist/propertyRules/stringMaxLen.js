"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringMaxLen = void 0;
/**
 * Specifies the maximum length of a string.
 * @param maxLength The maximum number of characters allowed.
 * @param errorMessage Custom error message.
 * @returns A property rule function.
 */
function stringMaxLen(maxLength, errorMessage) {
    if (maxLength < 0) {
        throw new Error(`${stringMaxLen.name}: The maximum length argument must be a non-negative number.`);
    }
    const message = errorMessage !== null && errorMessage !== void 0 ? errorMessage : `The maximum length allowed is ${maxLength} characters.`;
    const ruleFunc = (value, objRef) => {
        if (typeof value !== "string") {
            console.warn(`${stringMaxLen.name}: Expected a string but received ${typeof value}.`);
            return {
                isValid: false,
                errorMessage: message
            };
        }
        const isValid = value.length <= maxLength;
        return {
            isValid,
            errorMessage: isValid ? "" : message
        };
    };
    return ruleFunc;
}
exports.stringMaxLen = stringMaxLen;
