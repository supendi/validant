import { PropertyRuleFunc } from "../types/ValidationRule";

/**
 * Specifies the minimum length of a string.
 * @param minLen 
 * @param errorMessage 
 * @returns 
 */
export function stringMinLen<TObject>(minLen: number, errorMessage?: string): PropertyRuleFunc<string, TObject> {
    if (minLen < 0) {
        throw new Error(`${stringMinLen.name}: The minimum length argument must be a non-negative number.`);
    }

    const message = errorMessage ?? `The min length allowed is ${minLen} characters.`;

    const ruleFunc: PropertyRuleFunc<string, TObject> = (value: string, objRef?: TObject) => {
        const valueIsString = typeof value === "string"
        if (!valueIsString) {
            throw new Error(`${stringMinLen.name}: Expected a string but received ${typeof value}.`)
        }

        const isValid = value.length >= minLen;

        if (!isValid) {
            return {
                isValid,
                errorMessage: message
            };
        }

        return {
            isValid
        };
    };

    return ruleFunc;
}
