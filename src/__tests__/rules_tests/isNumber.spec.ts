import { isNumber } from "../../rules/isNumber"
import { PropertyRuleValidationResult } from "../../types/ValidationRule"


/**
 * INVALID TEST
 */

describe(`Null Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isNumber()
        const value = null
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

        const actual = ruleFunc(value, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Undefined Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isNumber()
        const value = undefined
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

        const actual = ruleFunc(value, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty string Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isNumber()
        const value = ""
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

        const actual = ruleFunc(value, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Array Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isNumber()
        const value = []
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

        const actual = ruleFunc(value, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isNumber()
        const value = {}
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

        const actual = ruleFunc(value, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isNumber.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = "Invalid value."
        const ruleFunc = isNumber(customErrorMessage)
        const emptyOrder = {}

        const actual = ruleFunc(emptyOrder, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`NaN Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isNumber()
        const value = NaN
        const defaultErrorMessage = `This field is not a valid number, type of value was: NaN.`

        const actual = ruleFunc(value, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Invalid Date Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const customErrorMessage = "Date is invalid"
        const ruleFunc = isNumber(customErrorMessage)
        const invalidDate = new Date("invalid value")

        const actual = ruleFunc(invalidDate, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Whitespace string Test ${isNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isNumber()
        const whitespace = "   "
        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof whitespace}.`

        const actual = ruleFunc(whitespace, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Zero string Test ${isNumber.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isNumber()
        const zeroString = "0"

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof zeroString}.`

        const actual = ruleFunc(zeroString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`false boolean Test ${isNumber.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isNumber()
        const isFalse = false

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof isFalse}.`

        const actual = ruleFunc(isFalse, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`true boolean Test ${isNumber.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isNumber()
        const isTrue = true

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof isTrue}.`

        const actual = ruleFunc(isTrue, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Object Test ${isNumber.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isNumber()
        const obj = {
            number: 1
        }

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof obj}.`

        const actual = ruleFunc(obj, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date string Test ${isNumber.name}`, () => {
    it("should return error, should be value object", () => {
        const ruleFunc = isNumber()
        const todayString = new Date().toDateString()

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof todayString}.`

        const actual = ruleFunc(todayString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date string Test ${isNumber.name}`, () => {
    it("should return error, should be value object", () => {
        const ruleFunc = isNumber()
        const todayString = new Date().toISOString()

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof todayString}.`

        const actual = ruleFunc(todayString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date Test ${isNumber.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = isNumber()
        const today = new Date()

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof today}.`

        const actual = ruleFunc(today, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date Test ${isNumber.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = isNumber()
        const valueString = new Date().toISOString()
        const today = new Date(valueString)

        const defaultErrorMessage = `This field is not a valid number, type of value was: ${typeof today}.`

        const actual = ruleFunc(today, {})
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

describe(`Number Test ${isNumber.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isNumber()
        const one = 1
        const actual = ruleFunc(one, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})