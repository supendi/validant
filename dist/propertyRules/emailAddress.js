"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailAddress = void 0;
const regularExpression_1 = require("./regularExpression");
/**
 * Specifies the rule of email address validation.
 * @param errorMessage Custom error messages
 * @returns
 */
const emailAddress = (errorMessage) => {
    if (!errorMessage) {
        errorMessage = `Invalid email address. The valid email example: john.doe@example.com.`;
    }
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return (0, regularExpression_1.regularExpression)(emailRegex, errorMessage, "Specifies the rule of email address validation.");
};
exports.emailAddress = emailAddress;
