"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyValidator = void 0;
/**
* The base property validator. Use this as a custom validator.
* @param func
* @param errorMessage
* @returns
*/
const propertyValidator = (func, errorMessage, validatorDescription) => {
    if (!errorMessage) {
        throw new Error(`You are calling the ${exports.propertyValidator.name}. The error message needs to be set. The assigned error message is '${errorMessage}'`);
    }
    const validatorFunc = (value, object) => {
        return func(value, object);
    };
    const propValidator = {
        description: validatorDescription ? validatorDescription : "The base property validator. Use this as a custom validator.",
        returningErrorMessage: errorMessage,
        validate: validatorFunc
    };
    return propValidator;
};
exports.propertyValidator = propertyValidator;
