import { PropertyRuleFunc } from "../types";

/**
 * Returns a minimum number validation rule.
 * @param min The minimum value that is allowed.
 * @param errorMessage Custom error message.
 * @returns The validation rule.
 */
export const minNumber = <TObject extends Object>(min: number, errorMessage?: string): PropertyRuleFunc<number, TObject> => {
    const finalErrorMessage = errorMessage ?? `The minimum value for this field is ${min}.`;

    return (value: number) => {
        const typeOfValue = typeof value;
        const valueIsNumber = typeOfValue === "bigint" || typeOfValue === "number";

        if (!valueIsNumber) {
            throw new Error(`${minNumber.name}: Value is not a number. The value was: ${value} (type: '${typeof value}')`)
        }

        const isValid = value >= min

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
