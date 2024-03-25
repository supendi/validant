"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringLengthMinimum = void 0;
const propertyValidator_1 = require("./propertyValidator");
/**
 * Specifies the minimum length of a string.
 * @param minLen
 * @param errorMessage
 * @returns
 */
function stringLengthMinimum(minLen, errorMessage) {
    return (0, propertyValidator_1.propertyValidator)((value, obj) => {
        if (!value) {
            return false;
        }
        if (minLen < 0) {
            throw new Error(`${stringLengthMinimum}: The minimum length argument must be a positive number.`);
        }
        if (!value.toString) {
            throw new Error(`${stringLengthMinimum}: The value is not string. The value was ${value}`);
        }
        return value.toString().length >= minLen;
    }, errorMessage ? errorMessage : `The minimum string is ${minLen}.`, "Specifies the minimum length of a string.");
}
exports.stringLengthMinimum = stringLengthMinimum;
