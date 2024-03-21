import { FieldValidator } from "../types";
import { regularExpression } from "./regularExpression-validator";

type EmailAddressValidator = (errorMessage?: string) => FieldValidator

/**
 * Specifies the rule of email address validation.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const emailAddress: EmailAddressValidator = (errorMessage?: string) => {
    if (!errorMessage) {
        errorMessage = `Invalid email address. The valid email example: john.doe@example.com.`
    }

    var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    return regularExpression(regex, errorMessage)
}
