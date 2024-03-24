import validator from "./objectValidator";
import { ErrorOf, ValidationRule, ValidationResult, ValidatorFunc, PropertyValidationResult, PropertyValidator, StringifiedErrorOf, StringifiedValidationResult, ValidationRuleForArrayOf, ErrorOfArray, IndexedErrorOf, TypeOfArray } from './types'
import { emailAddress, equalToPropertyValue, arrayMaxLength, arrayMinLength, maxNumber, minNumber, minSumOf, maxSumOf, regularExpression, required, elementOf, propertyValidator } from './validators/'

export default validator

export {
    arrayMaxLength,
    arrayMinLength,
    elementOf,
    emailAddress,
    equalToPropertyValue,
    maxNumber,
    minNumber,
    regularExpression,
    required,
    minSumOf,
    maxSumOf,
    propertyValidator
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
