import { PropertyRuleFunc } from "../types";

/**
 * Represents a single validation result of property
 */

export interface PropertyValidationResult<T> {
    object: T;
    propertyName: keyof T;
    propertyValue: T[keyof T];
    isValid: boolean;
    errorMessage: string;
}

/**
 * Do a single validation against single property
 * @param propName
 * @param object
 * @param propertyRuleFunc
 * @returns
 */

export const validateField = <TValue, TObject, TRoot>(propName: keyof TObject, object: TObject, root: TRoot, propertyRuleFunc: PropertyRuleFunc<TValue, TRoot>): PropertyValidationResult<TObject> => {
    const value = object[propName];

    const {
        isValid,
        errorMessage
    } = propertyRuleFunc(value as unknown as TValue, root);

    let resolvedErrorMessage = errorMessage
    if (resolvedErrorMessage) {
        resolvedErrorMessage = resolvedErrorMessage.replace(":value", value as any);
    }

    const validationResult: PropertyValidationResult<TObject> = {
        object: object,
        propertyName: propName,
        propertyValue: value,
        errorMessage: isValid ? "" : resolvedErrorMessage,
        isValid: isValid
    };

    return validationResult;
};
