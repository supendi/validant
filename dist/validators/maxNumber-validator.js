"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxNumber = void 0;
/**
 * Returns a maximum number validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
const maxNumber = (max, errorMessage) => {
    let msg = `The maximum value for this field is ${max}`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validatorFunc = (value, objRef) => {
        if (!value) {
            return false;
        }
        return value <= max;
    };
    const validator = {
        description: "Specifies the rule of maximum value of a number.",
        validate: validatorFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.maxNumber = maxNumber;
