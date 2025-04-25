"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minNumber = void 0;
/**
 * Returns a minimum number validation rule
 * @param errorMessage Custom error messages
 * @returns
 */
const minNumber = (min, errorMessage) => {
    let msg = `The minimum value for this field is ${min}.`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validateFunc = (value, objRef) => {
        if (!value) {
            return false;
        }
        const typeOfValue = typeof (value);
        const valueIsNumber = typeOfValue === "bigint" || typeOfValue === "number";
        if (!valueIsNumber) {
            console.warn(`${exports.minNumber.name}: value is not a number. The type of value was '${typeOfValue}'`);
            return false;
        }
        return value >= min;
    };
    const validator = {
        description: "Spesify the minimum value of number rule.",
        validate: validateFunc,
        returningErrorMessage: msg,
    };
    return validator;
};
exports.minNumber = minNumber;
