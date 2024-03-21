"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.required = void 0;
/**
 * The validator of required field
 * @param errorMessage Custom error messages
 * @returns
 */
const required = (errorMessage) => {
    let msg = "This field is required.";
    if (errorMessage) {
        msg = errorMessage;
    }
    const validatorFunc = (value, objRef) => {
        if (!value) {
            return false;
        }
        return true;
    };
    const fieldValidator = {
        description: "Validates if a field value is required",
        returningErrorMessage: msg,
        validate: validatorFunc
    };
    return fieldValidator;
};
exports.required = required;
