import { arrayMaxLen } from "../../rules/arrayMaxLen"
import { PropertyRuleValidationResult } from "../../types/ValidationRule"

describe(`Test ${arrayMaxLen.name}`, () => {
    it("should return false and have default error message", () => {
        const maxLen = 2
        const defaultErrorMessage = `The maximum length for this field is ${maxLen}.`
        const ruleFunc = arrayMaxLen<number, {}>(maxLen)
        const inputArray = [1, 2, 3]

        const actual = ruleFunc(inputArray, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(ruleFunc).not.toBeUndefined()
        expect(actual).toEqual(expected)
    })
})

describe(`Test ${arrayMaxLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const maxValue = 2
        const customErrorMessage = `The maximum length for this field is ${maxValue}.`
        const ruleFunc = arrayMaxLen<number, {}>(maxValue, customErrorMessage)
        const inputArray = [1, 2, 3]

        const actual = ruleFunc(inputArray, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(ruleFunc).not.toBeUndefined()
        expect(actual).toEqual(expected)
    })
})

describe(`Test ${arrayMaxLen.name}`, () => {
    it("Should return true and default errMessage", () => {
        const maxLen = 0
        const defaultErrorMessage = `The maximum length for this field is ${maxLen}.`
        const ruleFunc = arrayMaxLen(maxLen)
        const input = [
            101,
            10
        ]

        const actual = ruleFunc(undefined, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${arrayMaxLen.name}`, () => {
    it("should return true and empty error message", () => {
        const maxValue = 2
        const customErrorMessage = `The maximum length for this field is ${maxValue}`
        const ruleFunc = arrayMaxLen(maxValue, customErrorMessage)
        const inputArray = [
            101,
            10
        ]

        const actual = ruleFunc(inputArray, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(ruleFunc).not.toBeUndefined()
        expect(actual).toEqual(expected)
    })
})

describe(`Test ${arrayMaxLen.name}`, () => {
    it("should throw error", () => {
        const maxLen = -10

        const actual = () => arrayMaxLen(maxLen)
        const expected = new Error(`${arrayMaxLen.name}: The maximum length should be non negative and positive number. Your input was: ${maxLen}`)

        expect(actual).toThrow(expected)
    })
})

describe(`Test ${arrayMaxLen.name}`, () => {
    it("should throw error", () => {
        const maxLen = 10
        const ruleFunc = arrayMaxLen(maxLen)
        const badInput = "not array" as any

        const actual = () => ruleFunc(badInput, {})

        const expectedMessage = `${arrayMaxLen.name}: Expected an array but received ${typeof badInput}.`;

        expect(actual).toThrow(new Error(expectedMessage));
    })
})

