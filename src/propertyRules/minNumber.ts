import { PropertyRuleFunc } from "../types";

/**
 * Returns a minimum number validation rule.
 * @param min The minimum value that is allowed.
 * @param errorMessage Custom error message.
 * @returns The validation rule.
 */
export const minNumber = <TObject>(
    min: number,
    errorMessage?: string
): PropertyRuleFunc<number, TObject> => {
    const msg = errorMessage ?? `The minimum value for this field is ${min}.`;

    const ruleFunc: PropertyRuleFunc<number, TObject> = (value: number) => {
        const typeOfValue = typeof value;
        const valueIsNumber = typeOfValue === "bigint" || typeOfValue === "number";

        if (!valueIsNumber) {
            console.warn(`minNumber: value is not a number. The type of value was '${typeOfValue}'`);
            return { isValid: false, errorMessage: msg };
        }
        const isValid = value >= min

        return {
            isValid: isValid,
            errorMessage: isValid ? "" : msg
        }
    };

    return ruleFunc;
};
