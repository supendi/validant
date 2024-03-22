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
    const validatorFunc = (value, objRef) => {
        if (!value) {
            return false;
        }
        const typeOfValue = typeof (value);
        const valueIsNumber = typeOfValue === "bigint" || typeOfValue === "number";
        if (valueIsNumber) {
            return value <= max;
        }
    };
    const validator = {
        description: "Specifies the rule of maximum value of a number.",
        validate: validatorFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.maxNumber = maxNumber;
