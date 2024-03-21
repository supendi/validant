"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equalToFieldValue = void 0;
/**
 * Specifies a rule that a value should equal to the specified field value.
 * @param errorMessage Custom error messages
 * @returns
 */
const equalToFieldValue = (equalToFieldName, errorMessage) => {
    let msg = `The value should be equal to the value of '${equalToFieldName}'.`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validatorFunc = (value, objRef) => {
        return value === objRef[equalToFieldName];
    };
    const validator = {
        description: "Specifies a rule that a value should equal to the specified field value.",
        validate: validatorFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.equalToFieldValue = equalToFieldValue;
