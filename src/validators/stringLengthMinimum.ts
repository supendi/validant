import { propertyValidator } from "./propertyValidator"

/**
 * Specifies the minimum length of a string.
 * @param minLen 
 * @param errorMessage 
 * @returns 
 */
export function stringLengthMinimum(minLen: number, errorMessage?: string) {
    return propertyValidator<string | number, unknown>((value, obj) => {
        if (!value) {
            return false
        }

        if (minLen < 0) {
            throw new Error(`${stringLengthMinimum}: The minimum length argument must be a positive number.`)
        }

        if (!value.toString) {
            throw new Error(`${stringLengthMinimum}: The value is not string. The value was ${value}`)
        }

        return value.toString().length >= minLen
    }, errorMessage ? errorMessage : `The minimum string is ${minLen}.`, "Specifies the minimum length of a string.")
}
