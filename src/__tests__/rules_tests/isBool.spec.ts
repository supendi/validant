import { isBool } from "../../rules/isBool"
import { RuleViolation } from "../../types/ValidationRule"


/**
 * INVALID TEST
 */

describe(`Null Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isBool()
        const date = null
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Undefined Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isBool()
        const date = undefined
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Array Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isBool()
        const date = []
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isBool()
        const date = {}
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isBool.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = "Invalid boolean."
        const validateFunc = isBool(customErrorMessage)
        const emptyOrder = {}

        const actual = validateFunc(emptyOrder, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: emptyOrder,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`NaN Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isBool()
        const date = NaN
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof date}.`

        const actual = validateFunc(date, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: date,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Invalid Date Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const customErrorMessage = "Date is invalid"
        const validateFunc = isBool(customErrorMessage)
        const invalidDate = new Date("invalid boolean")

        const actual = validateFunc(invalidDate, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: invalidDate,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Number Test ${isBool.name}`, () => {
    it("should return error", () => {
        const validateFunc = isBool()
        const one = 1

        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof one}.`

        const actual = validateFunc(one, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: one,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Object Test ${isBool.name}`, () => {
    it("should return error", () => {
        const validateFunc = isBool()
        const obj = {
            number: 1
        }

        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof obj}.`

        const actual = validateFunc(obj, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: obj,
            errorMessage: defaultErrorMessage
        }


        expect(actual).toEqual(expected)
    })
})

describe(`Date Test ${isBool.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = isBool()
        const dateButString = new Date().toString()

        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof dateButString}.`

        const actual = validateFunc(dateButString, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: dateButString,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Whitespace string Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isBool()
        const whitespace = "   "
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof whitespace}.`

        const actual = validateFunc(whitespace, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: whitespace,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Zero string Test ${isBool.name}`, () => {
    it("should return error", () => {
        const validateFunc = isBool()
        const zeroString = "0"
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof zeroString}.`

        const actual = validateFunc(zeroString, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: zeroString,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty string Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isBool()
        const emptyString = ""
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof emptyString}.`

        const actual = validateFunc(emptyString, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: emptyString,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`false string Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isBool()
        const falseString = "false"
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof falseString}.`

        const actual = validateFunc(falseString, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: falseString,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})


describe(`true string Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isBool()
        const trueString = "true"
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof trueString}.`

        const actual = validateFunc(trueString, {})
        const expected: RuleViolation = {
            ruleName: isBool.name,
            attemptedValue: trueString,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

/**
 * VALID TEST
 */
describe(`false boolean Test ${isBool.name}`, () => {
    it("should return error", () => {
        const validateFunc = isBool()
        const isFalse = false

        const actual = validateFunc(isFalse, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})

describe(`true boolean Test ${isBool.name}`, () => {
    it("should return error", () => {
        const validateFunc = isBool()
        const isTrue = true
        const actual = validateFunc(isTrue, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})
