import { isDateObject } from "../../rules/isDateObject"
import { RuleViolation } from "../../types/ValidationRule"


/**
 * INVALID TEST
 */

describe(`Null Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isDateObject()
        const date = null
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Undefined Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isDateObject()
        const date = undefined
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty string Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isDateObject()
        const date = ""
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Array Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isDateObject()
        const date = []
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isDateObject()
        const date = {}
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isDateObject.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = "Invalid date."
        const validateFunc = isDateObject(customErrorMessage)
        const emptyOrder = {}

        const actual = validateFunc(emptyOrder, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: emptyOrder,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`NaN Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isDateObject()
        const date = NaN
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }
        expect(actual).toEqual(expected)
    })
})

describe(`Invalid Date Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const customErrorMessage = "Date is invalid"
        const validateFunc = isDateObject(customErrorMessage)
        const invalidDate = new Date("invalid date")

        const actual = validateFunc(invalidDate, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: invalidDate,
            errorMessage: customErrorMessage
        }
        expect(actual).toEqual(expected)
    })
})

describe(`Whitespace string Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isDateObject()
        const whitespace = "   "
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof whitespace}.`

        const actual = validateFunc(whitespace, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: whitespace,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Zero string Test ${isDateObject.name}`, () => {
    it("should return error", () => {
        const validateFunc = isDateObject()
        const zeroString = "0"

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof zeroString}.`

        const actual = validateFunc(zeroString, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: zeroString,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`false boolean Test ${isDateObject.name}`, () => {
    it("should return error", () => {
        const validateFunc = isDateObject()
        const isFalse = false

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof isFalse}.`

        const actual = validateFunc(isFalse, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: isFalse,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`true boolean Test ${isDateObject.name}`, () => {
    it("should return error", () => {
        const validateFunc = isDateObject()
        const isTrue = true

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof isTrue}.`

        const actual = validateFunc(isTrue, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: isTrue,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Number Test ${isDateObject.name}`, () => {
    it("should return error", () => {
        const validateFunc = isDateObject()
        const one = 1

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof one}.`

        const actual = validateFunc(one, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: one,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Object Test ${isDateObject.name}`, () => {
    it("should return error", () => {
        const validateFunc = isDateObject()
        const obj = {
            number: 1
        }

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof obj}.`

        const actual = validateFunc(obj, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: obj,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date string Test ${isDateObject.name}`, () => {
    it("should return error, should be date object", () => {
        const validateFunc = isDateObject()
        const todayString = new Date().toDateString()

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof todayString}.`

        const actual = validateFunc(todayString, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: todayString,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date string Test ${isDateObject.name}`, () => {
    it("should return error, should be date object", () => {
        const validateFunc = isDateObject()
        const todayString = new Date().toISOString()

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof todayString}.`

        const actual = validateFunc(todayString, {})
        const expected: RuleViolation = {
            ruleName: isDateObject.name,
            attemptedValue: todayString,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

/**
 * VALID TEST
 */
describe(`Date Test ${isDateObject.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = isDateObject()
        const today = new Date()

        const actual = validateFunc(today, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})

describe(`Date Test ${isDateObject.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = isDateObject()
        const dateString = new Date().toISOString()
        const today = new Date(dateString)

        const actual = validateFunc(today, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})