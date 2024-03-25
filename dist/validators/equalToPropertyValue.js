"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equalToPropertyValue = void 0;
/**
 * Specifies a rule that a value should equal to the specified property value.
 * @param errorMessage Custom error messages
 * @returns
 */
const equalToPropertyValue = (equalToPropName, errorMessage) => {
    let msg = `The value should be equal to the value of '${equalToPropName.toString()}'.`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validatorFunc = (value, object) => {
        return value === object[equalToPropName];
    };
    const validator = {
        description: "Specifies a rule that a value should equal to the specified property value.",
        validate: validatorFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.equalToPropertyValue = equalToPropertyValue;
