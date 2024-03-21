"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minLength = void 0;
/**
 * Returns a minimum length validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
const minLength = (min, errorMessage) => {
    let msg = `The minimum length for this field is ${min}`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validateFunc = (value, objRef) => {
        if (!value) {
            return false;
        }
        if (min < 1) {
            console.error("Validator: min length should be > 0");
            return false;
        }
        let actualLength = value.length;
        return actualLength >= min;
    };
    const fieldValidator = {
        description: "Specify the minimum length of an array",
        returningErrorMessage: msg,
        validate: validateFunc
    };
    return fieldValidator;
};
exports.minLength = minLength;
