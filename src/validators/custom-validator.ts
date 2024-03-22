import { PropertyValidator, ValidatorFunc } from "../types";

type CustomValidator = (func: ValidatorFunc, errorMessage: string) => PropertyValidator

/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns 
 */
export const custom: CustomValidator = (func: ValidatorFunc, errorMessage: string) => {
    const validatorFunc: ValidatorFunc = (value: any, objRef?: any): boolean => {
        return func(value, objRef)
    }

    const propValidator: PropertyValidator = {
        description: "User defined validator",
        returningErrorMessage: errorMessage,
        validate: validatorFunc
    }
    return propValidator
}
