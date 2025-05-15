import { isString } from "../../rules/isString"
import { PropertyRuleValidationResult } from "../../types/ValidationRule"


/**
 * INVALID TEST
 */

describe(`Null Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isString()
        const date = null
        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Undefined Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isString()
        const date = undefined
        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Array Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isString()
        const date = []
        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isString()
        const date = {}
        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isString.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = "Invalid string."
        const ruleFunc = isString(customErrorMessage)
        const emptyOrder = {}

        const actual = ruleFunc(emptyOrder, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`NaN Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isString()
        const date = NaN
        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Invalid Date Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const customErrorMessage = "Date is invalid"
        const ruleFunc = isString(customErrorMessage)
        const invalidDate = new Date("invalid string")

        const actual = ruleFunc(invalidDate, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`false boolean Test ${isString.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isString()
        const isFalse = false

        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof isFalse}.`

        const actual = ruleFunc(isFalse, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`true boolean Test ${isString.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isString()
        const isTrue = true

        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof isTrue}.`

        const actual = ruleFunc(isTrue, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Number Test ${isString.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isString()
        const one = 1

        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof one}.`

        const actual = ruleFunc(one, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Object Test ${isString.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isString()
        const obj = {
            number: 1
        }

        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof obj}.`

        const actual = ruleFunc(obj, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

/**
 * VALID TEST
 */
describe(`Date Test ${isString.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = isString()
        const dateButString = new Date().toString()

        const actual = ruleFunc(dateButString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Whitespace string Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isString()
        const whitespace = "   "
        const actual = ruleFunc(whitespace, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Zero string Test ${isString.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isString()
        const zeroString = "0"
        const actual = ruleFunc(zeroString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})
describe(`Empty string Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isString()
        const date = ""
        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})
