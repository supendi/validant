import validant from "./validant";
import { ErrorOf, ErrorOfArray, IndexedErrorOf, ArrayElementType } from './types/ErrorOf'
import { ArrayValidationRule } from "./types/ValidationRule";
import { PropertyRuleFunc } from "./types/ValidationRule";
import { ValidationRule } from "./types/ValidationRule";
import { ValidationResult } from "./validant";
import { PropertyValidationResult } from "./validators/validateField";
import { emailAddress, equalToPropertyValue, arrayMaxLen, arrayMinLen, maxNumber, minNumber, regularExpression, required, elementOf, alphabetOnly, stringMaxLen, stringMinLen, isDateObject, isNumber, isString, isBool } from './rules'

export { validant }

export {
    elementOf,
    emailAddress,
    equalToPropertyValue,
    arrayMaxLen,
    maxNumber,
    arrayMinLen,
    minNumber,
    regularExpression,
    required,
    alphabetOnly,
    stringMinLen,
    stringMaxLen,
    isDateObject,
    isNumber,
    isString,
    isBool
}

export {
    ErrorOf,
    ErrorOfArray,
    IndexedErrorOf,
    ValidationRule,
    ValidationResult,
    PropertyValidationResult,
    PropertyRuleFunc,
    ArrayValidationRule,
    ArrayElementType,
} 
