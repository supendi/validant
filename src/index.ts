
import { ErrorOf, ErrorOfArray, IndexedErrorOf, ArrayElementType } from './types/ErrorOf'
import { ArrayValidationRule } from "./types/ValidationRule";
import { PropertyRuleFunc } from "./types/ValidationRule";
import { ValidationRule } from "./types/ValidationRule";
import { validant, ValidationResult } from "./validant";
import { PropertyValidationResult } from "./validators/validateField";

import {
    alphabetOnly,
    arrayMaxLen,
    arrayMinLen,
    elementOf,
    emailAddress,
    equalToPropertyValue,
    isBool,
    isDateObject,
    isNumber,
    isString,
    maxNumber,
    minNumber,
    regularExpression,
    required,
    stringMaxLen,
    stringMinLen
} from './rules'

export { validant }

export {
    alphabetOnly,
    arrayMaxLen,
    arrayMinLen,
    elementOf,
    emailAddress,
    equalToPropertyValue,
    isBool,
    isDateObject,
    isNumber,
    isString,
    maxNumber,
    minNumber,
    regularExpression,
    required,
    stringMaxLen,
    stringMinLen
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
