import { PropertyRuleFunc } from "../types";

/**
 * Specifies the maximum length of a string.
 * @param maxLength The maximum number of characters allowed.
 * @param errorMessage Custom error message.
 * @returns A property rule function.
 */
export function stringMaxLen<TObject>(maxLength: number, errorMessage?: string): PropertyRuleFunc<string, TObject> {
    if (maxLength < 0) {
        throw new Error(`${stringMaxLen.name}: The maximum length argument must be a non-negative number.`);
    }

    const message = errorMessage ?? `The maximum length allowed is ${maxLength} characters.`;

    const ruleFunc: PropertyRuleFunc<string, TObject> = (value: string, objRef?: TObject) => {
        if (typeof value !== "string") {
            console.warn(`${stringMaxLen.name}: Expected a string but received ${typeof value}.`);
            return {
                isValid: false,
                errorMessage: message
            };
        }

        const isValid = value.length <= maxLength;

        return {
            isValid,
            errorMessage: isValid ? "" : message
        };
    };

    return ruleFunc;
}
