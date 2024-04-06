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
    const validateFunc = (value, objRef) => {
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
            const typeofValue = typeof (propValue);
            const isNumber = typeofValue === "bigint" || typeofValue === "number";
            if (!isNumber) {
                console.warn(`${exports.minSumOf.name}: value is not a number. The type of value was '${typeofValue}'. The walue was '${value}'`);
                return accumulator;
            }
            const parsedNumber = parseFloat(propValue);
            if (isNaN(parsedNumber)) {
                console.warn(`${exports.minSumOf.name}: value is NaN. The walue was '${value}'`);
                return accumulator;
            }
            return accumulator + parsedNumber;
        }, 0);
        return minSum <= total;
    };
    const validator = {
        description: "Specifies the rule of minimum sum of the specified property name of an array.",
        validate: validateFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.minSumOf = minSumOf;
