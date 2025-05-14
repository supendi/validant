import { PropertyRuleFunc } from "../types";
import { regularExpression } from "./regularExpression";

/**
 * Validates if email is valid format.
 * @param errorMessage Custom error messages or default returned
 * @returns 
 */
export const emailAddress = <TObject extends Object>(errorMessage?: string): PropertyRuleFunc<string, TObject> => {
    if (!errorMessage) {
        errorMessage = `Invalid email address. The valid email example: john.doe@example.com.`
    }

    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regularExpression(emailRegex, errorMessage)
}
