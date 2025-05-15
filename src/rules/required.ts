import { PropertyRuleFunc } from "../types/ValidationRule";

/**
 * Specifies the rule that if a property is required.
| Value       | Result    |
| ----------- | --------- |
| `undefined` | ❌ Invalid |
| `null`      | ❌ Invalid |
| `""`        | ❌ Invalid |
| `"   "`     | ❌ Invalid white space | 
| `0`         | ✅ Valid   |
| `false`     | ✅ Valid   |
| `[]`        | ❌ Invalid |
| `[1]`       | ✅ Valid   |
| `{}`        | ❌ Invalid |
| `{ a: 1 }`  | ✅ Valid   |
 * @param errorMessage Custom error messages or default returned
 * @returns 
 */
export const required = <TValue, TObject extends Object>(errorMessage?: string): PropertyRuleFunc<TValue | null | undefined, TObject> => {
    const finalErrorMessage = errorMessage ?? "This field is required.";

    return (value) => {
        const isNull = value === null;
        const isUndefined = value === undefined;
        const isEmptyString = value === "";
        const isWhiteSpace = typeof value === "string" && value.trim() === "";
        const isEmptyArray = Array.isArray(value) && value.length === 0;
        const isDate = value instanceof Date
        const isInvalidDate = isDate && value.toString() === "Invalid Date"
        const isNotANumber = typeof value === "number" && isNaN(value)

        const isEmptyObject =
            !(isDate) // new Date() should considered as valid
            && typeof value === "object" &&
            value !== null &&
            !Array.isArray(value) &&
            Object.keys(value).length === 0;

        const isInvalid = isNull || isUndefined || isEmptyString || isEmptyArray || isEmptyObject || isInvalidDate || isNotANumber || isWhiteSpace

        const isValid = !isInvalid

        if (!isValid) {
            return {
                isValid: false,
                errorMessage: finalErrorMessage,
            };
        }

        return {
            isValid: true
        };
    };
};