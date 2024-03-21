"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxSumOf = void 0;
/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns
 */
const maxSumOf = (fieldNameToSum, maxSum, errorMessage) => {
    let msg = `The maximum sum of ${fieldNameToSum.toString()} is ${maxSum}.`;
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
            const fieldValue = obj[fieldNameToSum];
            if (!fieldValue) {
                return accumulator;
            }
            const parsedNumber = parseFloat(fieldValue);
            return accumulator + parsedNumber;
        }, 0);
        return maxSum >= total;
    };
    const validator = {
        description: "Specifies the rule of maximum sum of the spesified field of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.maxSumOf = maxSumOf;
