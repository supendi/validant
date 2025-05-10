"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayMinLen = void 0;
/**
 * Specifies the minimum length of an array.
 * @param min The minimum number of elements required.
 * @param errorMessage Optional custom error message.
 */
const arrayMinLen = (min, errorMessage) => {
    const msg = errorMessage !== null && errorMessage !== void 0 ? errorMessage : `The minimum length for this field is ${min}.`;
    return (value) => {
        if (!value || !Array.isArray(value)) {
            return {
                isValid: false,
                errorMessage: msg,
            };
        }
        if (min < 1) {
            console.warn("arrayMinLen: min length should be > 0");
            return {
                isValid: false,
                errorMessage: msg,
            };
        }
        return {
            isValid: value.length >= min,
            errorMessage: msg,
        };
    };
};
exports.arrayMinLen = arrayMinLen;
