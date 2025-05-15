import { required } from "../../rules/required"
import { PropertyRuleValidationResult } from "../../types/ValidationRule"

const defaultErrorMessage = "This field is required."

/**
 * INVALID TEST
 */

describe(`Null Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = required()
        const myName = null

        const actual = ruleFunc(myName, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Undefined Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = required()
        const myName = undefined

        const actual = ruleFunc(myName, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty string Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = required()
        const myName = ""

        const actual = ruleFunc(myName, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Array Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = required()
        const orders = []

        const actual = ruleFunc(orders, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = required()
        const emptyOrder = {}

        const actual = ruleFunc(emptyOrder, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Empty Object Test ${required.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = "Empty object treated as invalid"
        const ruleFunc = required(customErrorMessage)
        const emptyOrder = {}

        const actual = ruleFunc(emptyOrder, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`NaN Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = required()
        const notANumber = NaN

        const actual = ruleFunc(notANumber, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Invalid Date Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const customErrorMessage = "Date is invalid"
        const ruleFunc = required(customErrorMessage)
        const invalidDate = new Date("invalid date")

        const actual = ruleFunc(invalidDate, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Whitespace string Test ${required.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = required()
        const whitespace = "   "

        const actual = ruleFunc(whitespace, {})
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

describe(`Zero string Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = required()
        const zeroString = "0"

        const actual = ruleFunc(zeroString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Zero number Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = required()
        const zeroString = 0

        const actual = ruleFunc(zeroString, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`false boolean Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = required()
        const isFalse = false

        const actual = ruleFunc(isFalse, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`true boolean Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = required()
        const isTrue = true

        const actual = ruleFunc(isTrue, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Array Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = required()
        const arr = [1]

        const actual = ruleFunc(arr, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Number Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = required()
        const one = 1

        const actual = ruleFunc(one, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Object Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = required()
        const obj = {
            number: 1
        }

        const actual = ruleFunc(obj, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Date Test ${required.name}`, () => {
    it("should return true and empty error", () => {
        const ruleFunc = required()
        const today = new Date()

        const actual = ruleFunc(today, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})