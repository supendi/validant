"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.custom = void 0;
/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns
 */
const custom = (func, errorMessage) => {
    if (!errorMessage) {
        console.error((`You are calling the custom validator. The error message needs to be set. Assigned error message: '${errorMessage}'`));
    }
    const validatorFunc = (value, object) => {
        return func(value, object);
    };
    const propValidator = {
        description: "User defined validator",
        returningErrorMessage: errorMessage,
        validate: validatorFunc
    };
    return propValidator;
};
exports.custom = custom;
