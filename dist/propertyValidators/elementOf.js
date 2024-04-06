"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementOf = void 0;
/**
 * Specifies the rule if a value is an element of the specified array.
 * @param errorMessage Custom error messages
 * @returns
 */
const elementOf = (list, errorMessage) => {
    if (!list) {
        console.warn(`elementOf: the list is ${list}`);
    }
    let msg = `The value ':value' is not the element of [${list.join(", ")}].`;
    if (errorMessage) {
        msg = errorMessage;
    }
    const validateFunc = (value, object) => {
        if (!list) {
            return false;
        }
        var element = list.find(element => element === value);
        return !!element;
    };
    const validator = {
        description: "Specifies the rule if a value is an element of the specified array.",
        validate: validateFunc,
        returningErrorMessage: msg
    };
    return validator;
};
exports.elementOf = elementOf;
