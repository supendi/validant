"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementOf = void 0;
/**
 * Specifies the rule if a value is an element of the specified array.
 * @param list The array of valid elements.
 * @param errorMessage Optional custom error message.
 */
const elementOf = (list, errorMessage) => {
    if (!list) {
        console.warn(`elementOf: the list is ${list}`);
    }
    const msg = errorMessage !== null && errorMessage !== void 0 ? errorMessage : `The value ':value' is not an element of [${list.join(", ")}].`;
    return (value) => {
        if (!list || !list.includes(value)) {
            return {
                isValid: false,
                errorMessage: msg,
            };
        }
        return {
            isValid: true,
            errorMessage: msg,
        };
    };
};
exports.elementOf = elementOf;
