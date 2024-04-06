"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alphabetOnly = void 0;
const regularExpression_1 = require("./regularExpression");
const alphabetOnlyRegex = /^[a-zA-Z ]*$/;
/**
 * Only alphabet validator
 * @param minLen
 * @param errorMessage
 * @returns
 */
function alphabetOnly(errorMessage) {
    return (0, regularExpression_1.regularExpression)(alphabetOnlyRegex, errorMessage ? errorMessage : "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces.");
}
exports.alphabetOnly = alphabetOnly;
