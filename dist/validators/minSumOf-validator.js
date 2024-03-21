"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minSumOf = void 0;
/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns
 */
const minSumOf = (fieldNameToSum, minSum, errorMessage) => {
    let msg = `The minimum sum of ${fieldNameToSum.toString()} is ${minSum}`;
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
        return minSum <= total;
    };
    const validator = {
        description: "Specifies the rule of minimum sum of the spesified field of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.minSumOf = minSumOf;
