import { PropertyValidator, ValidatorFunc } from "../types";

type CustomValidator = <TValue, TObject>(func: ValidatorFunc<TValue, TObject>, errorMessage: string) => PropertyValidator<TValue, TObject>

/**
 * The validator of required property
 * @param errorMessage Custom error messages
 * @returns 
 */
export const custom: CustomValidator = <TValue, TObject>(func: ValidatorFunc<TValue, TObject>, errorMessage: string) => {
    if (!errorMessage) {
        console.error((`You are calling the custom validator. The error message needs to be set. Assigned error message: '${errorMessage}'`))
    }

    const validatorFunc: ValidatorFunc<TValue, TObject> = (value, object): boolean => {
        return func(value, object)
    }

    const propValidator: PropertyValidator<TValue, TObject> = {
        description: "User defined validator",
        returningErrorMessage: errorMessage,
        validate: validatorFunc
    }
    return propValidator
}
