"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minSumOf = void 0;
/**
 * Specifies the rule of minimum sum of the specified property name of an array.
 * @param errorMessage Custom error messages
 * @returns
 */
const minSumOf = (propNameToBeSummed, minSum, errorMessage) => {
    let msg = `The minimum sum of ${propNameToBeSummed.toString()} is ${minSum}.`;
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
            if (!propValue) {
                return accumulator;
            }
            const parsedNumber = parseFloat(propValue);
            return accumulator + parsedNumber;
        }, 0);
        return minSum <= total;
    };
    const validator = {
        description: "Specifies the rule of minimum sum of the specified property name of an array.",
        validate: validatorFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.minSumOf = minSumOf;
