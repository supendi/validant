"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.required = void 0;
/**
 * Specifies the rule that the property is required.
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
        description: "Specifies the rule that the property is required.",
        returningErrorMessage: msg,
        validate: validatorFunc
    };
    return propValidator;
};
exports.required = required;
