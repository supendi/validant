import { regularExpression } from "./regularExpression";

const alphabetOnlyRegex = /^[a-zA-Z ]*$/;

/**
 * Only alphabet validator
 * @param minLen 
 * @param errorMessage 
 * @returns 
 */
export function alphabetOnly(errorMessage?: string) {
    return regularExpression(alphabetOnlyRegex, errorMessage ? errorMessage : "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces.")
}
