"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regularExpression = void 0;
/**
 * Specifies the rule if a value is match with the specified regular expression.
 * @param regex
 * @param errorMessage
 * @param description
 * @returns
 */
const regularExpression = (regex, errorMessage, description) => {
    let msg = `The value ':value' doesn't match with the specified regular expression.`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validateFunc = (value, objRef) => {
        return regex.test(value);
    };
    const validator = {
        description: description ? description : "Specifies the rule if a value is match with the specified regular expression.",
        validate: validateFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.regularExpression = regularExpression;
