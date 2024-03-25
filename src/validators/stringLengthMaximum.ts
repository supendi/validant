import { propertyValidator } from "./propertyValidator"

/**
 * Specifies the maximum length of a string.
 * @param maxLength 
 * @param errorMessage 
 * @returns 
 */
export function stringLengthMaximum(maxLength: number, errorMessage?: string) {
    return propertyValidator<string | number, unknown>((value, obj) => {
        if (!value) {
            return false
        }

        if (maxLength < 0) {
            throw new Error(`${stringLengthMaximum}: The maximum length argument must be a positive number.`)
        }

        if (!value.toString) {
            throw new Error(`${stringLengthMaximum}: The value is not string. The value was ${value}`)
        }
        const stringLength = value.toString().length
        return stringLength <= maxLength
    }, errorMessage ? errorMessage : `The maximum string length is ${maxLength}.`, "Specifies the maximum length of a string.")
}
