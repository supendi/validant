import { PropertyValidator, ValidatorFunc } from "../types";

type CustomValidator = <T>(func: ValidatorFunc, errorMessage: string) => PropertyValidator

/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns 
 */
export const custom: CustomValidator = <T>(func: ValidatorFunc, errorMessage: string) => {
    const validatorFunc: ValidatorFunc = <T>(value: any, objRef?: T): boolean => {
        return func(value, objRef)
    }

    const propValidator: PropertyValidator = {
        description: "User defined validator",
        returningErrorMessage: errorMessage,
        validate: validatorFunc
    }
    return propValidator
}
