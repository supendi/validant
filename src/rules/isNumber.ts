import { ValidateFunc } from "../types/ValidationRule";

/**
 * Specifies the rule that checks if the value is a valid number. 
| Value       | Result    |
| ----------- | --------- |
| `undefined` | ❌ Invalid |
| `null`      | ❌ Invalid |
| `""`        | ❌ Invalid |
| `"   "`     | ❌ Invalid white space | 
| `0`         | ✅ Valid   |
| `NaN`       | ❌ Invalid |
| `false`     | ❌ Invalid |
| `[]`        | ❌ Invalid |
| `[1]`       | ❌ Invalid |
| `{}`        | ❌ Invalid |
| `{ a: 1 }`  | ❌ Invalid |
 * @param errorMessage Custom error message or default returned
 * @returns 
 */
export const isNumber = <TValue, TObject extends Object>(errorMessage?: string): ValidateFunc<TValue | null | undefined, TObject> => {
    return (value) => {

        const violation = {
            ruleName: isNumber.name,
            attemptedValue: value,
            errorMessage: errorMessage ?? `This field is not a valid number, type of value was: ${typeof value}.`
        }

        const isValid = typeof value === "number" && !isNaN(value);

        if (!isValid) {
            return violation;
        }
    };
};
