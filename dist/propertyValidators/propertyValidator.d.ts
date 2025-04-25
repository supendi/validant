import { PropertyValidator, ValidateFunc } from "../types";
/**
* The base property validator. Use this as a custom validator.
* @param func
* @param errorMessage
* @returns
*/
export declare const propertyValidator: <TValue, TObject>(func: ValidateFunc<TValue, TObject>, errorMessage: string, validatorDescription?: string) => PropertyValidator<TValue, TObject>;
