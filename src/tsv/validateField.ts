import { PropertyValidator, PropertyValidationResult } from "../types";

/**
 * Do a single validation against single property
 * @param propName
 * @param object
 * @param propValidator
 * @returns
 */

export const validateField = <TValue, TObject>(propName: keyof TObject, object: TObject, propValidator: PropertyValidator<TValue, TObject>): PropertyValidationResult<TObject> => {
    const value = object[propName];
    const isValid = propValidator.validate(value as unknown as TValue, object);

    var errorMessage = propValidator.returningErrorMessage;
    if (propValidator.returningErrorMessage) {
        errorMessage = propValidator.returningErrorMessage.replace(":value", value as any);
    }

    const validationResult: PropertyValidationResult<TObject> = {
        object: object,
        propertyName: propName,
        propertyValue: value,
        errorMessage: isValid ? "" : errorMessage,
        isValid: isValid
    };

    return validationResult;
};
