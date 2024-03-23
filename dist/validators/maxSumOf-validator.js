"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxSumOf = void 0;
/**
 * Specifies the rule of maximum sum of the spesified property name of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
const maxSumOf = (propNameToBeSummed, maxSum, errorMessage) => {
    let msg = `The maximum sum of ${propNameToBeSummed.toString()} is ${maxSum}.`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validatorFunc = (value, objRef) => {
        if (!value) {
            return false;
        }
        if (!Array.isArray(value)) {
            return false;
        }
        const arr = [...value];
        const total = arr.reduce((accumulator, obj) => {
            const propValue = obj[propNameToBeSummed];
            const typeofValue = typeof (propValue);
            const isNumber = typeofValue === "bigint" || typeofValue === "number";
            if (!propValue || propValue === undefined || propValue === null || !isNumber) {
                return accumulator;
            }
            const parsedNumber = parseFloat(propValue);
            return accumulator + parsedNumber;
        }, 0);
        return maxSum >= total;
    };
    const validator = {
        description: "Specifies the rule of maximum sum of the spesified property name of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.maxSumOf = maxSumOf;
