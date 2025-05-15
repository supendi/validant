import { GenericPropertyRuleFunc } from "../types/AsyncValidationRule";
import { PropertyValidationResult, stringifyValue } from "./validateField";

/**
 * Do a single validation against single property
 * @param propName
 * @param object
 * @param propertyRuleFunc
 * @returns
 */
export const validateFieldAsync = async <TObject, TRoot>(propName: keyof TObject, object: TObject, root: TRoot, propertyRuleFunc: GenericPropertyRuleFunc<TObject[keyof TObject], TRoot>): Promise<PropertyValidationResult<TObject>> => {
    const value = object[propName];

    const {
        isValid,
        errorMessage
    } = await propertyRuleFunc(value, root);

    let resolvedErrorMessage = errorMessage
    if (resolvedErrorMessage) {

        resolvedErrorMessage = resolvedErrorMessage.replace(":value", stringifyValue(value));
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
