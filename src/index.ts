import valty from "./valty";
import { ErrorOf, ValidationRule, ValidateFunc, PropertyRuleFunc, ArrayValidationRule, ErrorOfArray, IndexedErrorOf, TypeOfArray } from './types'
import { ValidationResult } from "./valty";
import { PropertyValidationResult } from "./validators/validateField";
import { emailAddress, equalToPropertyValue, arrayMaxLen, arrayMinLen, maxNumber, minNumber, minSumOf, maxSumOf, regularExpression, required, elementOf, alphabetOnly, stringMaxLen, stringMinLen } from './rules'

export { valty }
export { valty as objectValidator } // avoid breaking changes

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
    PropertyRuleFunc as PropertyRule,
    ArrayValidationRule,
    TypeOfArray,
} 
