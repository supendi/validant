import { arrayMinLen } from "../../rules/arrayMinLen"
import { PropertyRuleValidationResult } from "../../types"

describe(`Test ${arrayMinLen.name}`, () => {
    it("should return false and have default error message", () => {
        const minValue = 1
        const defaultValidatorErrorMessage = `The minimum length for this field is ${minValue}.`
        const ruleFunc = arrayMinLen(minValue)
        const input = []

        const actual = ruleFunc(input, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultValidatorErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${arrayMinLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const minValue = 2
        const customErrorMessage = "Please add at least one order item"
        const ruleFunc = arrayMinLen(minValue, customErrorMessage)
        const input = []

        const actual = ruleFunc(input, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${arrayMinLen.name}`, () => {
    it("should return true and empty error message", () => {
        const minValue = 2
        const customErrorMessage = "Please add at least one order item"
        const ruleFunc = arrayMinLen(minValue, customErrorMessage)
        const input = [
            101,
            10
        ]

        const actual = ruleFunc(input, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${arrayMinLen.name}`, () => {
    it("should return true", () => {
        const minValue = 0
        const ruleFunc = arrayMinLen(minValue)
        const input = [
            101,
            10
        ]

        const actual = ruleFunc(input, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true,
        }
        expect(actual).toEqual(expected)
    })
})

describe(`Test ${arrayMinLen.name}`, () => {
    it("should throw error", () => {
        const minLen = -1
        const actual = () => arrayMinLen(minLen)
        const expected = new Error(`${arrayMinLen.name}: The minimum length should be non negative or positive number. Your input was: ${minLen}`)

        expect(actual).toThrow(expected)
    })
})

describe(`Test ${arrayMinLen.name}`, () => {
    it("should throw error", () => {
        const maxLen = 10
        const ruleFunc = arrayMinLen(maxLen)
        const badInput = "not array" as any

        const actual = () => ruleFunc(badInput, {})

        const expectedMessage = `${arrayMinLen.name}: Expected an array but received ${typeof badInput}.`;

        expect(actual).toThrow(new Error(expectedMessage));
    })
})