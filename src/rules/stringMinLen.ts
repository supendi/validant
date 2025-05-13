import { PropertyRuleFunc } from "../types";

/**
 * Specifies the minimum length of a string.
 * @param minLen 
 * @param errorMessage 
 * @returns 
 */
export function stringMinLen<TObject>(minLen: number, errorMessage?: string): PropertyRuleFunc<string, TObject> {
    if (minLen < 0) {
        throw new Error(`${stringMinLen.name}: The maximum length argument must be a non-negative number.`);
    }

    const message = errorMessage ?? `The min length allowed is ${minLen} characters.`;

    const ruleFunc: PropertyRuleFunc<string, TObject> = (value: string, objRef?: TObject) => {
        if (typeof value !== "string") {
            console.warn(`${stringMinLen.name}: Expected a string but received ${typeof value}.`);
            return {
                isValid: false,
                errorMessage: `${stringMinLen.name}: Expected a string but received ${typeof value}.`
            };
        }
        const isValid = value.length >= minLen;

        return {
            isValid,
            errorMessage: isValid ? "" : message
        };
    };

    return ruleFunc;
}
