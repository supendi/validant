import { PropertyRuleFunc } from "../types/ValidationRule";

/**
 * Ensure the value is string. 
 * /**
 * | Value        | Result    |
 * | ------------ | --------- |
 * | `"hello"`    | ✅ Valid  |
 * | `""`         | ✅ Valid  |
 * | `"   "`      | ✅ Valid  |
 * | `123`        | ❌ Invalid |
 * | `null`       | ❌ Invalid |
 * | `undefined`  | ❌ Invalid |
 * | `{}`         | ❌ Invalid | 
 * @param errorMessage Custom error message or default returned
 * @returns 
 */
export const isString = <TValue, TObject extends Object>(errorMessage?: string): PropertyRuleFunc<TValue | null | undefined, TObject> => {
    return (value) => {
        const isValid = typeof value === "string";
        const finalErrorMessage = errorMessage ?? `This field is not a valid string, type of value was: ${typeof value}.`;

        if (!isValid) {
            return {
                isValid: false,
                errorMessage: finalErrorMessage,
            };
        }

        return { isValid: true };
    };
};
