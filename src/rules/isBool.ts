import { PropertyRuleFunc } from "../types";

/**
 * Ensure the value is a boolean.
 * @param errorMessage Custom error message or default returned
 * @returns 
 */
export const isBool = <TValue, TObject extends Object>(errorMessage?: string): PropertyRuleFunc<TValue | null | undefined, TObject> => {
    return (value) => {
        const isValid = typeof value === "boolean";
        const finalErrorMessage = errorMessage ?? `This field is not a valid boolean, type of value was: ${typeof value}.`;

        if (!isValid) {
            return {
                isValid: false,
                errorMessage: finalErrorMessage,
            };
        }

        return { isValid: true };
    };
};