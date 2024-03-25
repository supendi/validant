"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayMaxLength = void 0;
/**
 * Specifies the rule of the maximum number of element to exist in an array.
 * @param errorMessage Custom error messages
 * @returns
 */
const arrayMaxLength = (max, errorMessage) => {
    let msg = `The maximum length for this field is ${max}.`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validatorFunc = (value, objRef) => {
        if (!value) {
            return false;
        }
        if (max < 0) {
            console.warn("arrayMaxLength: max length should be >= 0");
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
        validate: validatorFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.arrayMaxLength = arrayMaxLength;
