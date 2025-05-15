import { isDateObject } from "../../rules/isDateObject"
import { PropertyRuleValidationResult } from "../../types/ValidationRule"


/**
 * INVALID TEST
 */

describe(`Null Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isDateObject()
        const date = null
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Undefined Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isDateObject()
        const date = undefined
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty string Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isDateObject()
        const date = ""
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Array Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isDateObject()
        const date = []
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isDateObject()
        const date = {}
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isDateObject.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = "Invalid date."
        const ruleFunc = isDateObject(customErrorMessage)
        const emptyOrder = {}

        const actual = ruleFunc(emptyOrder, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`NaN Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isDateObject()
        const date = NaN
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Invalid Date Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const customErrorMessage = "Date is invalid"
        const ruleFunc = isDateObject(customErrorMessage)
        const invalidDate = new Date("invalid date")

        const actual = ruleFunc(invalidDate, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Whitespace string Test ${isDateObject.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isDateObject()
        const whitespace = "   "
        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof whitespace}.`

        const actual = ruleFunc(whitespace, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Zero string Test ${isDateObject.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isDateObject()
        const zeroString = "0"

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof zeroString}.`

        const actual = ruleFunc(zeroString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`false boolean Test ${isDateObject.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isDateObject()
        const isFalse = false

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof isFalse}.`

        const actual = ruleFunc(isFalse, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`true boolean Test ${isDateObject.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isDateObject()
        const isTrue = true

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof isTrue}.`

        const actual = ruleFunc(isTrue, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Number Test ${isDateObject.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isDateObject()
        const one = 1

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof one}.`

        const actual = ruleFunc(one, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Object Test ${isDateObject.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isDateObject()
        const obj = {
            number: 1
        }

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof obj}.`

        const actual = ruleFunc(obj, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date string Test ${isDateObject.name}`, () => {
    it("should return error, should be date object", () => {
        const ruleFunc = isDateObject()
        const todayString = new Date().toDateString()

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof todayString}.`

        const actual = ruleFunc(todayString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date string Test ${isDateObject.name}`, () => {
    it("should return error, should be date object", () => {
        const ruleFunc = isDateObject()
        const todayString = new Date().toISOString()

        const defaultErrorMessage = `This field is not a valid date, type of value was: ${typeof todayString}.`

        const actual = ruleFunc(todayString, {})
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
describe(`Date Test ${isDateObject.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = isDateObject()
        const today = new Date()

        const actual = ruleFunc(today, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date Test ${isDateObject.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = isDateObject()
        const dateString = new Date().toISOString()
        const today = new Date(dateString)

        const actual = ruleFunc(today, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})