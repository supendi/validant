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
            if (!propValue) {
                return accumulator;
            }
            if (!isNumber) {
                console.warn(`${exports.maxSumOf.name}: value is not a number. The type of value was '${typeofValue}'. The walue was '${value}'`);
                return accumulator;
            }
            const parsedNumber = parseFloat(propValue);
            if (isNaN(parsedNumber)) {
                console.warn(`${exports.maxSumOf.name}: value is NaN. The walue was '${value}'`);
                return accumulator;
            }
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
