"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minSumOf = void 0;
/**
 * Specifies the rule of minimum sum of the specified property name of an array.
 * @param propNameToBeSummed The property name whose values will be summed.
 * @param minSum The minimum sum that should be allowed.
 * @param errorMessage Custom error message.
 * @returns The validation rule.
 */
const minSumOf = (propNameToBeSummed, minSum, errorMessage) => {
    const msg = errorMessage !== null && errorMessage !== void 0 ? errorMessage : `The minimum sum of ${propNameToBeSummed.toString()} is ${minSum}.`;
    const ruleFunc = (value) => {
        if (!Array.isArray(value)) {
            console.warn("minSumOf: value is not an array.");
            return { isValid: false, errorMessage: msg };
        }
        const total = value.reduce((accumulator, obj) => {
            const propValue = obj[propNameToBeSummed];
            const typeofValue = typeof propValue;
            const isNumber = typeofValue === "bigint" || typeofValue === "number";
            if (!isNumber || propValue == null || isNaN(Number(propValue))) {
                console.warn(`minSumOf: Invalid value '${propValue}'. Must be a number.`);
                return accumulator;
            }
            return accumulator + Number(propValue);
        }, 0);
        return total >= minSum
            ? { isValid: true, errorMessage: msg }
            : { isValid: false, errorMessage: msg };
    };
    return ruleFunc;
};
exports.minSumOf = minSumOf;
