import { PropertyValidator, ValidatorFunc } from "../types";
declare type PropValidator = <TValue, TObject>(func: ValidatorFunc<TValue, TObject>, errorMessage: string) => PropertyValidator<TValue, TObject>;
/**
* The base property validator. Use this as a custom validator.
* @param func
* @param errorMessage
* @returns
*/
export declare const propertyValidator: PropValidator;
export {};
