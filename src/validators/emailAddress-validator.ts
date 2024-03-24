import { PropertyValidator } from "../types";
import { regularExpression } from "./regularExpression-validator";

type EmailAddressValidator = <TValue, TObject>(errorMessage?: string) => PropertyValidator<TValue, TObject>

/**
 * Specifies the rule of email address validation.
 * @param errorMessage Custom error messages
 * @returns 
 */
export const emailAddress: EmailAddressValidator = (errorMessage?: string) => {
    if (!errorMessage) {
        errorMessage = `Invalid email address. The valid email example: john.doe@example.com.`
    }

    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regularExpression(regex, errorMessage)
}
