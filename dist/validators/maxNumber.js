"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxNumber = void 0;
/**
 * Specifies the rule of maximum value of a number.
 * @param errorMessage Custom error messages
 * @returns
 */
const maxNumber = (max, errorMessage) => {
    let msg = `The maximum value for this field is ${max}.`;
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
            console.warn(`${exports.maxNumber.name}: value is not a number. The type of value was '${typeOfValue}'`);
            return false;
        }
        return value <= max;
    };
    const validator = {
        description: "Specifies the rule of maximum value of a number.",
        validate: validateFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.maxNumber = maxNumber;
