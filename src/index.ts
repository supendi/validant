import validator from "./objectValidator";
import { ErrorOf, ValidationRule, ValidationResult, ValidatorFunc, PropertyValidationResult, PropertyValidator, StringifiedErrorOf, StringifiedValidationResult, ArrayValidationRule, ErrorOfArray, IndexedErrorOf, TypeOfArray } from './types'
import { emailAddress, equalToPropertyValue, arrayMaxLen, arrayMinLen, maxNumber, minNumber, minSumOf, maxSumOf, regularExpression, required, elementOf, propertyValidator, alphabetOnly, stringLengthMaximum, stringLengthMinimum } from './validators/'

export { validator }

export {
    arrayMaxLen,
    arrayMinLen,
    elementOf,
    emailAddress,
    equalToPropertyValue,
    maxNumber,
    minNumber,
    regularExpression,
    required,
    minSumOf,
    maxSumOf,
    propertyValidator,
    alphabetOnly,
    stringLengthMaximum,
    stringLengthMinimum
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
    ArrayValidationRule,
    TypeOfArray,
} 
