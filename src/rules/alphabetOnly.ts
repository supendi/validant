import { regularExpression } from "./regularExpression";

const alphabetOnlyRegex = /^[a-zA-Z ]*$/;

/**
 * Alphabet only rule
 * @param errorMessage custom error message or default returned
 * @returns 
 */
export function alphabetOnly<T extends Object>(errorMessage?: string) {
    return regularExpression<T>(alphabetOnlyRegex, alphabetOnly.name, errorMessage ? errorMessage : "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces.")
}
