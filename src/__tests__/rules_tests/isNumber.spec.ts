import { isNumber } from "../../rules/isNumber"
import { RuleViolation } from "../../types/ValidationRule"


/**
 * INVALID TEST
 */

describe(`Null Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isNumber()
        const value = null
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Undefined Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isNumber()
        const value = undefined
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty string Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isNumber()
        const value = ""
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Array Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isNumber()
        const value = []
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isNumber()
        const value = {}
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isNumber.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = "Invalid value."
        const validateFunc = isNumber(customErrorMessage)
        const emptyOrder = {}

        const actual = validateFunc(emptyOrder, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: emptyOrder,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`NaN Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const defaultErrorMessage = `This field is not a valid number, type of value was: NaN.`
        const validateFunc = isNumber(defaultErrorMessage)
        const value = NaN

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Invalid Date Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const customErrorMessage = "Date is invalid"
        const validateFunc = isNumber(customErrorMessage)
        const invalidDate = new Date("invalid value")

        const actual = validateFunc(invalidDate, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: invalidDate,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Whitespace string Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = isNumber()
        const whitespace = "   "
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof whitespace}.`

        const actual = validateFunc(whitespace, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: whitespace,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Zero string Test ${isNumber.name}`, () => {
    it("should return error", () => {
        const validateFunc = isNumber()
        const zeroString = "0"

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof zeroString}.`

        const actual = validateFunc(zeroString, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: zeroString,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`false boolean Test ${isNumber.name}`, () => {
    it("should return error", () => {
        const validateFunc = isNumber()
        const isFalse = false

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof isFalse}.`

        const actual = validateFunc(isFalse, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: isFalse,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`true boolean Test ${isNumber.name}`, () => {
    it("should return error", () => {
        const validateFunc = isNumber()
        const isTrue = true

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof isTrue}.`

        const actual = validateFunc(isTrue, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: isTrue,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Object Test ${isNumber.name}`, () => {
    it("should return error", () => {
        const validateFunc = isNumber()
        const obj = {
            number: 1
        }

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof obj}.`

        const actual = validateFunc(obj, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: obj,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date string Test ${isNumber.name}`, () => {
    it("should return error, should be value object", () => {
        const validateFunc = isNumber()
        const todayString = new Date().toDateString()

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof todayString}.`

        const actual = validateFunc(todayString, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: todayString,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date string Test ${isNumber.name}`, () => {
    it("should return error, should be value object", () => {
        const validateFunc = isNumber()
        const todayString = new Date().toISOString()

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof todayString}.`

        const actual = validateFunc(todayString, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: todayString,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date Test ${isNumber.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = isNumber()
        const today = new Date()

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof today}.`

        const actual = validateFunc(today, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: today,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date Test ${isNumber.name}`, () => {
    it("should return true and empty error", () => {
        const validateFunc = isNumber()
        const valueString = new Date().toISOString()
        const today = new Date(valueString)

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof today}.`

        const actual = validateFunc(today, {})
        const expected: RuleViolation = {
            ruleName: isNumber.name,
            attemptedValue: today,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

/**
 * VALID TEST
 */

describe(`Number Test ${isNumber.name}`, () => {
    it("should return error", () => {
        const validateFunc = isNumber()
        const one = 1
        const actual = validateFunc(one, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})