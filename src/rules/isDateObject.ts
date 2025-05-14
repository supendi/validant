import { PropertyRuleFunc } from "../types";

/**
 * Specifies the rule if value is a valid Date object.
 * Date strings and epoch numbers will be treated as invalid.
| Value         | Result    |
| ------------- | --------- |
| `undefined`   | ❌ Invalid |
| `null`        | ❌ Invalid |
| `""`          | ❌ Invalid |
| `"Invalid Date"` | ❌ Invalid |
| `"   "`       | ❌ Invalid |
| `new Date()`  | ✅ Valid   |
| `new Date('bad')` | ❌ Invalid |
 * @param errorMessage Custom error message or default returned
 * @returns 
 */
export const isDateObject = <TValue, TObject extends Object>(errorMessage?: string): PropertyRuleFunc<TValue | null | undefined, TObject> => {
    return (value) => {
        const isValid = value instanceof Date && !isNaN(value.getTime());
        const finalErrorMessage = errorMessage ?? `This field is not a valid date, type of value was: ${typeof value}.`;

        if (!isValid) {
            return {
                isValid: false,
                errorMessage: finalErrorMessage,
            };
        }

        return { isValid: true };
    };
};
