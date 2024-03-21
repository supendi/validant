"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minNumber = void 0;
/**
 * Returns a minimum number validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
const minNumber = (min, errorMessage) => {
    let msg = `The minimum value for this field is ${min}`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validatorFunc = (value, objRef) => {
        if (!value) {
            return false;
        }
        return value >= min;
    };
    const validator = {
        description: "Spesify the minimum value of number rule.",
        validate: validatorFunc,
        returningErrorMessage: msg,
    };
    return validator;
};
exports.minNumber = minNumber;
