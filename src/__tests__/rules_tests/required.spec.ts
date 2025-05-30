import { required } from "../../rules/required"
import { RuleViolation } from "../../types/ValidationRule"

const defaultErrorMessage = "This field is required."

/**
 * INVALID TEST
 */

describe(`Null Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = required()
        const value = null

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: required.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Undefined Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = required()
        const value = undefined

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: required.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty string Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = required()
        const value = ""

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: required.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Array Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = required()
        const orders = []

        const actual = validateFunc(orders, {})
        const expected: RuleViolation = {
            ruleName: required.name,
            attemptedValue: orders,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = required()
        const emptyOrder = {}

        const actual = validateFunc(emptyOrder, {})
        const expected: RuleViolation = {
            ruleName: required.name,
            attemptedValue: emptyOrder,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${required.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = "Empty object treated as invalid"
        const validateFunc = required(customErrorMessage)
        const emptyOrder = {}

        const actual = validateFunc(emptyOrder, {})
        const expected: RuleViolation = {
            ruleName: required.name,
            attemptedValue: emptyOrder,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`NaN Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = required()
        const notANumber = NaN

        const actual = validateFunc(notANumber, {})
        const expected: RuleViolation = {
            ruleName: required.name,
            attemptedValue: notANumber,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Invalid Date Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const customErrorMessage = "Date is invalid"
        const validateFunc = required(customErrorMessage)
        const invalidDate = new Date("invalid date")

        const actual = validateFunc(invalidDate, {})
        const expected: RuleViolation = {
            ruleName: required.name,
            attemptedValue: invalidDate,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Whitespace string Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = required()
        const whitespace = "   "

        const actual = validateFunc(whitespace, {})
        const expected: RuleViolation = {
            ruleName: required.name,
            attemptedValue: whitespace,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})



/**
 * VALID TEST
 */

describe(`Zero string Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = required()
        const zeroString = "0"

        const actual = validateFunc(zeroString, {})
        const expected = undefined
        expect(actual).toEqual(expected)
    })
})

describe(`Zero number Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = required()
        const zeroString = 0

        const actual = validateFunc(zeroString, {})
        const expected = undefined
        expect(actual).toEqual(expected)
    })
})

describe(`false boolean Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = required()
        const isFalse = false

        const actual = validateFunc(isFalse, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})

describe(`true boolean Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = required()
        const isTrue = true

        const actual = validateFunc(isTrue, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})

describe(`Array Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = required()
        const arr = [1]

        const actual = validateFunc(arr, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})

describe(`Number Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = required()
        const one = 1

        const actual = validateFunc(one, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})

describe(`Object Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = required()
        const obj = {
            number: 1
        }

        const actual = validateFunc(obj, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})

describe(`Date Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = required()
        const today = new Date()

        const actual = validateFunc(today, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})