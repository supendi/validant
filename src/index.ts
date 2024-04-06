import validator from "./objectValidator";
import { ErrorOf, ValidationRule, ValidationResult, ValidateFunc, PropertyValidationResult, PropertyValidator, StringifiedErrorOf, StringifiedValidationResult, ArrayValidationRule, ErrorOfArray, IndexedErrorOf, TypeOfArray } from './types'
import { emailAddress, equalToPropertyValue, arrayMaxLen, arrayMinLen, maxNumber, minNumber, minSumOf, maxSumOf, regularExpression, required, elementOf, propertyValidator, alphabetOnly, stringMaxLen, stringMinLen } from './propertyValidators'

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
    stringMaxLen,
    stringMinLen
}

export {
    ErrorOf,
    ErrorOfArray,
    IndexedErrorOf,
    ValidationRule,
    ValidationResult,
    ValidateFunc,
    PropertyValidationResult,
    PropertyValidator,
    StringifiedErrorOf,
    StringifiedValidationResult,
    ArrayValidationRule,
    TypeOfArray,
} 
