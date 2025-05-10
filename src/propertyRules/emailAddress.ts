import { regularExpression } from "./regularExpression";

/**
 * Specifies the rule of email address validation.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const emailAddress = (errorMessage?: string) => {
    if (!errorMessage) {
        errorMessage = `Invalid email address. The valid email example: john.doe@example.com.`
    }

    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regularExpression(emailRegex, errorMessage, "Specifies the rule of email address validation.")
}
