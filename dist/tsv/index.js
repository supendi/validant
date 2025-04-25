"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObject = void 0;
const validateStruct_1 = require("./validateStruct");
/**
 * Validates an object with the specified validation rule
 * @param object
 * @param validationRule
 * @returns ValidationResult
 */
const validateObject = (object, validationRule, validationMessage = { okMessage: "Good to go.", errorMessage: "One or more validation errors occurred." }) => {
    const errors = (0, validateStruct_1.validateStruct)(object, validationRule);
    let isValid = true;
    for (const key in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, key)) {
            const error = errors[key];
            if (error) {
                isValid = false;
                break;
            }
        }
    }
    return {
        message: isValid ? validationMessage.okMessage : validationMessage.errorMessage,
        isValid: isValid,
        errors: errors,
    };
};
exports.validateObject = validateObject;
const tsv = {
    validate: exports.validateObject
};
exports.default = tsv;
