import { PropertyValidator } from "../types";
declare type EmailAddressValidator = (errorMessage?: string) => PropertyValidator;
/**
 * Specifies the rule of email address validation.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const emailAddress: EmailAddressValidator;
export {};
