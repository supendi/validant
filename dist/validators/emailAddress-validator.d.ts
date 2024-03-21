import { FieldValidator } from "../types";
declare type EmailAddressValidator = (errorMessage?: string) => FieldValidator;
/**
 * Specifies the rule of email address validation.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const emailAddress: EmailAddressValidator;
export {};
