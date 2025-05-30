import { arrayMinLen } from "../../rules/arrayMinLen"
import { RuleViolation } from "../../types/ValidationRule"

describe(`Test ${arrayMinLen.name}`, () => {
    it("should return false and have default error message", () => {
        const minValue = 1
        const defaultValidatorErrorMessage = `The minimum length for this field is ${minValue}.`
        const validateFunc = arrayMinLen(minValue)
        const input = []

        const actual = validateFunc(input, {})
        const expected: RuleViolation = {
            ruleName: arrayMinLen.name,
            attemptedValue: input,
            errorMessage: defaultValidatorErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${arrayMinLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const minValue = 2
        const customErrorMessage = "Please add at least one order item"
        const validateFunc = arrayMinLen(minValue, customErrorMessage)
        const input = []

        const actual = validateFunc(input, {})
        const expected: RuleViolation = {
            ruleName: arrayMinLen.name,
            attemptedValue: input,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${arrayMinLen.name}`, () => {
    it("should return true and empty error message", () => {
        const minValue = 2
        const customErrorMessage = "Please add at least one order item"
        const validateFunc = arrayMinLen(minValue, customErrorMessage)
        const input = [
            101,
            10
        ]

        const actual = validateFunc(input, {})

        expect(actual).toEqual(undefined)
    })
})

describe(`Test ${arrayMinLen.name}`, () => {
    it("should return true", () => {
        const minValue = 0
        const validateFunc = arrayMinLen(minValue)
        const input = [
            101,
            10
        ]

        const actual = validateFunc(input, {})
        expect(actual).toEqual(undefined)
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
        const validateFunc = arrayMinLen(maxLen)
        const badInput = "not array" as any

        const actual = () => validateFunc(badInput, {})

        const expectedMessage = `${arrayMinLen.name}: Expected an array but received ${typeof badInput}.`;

        expect(actual).toThrow(new Error(expectedMessage));
    })
})