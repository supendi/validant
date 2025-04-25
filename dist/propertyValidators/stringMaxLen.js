"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringMaxLen = stringMaxLen;
const propertyValidator_1 = require("./propertyValidator");
/**
 * Specifies the maximum length of a string.
 * @param maxLength
 * @param errorMessage
 * @returns
 */
function stringMaxLen(maxLength, errorMessage) {
    return (0, propertyValidator_1.propertyValidator)((value, obj) => {
        if (!value) {
            return false;
        }
        if (maxLength < 0) {
            throw new Error(`${stringMaxLen}: The maximum length argument must be a positive number.`);
        }
        if (!value.toString) {
            throw new Error(`${stringMaxLen}: The value is not string. The value was ${value}`);
        }
        const stringLength = value.toString().length;
        return stringLength <= maxLength;
    }, errorMessage ? errorMessage : `The maximum string length is ${maxLength}.`, "Specifies the maximum length of a string.");
}
