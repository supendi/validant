"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.custom = void 0;
/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns
 */
const custom = (func, errorMessage) => {
    const validatorFunc = (value, objRef) => {
        return func(value, objRef);
    };
    const propValidator = {
        description: "User defined validator",
        returningErrorMessage: errorMessage,
        validate: validatorFunc
    };
    return propValidator;
};
exports.custom = custom;
