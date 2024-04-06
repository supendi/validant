"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayMaxLen = void 0;
/**
 * Specifies the rule of the maximum number of element to exist in an array.
 * @param errorMessage Custom error messages
 * @returns
 */
const arrayMaxLen = (max, errorMessage) => {
    let msg = `The maximum length for this field is ${max}.`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validateFunc = (value, objRef) => {
        if (!value) {
            return false;
        }
        if (max < 0) {
            console.warn(`arrayMaxLen: max length should be >= 0`);
            return false;
        }
        const valueIsArray = Array.isArray(value);
        if (!valueIsArray) {
            return false;
        }
        let actualLength = value.length;
        return actualLength <= max;
    };
    const validator = {
        description: "Specifies the rule of the maximum number of element to exist in an array.",
        validate: validateFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.arrayMaxLen = arrayMaxLen;
