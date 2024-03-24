import { PropertyValidator } from "../types";
declare type EmailAddressValidator = <TValue, TObject>(errorMessage?: string) => PropertyValidator<TValue, TObject>;
/**
 * Specifies the rule of email address validation.
 * @param errorMessage Custom error messages
 * @returns
 */
export declare const emailAddress: EmailAddressValidator;
export {};
