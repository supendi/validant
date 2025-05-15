import { isBool } from "../../rules/isBool"
import { PropertyRuleValidationResult } from "../../types/ValidationRule"


/**
 * INVALID TEST
 */

describe(`Null Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isBool()
        const date = null
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Undefined Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isBool()
        const date = undefined
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Array Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isBool()
        const date = []
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isBool()
        const date = {}
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${isBool.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = "Invalid boolean."
        const ruleFunc = isBool(customErrorMessage)
        const emptyOrder = {}

        const actual = ruleFunc(emptyOrder, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`NaN Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isBool()
        const date = NaN
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof date}.`

        const actual = ruleFunc(date, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Invalid Date Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const customErrorMessage = "Date is invalid"
        const ruleFunc = isBool(customErrorMessage)
        const invalidDate = new Date("invalid boolean")

        const actual = ruleFunc(invalidDate, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Number Test ${isBool.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isBool()
        const one = 1

        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof one}.`

        const actual = ruleFunc(one, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Object Test ${isBool.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isBool()
        const obj = {
            number: 1
        }

        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof obj}.`

        const actual = ruleFunc(obj, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date Test ${isBool.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = isBool()
        const dateButString = new Date().toString()

        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof dateButString}.`

        const actual = ruleFunc(dateButString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Whitespace string Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isBool()
        const whitespace = "   "
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof whitespace}.`

        const actual = ruleFunc(whitespace, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Zero string Test ${isBool.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isBool()
        const zeroString = "0"
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof zeroString}.`

        const actual = ruleFunc(zeroString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty string Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isBool()
        const emptyString = ""
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof emptyString}.`

        const actual = ruleFunc(emptyString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`false string Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isBool()
        const falseString = "false"
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof falseString}.`

        const actual = ruleFunc(falseString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})


describe(`true string Test ${isBool.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = isBool()
        const trueString = "true"
        const defaultErrorMessage = `This field is not a valid boolean, type of value was: ${typeof trueString}.`

        const actual = ruleFunc(trueString, {})
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
describe(`false boolean Test ${isBool.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isBool()
        const isFalse = false

        const actual = ruleFunc(isFalse, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`true boolean Test ${isBool.name}`, () => {
    it("should return error", () => {
        const ruleFunc = isBool()
        const isTrue = true
        const actual = ruleFunc(isTrue, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})
