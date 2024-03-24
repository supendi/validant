import validator from "./objectValidator";
import { ErrorOf, ValidationRule, ValidationResult, ValidatorFunc, PropertyValidationResult, PropertyValidator, StringifiedErrorOf, StringifiedValidationResult, ValidationRuleForArrayOf, ErrorOfArray, IndexedErrorOf, TypeOfArray } from './types'
import { emailAddress, equalToPropertyValue, maxLength, maxNumber, arrayMinLength, minNumber, minSumOf, maxSumOf, regularExpression, required, elementOf, custom } from './validators/'

export default validator

export {
    elementOf,
    emailAddress,
    equalToPropertyValue,
    maxLength,
    maxNumber,
    arrayMinLength as minLength,
    minNumber,
    regularExpression,
    required,
    minSumOf,
    maxSumOf,
    custom
}

export {
    ErrorOf,
    ErrorOfArray,
    IndexedErrorOf,
    ValidationRule,
    ValidationResult,
    ValidatorFunc,
    PropertyValidationResult,
    PropertyValidator,
    StringifiedErrorOf,
    StringifiedValidationResult,
    ValidationRuleForArrayOf,
    TypeOfArray
} 
