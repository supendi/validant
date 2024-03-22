"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.required = void 0;
/**
 * The validator of required property
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
    const propValidator = {
        description: "Validates if a property value is required",
        returningErrorMessage: msg,
        validate: validatorFunc
    };
    return propValidator;
};
exports.required = required;
