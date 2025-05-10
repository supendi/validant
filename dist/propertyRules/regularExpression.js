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
    const ruleFunc = (value, objRef) => {
        const isValid = regex.test(value);
        return {
            isValid,
            errorMessage: isValid ? "" : msg
        };
    };
    return ruleFunc;
};
exports.regularExpression = regularExpression;
