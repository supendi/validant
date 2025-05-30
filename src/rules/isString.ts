import { ValidateFunc } from "../types/ValidationRule";

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
export const isString = <TValue, TObject extends Object>(errorMessage?: string): ValidateFunc<TValue | null | undefined, TObject> => {
    return (value) => {
        const violation = {
            ruleName: isString.name,
            attemptedValue: value,
            errorMessage: errorMessage ?? `This field is not a valid string, type of value was: ${typeof value}.`
        }

        const isValid = typeof value === "string";

        if (!isValid) {
            return violation;
        }
    };
};
