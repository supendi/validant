"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringLengthMaximum = void 0;
const propertyValidator_1 = require("./propertyValidator");
/**
 * Specifies the maximum length of a string.
 * @param maxLength
 * @param errorMessage
 * @returns
 */
function stringLengthMaximum(maxLength, errorMessage) {
    return (0, propertyValidator_1.propertyValidator)((value, obj) => {
        if (!value) {
            return false;
        }
        if (maxLength < 0) {
            throw new Error(`${stringLengthMaximum}: The maximum length argument must be a positive number.`);
        }
        if (!value.toString) {
            throw new Error(`${stringLengthMaximum}: The value is not string. The value was ${value}`);
        }
        const stringLength = value.toString().length;
        return stringLength <= maxLength;
    }, errorMessage ? errorMessage : `The maximum string length is ${maxLength}.`, "Specifies the maximum length of a string.");
}
exports.stringLengthMaximum = stringLengthMaximum;
