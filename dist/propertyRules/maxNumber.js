"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxNumber = void 0;
/**
 * Specifies the rule of maximum value of a number.
 * @param max The maximum allowed value.
 * @param errorMessage Optional custom error message.
 */
const maxNumber = (max, errorMessage) => {
    const msg = errorMessage !== null && errorMessage !== void 0 ? errorMessage : `The maximum value for this field is ${max}.`;
    const ruleFunc = (value) => {
        const valueIsNumber = typeof value === "number" || typeof value === "bigint";
        if (!valueIsNumber) {
            return {
                isValid: false,
                errorMessage: `value is not a number. The value was: ${value} and type of value was '${typeof value}'`,
            };
        }
        const isValid = value <= max;
        return {
            isValid: isValid,
            errorMessage: isValid ? "" : msg
        };
    };
    return ruleFunc;
};
exports.maxNumber = maxNumber;
