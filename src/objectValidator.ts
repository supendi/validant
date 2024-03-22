import { ErrorOf, FieldValidationResult, FieldValidator, ValidationResult, ValidationRule, ValidationRuleForArrayOf } from "./types";

/**
 * Do a single validation against single field
 * @param fieldName 
 * @param object 
 * @param fieldValidator 
 * @returns 
 */
const validateField = (fieldName: string, object: any, fieldValidator: FieldValidator): FieldValidationResult => {
    const value = object[fieldName]
    const isValid = fieldValidator.validate(value, object)

    var errorMessage = fieldValidator.returningErrorMessage
    if (fieldValidator.returningErrorMessage) {
        errorMessage = fieldValidator.returningErrorMessage.replace(":value", value as any)
    }

    const validationResult: FieldValidationResult = {
        object: object,
        fieldName: fieldName,
        fieldValue: value,
        errorMessage: errorMessage,
        isValid: isValid
    }

    return validationResult
}

/**
 * Validates and collects errors of each fields as array of string
 * @param object 
 * @param validationRule 
 * @returns 
 */
export const getErrorOf = <T>(object: T, validationRule: ValidationRule<T>): ErrorOf<T> => {
    var errors: ErrorOf<T> = undefined
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = object[key];

            const rule = validationRule[key]
            if (!rule) {
                continue
            }

            // if rule is array it probably means rule = fieldValidator []
            const isRuleAnArray = Array.isArray(rule)
            if (isRuleAnArray) {
                for (let index = 0; index < rule.length; index++) {
                    const fieldValidator = rule[index]
                    if (!fieldValidator) {
                        continue
                    }

                    const isFieldValidator = !!fieldValidator.validate && !!fieldValidator.returningErrorMessage
                    if (!isFieldValidator) {
                        continue
                    }

                    const fieldValidationResult = validateField(key, object, fieldValidator)

                    const isValid = fieldValidationResult.isValid

                    if (!isValid) {
                        if (!errors) {
                            errors = {} as ErrorOf<T>
                        }
                        if (!errors[key]) {
                            errors[key as any] = []
                        }

                        (errors[key] as string[]).push(fieldValidationResult.errorMessage)
                    }
                }
                continue
            }

            // If property value is an array, means the property data type is array and it has different treatment
            const valueIsArray = Array.isArray(value)
            if (valueIsArray) {

                const childObject = object[key]
                const childValidationRule = rule as ValidationRuleForArrayOf<typeof childObject>;
                if (childValidationRule.fieldValidators) {
                    for (let index = 0; index < childValidationRule.fieldValidators.length; index++) {
                        const fieldValidator = childValidationRule.fieldValidators[index];

                        if (!fieldValidator) {
                            continue
                        }

                        const isFieldValidator = !!fieldValidator.validate && !!fieldValidator.returningErrorMessage
                        if (!isFieldValidator) {
                            continue
                        }

                        const fieldValidationResult = validateField(key, object, fieldValidator)

                        const isValid = fieldValidationResult.isValid

                        if (!isValid) {
                            if (!errors) {
                                errors = {}
                            }
                            if (!errors[key]) {
                                errors[key as any] = {}
                            }
                            if (!errors[key as any].fieldErrors) {
                                errors[key as any].fieldErrors = []
                            }
                            errors[key as any].fieldErrors.push(fieldValidationResult.errorMessage)
                        }
                    }
                }
                if (childValidationRule.validationRule) {
                    for (let index = 0; index < value.length; index++) {
                        const element = value[index];
                        const error = getErrorOf(element, childValidationRule.validationRule)
                        if (error) {
                            if (!errors) {
                                errors = {}
                            }
                            if (!errors[key]) {
                                errors[key as any] = {}
                            }
                            if (!errors[key as any].indexedErrors) {
                                errors[key as any].indexedErrors = []
                            }
                            errors[key as any].indexedErrors.push({
                                index: index,
                                errors: error,
                                validatedObject: element
                            })
                        }
                        continue
                    }
                }
                continue
            }

            const typeofValue = typeof (value)
            if (typeofValue === "object") {
                const childObject = object[key]
                const childValidationRule = rule as ValidationRule<typeof childObject>;
                const error = getErrorOf(childObject, childValidationRule)
                if (error) {
                    if (!errors) {
                        errors = {}
                    }
                    if (!errors[key]) {
                        errors[key as any] = {}
                    }
                    errors[key as any] = error
                }
            }
        }
    }
    return errors
}

/**
 * Validates an object with the specified validation rule
 * @param object 
 * @param validationRule 
 * @returns ValidationResult
 */
export const validateObject = <T>(object: T, validationRule: ValidationRule<T>): ValidationResult<T> => {
    const errors = getErrorOf(object, validationRule)
    let isValid = true

    for (const key in errors) {
        if (Object.prototype.hasOwnProperty.call(errors, key)) {
            const error = errors[key];
            if (error) {
                isValid = false
                break
            }
        }
    }

    return {
        isValid: isValid,
        errors: errors,
    }
}


const validator = {
    validate: validateObject
}

export default validator