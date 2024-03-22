import { PropertyValidator, ValidatorFunc } from "../types";

type CustomValidator = <T>(func: Function, errorMessage: string) => PropertyValidator<T>

/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns 
 */
export const custom: CustomValidator = <T>(func: ValidatorFunc<T>, errorMessage: string) => {
    if (!errorMessage) {
        console.error((`You are calling the custom validator. The error message needs to be set. Assigned error message: '${errorMessage}'`))
    }

    const validatorFunc: ValidatorFunc<T> = (value, object): boolean => {
        return func(value, object)
    }

    const propValidator: PropertyValidator<T> = {
        description: "User defined validator",
        returningErrorMessage: errorMessage,
        validate: validatorFunc
    }
    return propValidator
}
