"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxSumOf = void 0;
/**
 * Specifies the rule of maximum sum of the specified property name of an array.
 * @param propNameToBeSummed The property name whose sum is checked.
 * @param maxSum The maximum allowed sum.
 * @param errorMessage Optional custom error message.
 */
const maxSumOf = (propNameToBeSummed, maxSum, errorMessage) => {
    const msg = errorMessage !== null && errorMessage !== void 0 ? errorMessage : `The maximum sum of ${propNameToBeSummed.toString()} is ${maxSum}.`;
    const ruleFunc = (value) => {
        if (!value || !Array.isArray(value)) {
            return { isValid: false, errorMessage: msg };
        }
        const total = value.reduce((accumulator, obj) => {
            const propValue = obj[propNameToBeSummed];
            const isNumber = typeof propValue === "number" || typeof propValue === "bigint";
            if (!propValue || !isNumber)
                return accumulator;
            const parsedNumber = parseFloat(String(propValue));
            if (isNaN(parsedNumber)) {
                console.warn(`maxSumOf: value is NaN. The value was '${propValue}'`);
                return accumulator;
            }
            return accumulator + parsedNumber;
        }, 0);
        return total <= maxSum
            ? { isValid: true, errorMessage: msg }
            : { isValid: false, errorMessage: msg };
    };
    return ruleFunc;
};
exports.maxSumOf = maxSumOf;
