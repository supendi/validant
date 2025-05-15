import { PropertyRuleFunc } from "../types/ValidationRule";

/**
 * Specifies the rule of maximum value of a number.
 * @param max The maximum allowed value.
 * @param errorMessage Optional custom error message.
 */
export const maxNumber = <TObject extends Object>(max: number, errorMessage?: string): PropertyRuleFunc<number, TObject> => {
    const finalErrorMessage = errorMessage ?? `The maximum value for this field is ${max}.`;

    return (value) => {
        const valueIsNumber = typeof value === "number" || typeof value === "bigint";

        if (!valueIsNumber) {
            throw new Error(`${maxNumber.name}: Value is not a number. The value was: ${value} (type: '${typeof value}')`)
        }

        const isValid = value <= max

        if (!isValid) {
            return {
                isValid: isValid,
                errorMessage: finalErrorMessage
            }
        }

        return {
            isValid: true
        }
    };
};
