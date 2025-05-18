import { AsyncValidationRule } from "../types/AsyncValidationRule";
import { FieldErrorOf } from "../types/ErrorOf";
import { isAsyncArrayValidationRule, validateObjectAsync, validatePrimitiveFieldAsync } from "./validateObjectAsync";

export const validateFieldOfAsync = async <T, K extends Extract<keyof T, string>>(
    object: T,
    fieldName: K,
    fieldRule: AsyncValidationRule<T, T>[K]
): Promise<FieldErrorOf<T, K>> => {
    if (!fieldRule) {
        return {
            isValid: true,
            fieldName,
        };
    }

    const isPrimitive = Array.isArray(fieldRule);
    const isArrayValidation = isAsyncArrayValidationRule(fieldRule);
    const isObjectRule = typeof fieldRule === "object" && !isPrimitive && !isArrayValidation;

    if (isPrimitive) {
        const result = await validatePrimitiveFieldAsync(fieldName, object, object, fieldRule);
        return {
            isValid: result.isValid,
            fieldName,
            ...(result.isValid ? {} : { errors: { [fieldName]: result.errors } as any }),
        };
    }

    if (isArrayValidation) {
        const arrayErrors = await validateObjectAsync(object, object, { [fieldName]: fieldRule } as any);
        const isValid = !arrayErrors || !arrayErrors[fieldName];
        return {
            isValid,
            fieldName,
            ...(isValid ? {} : { errors: { [fieldName]: arrayErrors[fieldName] } as any }),
        };
    }

    if (isObjectRule) {
        const nestedErrors = await validateObjectAsync(object, object, fieldRule as any);
        const isValid = !nestedErrors;
        return {
            isValid,
            fieldName,
            ...(isValid ? {} : { errors: { [fieldName]: nestedErrors } as any }),
        };
    }

    return {
        isValid: true,
        fieldName,
    };
};
