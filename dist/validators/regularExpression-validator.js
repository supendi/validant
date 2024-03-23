"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regularExpression = void 0;
/**
 * Specifies the rule if a value is match with the specified regular expressin.
 * @param errorMessage Custom error messages
 * @returns
 */
const regularExpression = (regex, errorMessage) => {
    let msg = `The value ':value' doesn't match withe the specified regular expression.`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validatorFunc = (value, objRef) => {
        return regex.test(value);
    };
    const validator = {
        description: "Specifies the rule if a value is match with the specified regular expression.",
        validate: validatorFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.regularExpression = regularExpression;
