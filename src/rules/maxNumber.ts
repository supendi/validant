import { PropertyRuleFunc } from "../types";

/**
 * Specifies the rule of maximum value of a number.
 * @param max The maximum allowed value.
 * @param errorMessage Optional custom error message.
 */
export const maxNumber = <TObject>(
    max: number,
    errorMessage?: string
): PropertyRuleFunc<number, TObject> => {
    const msg = errorMessage ?? `The maximum value for this field is ${max}.`;

    const ruleFunc: PropertyRuleFunc<number, TObject> = (value: number) => {
        const valueIsNumber = typeof value === "number" || typeof value === "bigint";

        if (!valueIsNumber) {
            return {
                isValid: false,
                errorMessage: `value is not a number. The value was: ${value} and type of value was '${typeof value}'`,
            };
        }

        const isValid = value <= max

        return {
            isValid: isValid,
            errorMessage: isValid ? "" : msg
        }
    };

    return ruleFunc;
};
