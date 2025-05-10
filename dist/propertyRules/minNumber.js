"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minNumber = void 0;
/**
 * Returns a minimum number validation rule.
 * @param min The minimum value that is allowed.
 * @param errorMessage Custom error message.
 * @returns The validation rule.
 */
const minNumber = (min, errorMessage) => {
    const msg = errorMessage !== null && errorMessage !== void 0 ? errorMessage : `The minimum value for this field is ${min}.`;
    const ruleFunc = (value) => {
        const typeOfValue = typeof value;
        const valueIsNumber = typeOfValue === "bigint" || typeOfValue === "number";
        if (!valueIsNumber) {
            console.warn(`minNumber: value is not a number. The type of value was '${typeOfValue}'`);
            return { isValid: false, errorMessage: msg };
        }
        const isValid = value >= min;
        return {
            isValid: isValid,
            errorMessage: isValid ? "" : msg
        };
    };
    return ruleFunc;
};
exports.minNumber = minNumber;
