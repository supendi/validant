import { GenericValidateFunc } from "../types/AsyncValidationRule";
import { PropertyValidationResult, stringifyValue } from "./validateField";

/**
 * Do a single validation against single property
 * @param propName
 * @param object
 * @param validateFunc
 * @returns
 */
export const validateFieldAsync = async <TObject, TRoot>(propName: keyof TObject, object: TObject, root: TRoot, validateFunc: GenericValidateFunc<TObject[keyof TObject], TRoot>): Promise<PropertyValidationResult<TObject>> => {
    const value = object[propName];

    const violation = await validateFunc(value, root);
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
        isValid: isValid,
    };

    return validationResult;
};
