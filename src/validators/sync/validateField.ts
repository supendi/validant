import { FieldErrorOf } from "../../types/FieldErrorOf";
import { ValidationRule } from "../../types/ValidationRule";
import { isArrayValidationRule, validateObject, validatePrimitiveField } from "./validateObject";

export const validateField = <T, K extends Extract<keyof T, string>>(
    object: T,
    fieldName: K,
    fieldRule: ValidationRule<T, T>[K]
): FieldErrorOf<T, K> => {
    if (!fieldRule) {
        return {
            isValid: true,
            fieldName,
        };
    }

    const isPrimitive = Array.isArray(fieldRule);
    const isArray = isArrayValidationRule(fieldRule);
    const isObjectRule = typeof fieldRule === "object" && !isPrimitive && !isArray;

    if (isPrimitive) {
        const result = validatePrimitiveField(fieldName, object, object, fieldRule);
        return {
            isValid: result.isValid,
            fieldName,
            ...(result.isValid ? {} : { errors: result.errors as any }),
        };
    }

    if (isArray) {
        const arrayErrors = validateObject(object, object, { [fieldName]: fieldRule } as any);
        const isValid = !arrayErrors || !arrayErrors[fieldName];
        return {
            isValid,
            fieldName,
            ...(isValid ? {} : { errors: arrayErrors[fieldName] as any }),
        };
    }

    if (isObjectRule) {
        const nestedErrors = validateObject(object[fieldName], object, fieldRule as any);
        const isValid = !nestedErrors;
        return {
            isValid,
            fieldName,
            ...(isValid ? {} : { errors: nestedErrors as any }),
        };
    }

    return {
        isValid: true,
        fieldName,
    };
};
