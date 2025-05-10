"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringMinLen = void 0;
/**
 * Specifies the minimum length of a string.
 * @param minLen
 * @param errorMessage
 * @returns
 */
function stringMinLen(minLen, errorMessage) {
    if (minLen < 0) {
        throw new Error(`${stringMinLen.name}: The maximum length argument must be a non-negative number.`);
    }
    const message = errorMessage !== null && errorMessage !== void 0 ? errorMessage : `The min length allowed is ${minLen} characters.`;
    const ruleFunc = (value, objRef) => {
        if (typeof value !== "string") {
            console.warn(`${stringMinLen.name}: Expected a string but received ${typeof value}.`);
            return {
                isValid: false,
                errorMessage: `${stringMinLen.name}: Expected a string but received ${typeof value}.`
            };
        }
        const isValid = value.length >= minLen;
        return {
            isValid,
            errorMessage: isValid ? "" : message
        };
    };
    return ruleFunc;
}
exports.stringMinLen = stringMinLen;
