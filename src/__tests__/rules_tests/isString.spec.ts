import { isString } from "../../rules/isString"
import { RuleViolation } from "../../types/ValidationRule"


/**
 * INVALID TEST
 */

describe(`Null Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isString()
        const date = null
        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isString.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Undefined Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isString()
        const date = undefined
        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isString.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Array Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isString()
        const date = []
        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isString.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isString()
        const date = {}
        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isString.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isString.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = "Invalid string."
        const validateFunc = isString(customErrorMessage)
        const emptyOrder = {}

        const actual = validateFunc(emptyOrder, {})
        const expected: RuleViolation = {
            ruleName: isString.name,
            attemptedValue: emptyOrder,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`NaN Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isString()
        const date = NaN
        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isString.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Invalid Date Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const customErrorMessage = "Date is invalid"
        const validateFunc = isString(customErrorMessage)
        const invalidDate = new Date("invalid string")

        const actual = validateFunc(invalidDate, {})
        const expected: RuleViolation = {
            ruleName: isString.name,
            attemptedValue: invalidDate,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`false boolean Test ${isString.name}`, () => {
    it("should return error", () => {
        const validateFunc = isString()
        const isFalse = false

        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof isFalse}.`

        const actual = validateFunc(isFalse, {})
        const expected: RuleViolation = {
            ruleName: isString.name,
            attemptedValue: isFalse,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`true boolean Test ${isString.name}`, () => {
    it("should return error", () => {
        const validateFunc = isString()
        const isTrue = true

        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof isTrue}.`

        const actual = validateFunc(isTrue, {})
        const expected: RuleViolation = {
            ruleName: isString.name,
            attemptedValue: isTrue,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Number Test ${isString.name}`, () => {
    it("should return error", () => {
        const validateFunc = isString()
        const one = 1

        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof one}.`

        const actual = validateFunc(one, {})
        const expected: RuleViolation = {
            ruleName: isString.name,
            attemptedValue: one,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Object Test ${isString.name}`, () => {
    it("should return error", () => {
        const validateFunc = isString()
        const obj = {
            number: 1
        }

        const defaultErrorMessage = `This field is not a valid string, type of value was: ${typeof obj}.`

        const actual = validateFunc(obj, {})
        const expected: RuleViolation = {
            ruleName: isString.name,
            attemptedValue: obj,
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
        const validateFunc = isString()
        const dateButString = new Date().toString()

        const actual = validateFunc(dateButString, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})

describe(`Whitespace string Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isString()
        const whitespace = "   "
        const actual = validateFunc(whitespace, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})

describe(`Zero string Test ${isString.name}`, () => {
    it("should return error", () => {
        const validateFunc = isString()
        const zeroString = "0"
        const actual = validateFunc(zeroString, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})
describe(`Empty string Test ${isString.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isString()
        const date = ""
        const actual = validateFunc(date, {})
        const expected = undefined
        expect(actual).toEqual(expected)
    })
})
