import { ValidateFunc } from "../types/ValidationRule";

/**
 * Represents a single validation result of property
 */

export interface PropertyValidationResult<T> {
    object: T;
    ruleName: string;
    propertyName: keyof T;
    propertyValue: T[keyof T];
    isValid: boolean;
    errorMessage: string;
}

export function stringifyValue<TValue>(value: TValue): string {
    if (value === undefined) return "undefined"
    if (value === null) return "null"

    if (typeof value === "string") return value
    if (typeof value === "object") return JSON.stringify(value)
    if ((value as any).toString) {
        return value.toString()
    }
    return `failed to stringify value, type of value was: ${typeof value}.`
}

/**
 * Do a single validation against single property
 * @param propName
 * @param object
 * @param validateFunc
 * @returns
 */
export const validateField = <TObject, TRoot>(propName: keyof TObject, object: TObject, root: TRoot, validateFunc: ValidateFunc<TObject[keyof TObject], TRoot>): PropertyValidationResult<TObject> => {
    const value = object[propName];

    const violation = validateFunc(value, root);
    const isValid = !violation;
    let errorMessage = violation ? violation.errorMessage : "";

    let resolvedErrorMessage = errorMessage
    if (resolvedErrorMessage) {
        resolvedErrorMessage = resolvedErrorMessage.replace(":value", stringifyValue(value));
    }

    const validationResult: PropertyValidationResult<TObject> = {
        ruleName: violation ? violation.ruleName : "",
        object: object,
        propertyName: propName,
        propertyValue: value,
        errorMessage: isValid ? "" : resolvedErrorMessage,
        isValid: isValid
    };

    return validationResult;
};
