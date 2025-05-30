import { ValidateFunc } from "../types/ValidationRule";

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
export const isDateObject = <TValue, TObject extends Object>(errorMessage?: string): ValidateFunc<TValue | null | undefined, TObject> => {
    return (value) => {
        const violation = {
            ruleName: isDateObject.name,
            attemptedValue: value,
            errorMessage: errorMessage ?? `This field is not a valid date, type of value was: ${typeof value}.`
        }

        const isValid = value instanceof Date && !isNaN(value.getTime());

        if (!isValid) {
            return violation
        }
    };
};
