import { arrayMinLen } from "../../../rules/arrayMinLen"
import { RuleViolation } from "../../../types/ValidationRule"

describe("arrayMinLen", () => {
    describe("parameter validation", () => {
        test("should throw error when minLen is negative", () => {
            const minLen = -1
            const expectedError = new Error(`${arrayMinLen.name}: The minimum length should be non negative or positive number. Your input was: ${minLen}`)

            expect(() => arrayMinLen(minLen)).toThrow(expectedError)
        })

        test("should not throw error when minLen is zero", () => {
            expect(() => arrayMinLen(0)).not.toThrow()
        })

        test("should not throw error when minLen is positive", () => {
            expect(() => arrayMinLen(5)).not.toThrow()
        })
    })

    describe("type validation", () => {
        test("should throw error when input is not an array and not null/undefined", () => {
            const validateFunc = arrayMinLen(1)
            const invalidInput = "not an array" as any
            const expectedError = new Error(`${arrayMinLen.name}: Expected an array but received ${typeof invalidInput}.`)

            expect(() => validateFunc(invalidInput, {})).toThrow(expectedError)
        })

        test("should throw error when input is a number", () => {
            const validateFunc = arrayMinLen(1)
            const invalidInput = 123 as any
            const expectedError = new Error(`${arrayMinLen.name}: Expected an array but received ${typeof invalidInput}.`)

            expect(() => validateFunc(invalidInput, {})).toThrow(expectedError)
        })

        test("should throw error when input is an object", () => {
            const validateFunc = arrayMinLen(1)
            const invalidInput = { length: 5 } as any
            const expectedError = new Error(`${arrayMinLen.name}: Expected an array but received ${typeof invalidInput}.`)

            expect(() => validateFunc(invalidInput, {})).toThrow(expectedError)
        })
    })

    describe("null and undefined handling", () => {
        test("should return violation when input is null", () => {
            const minLen = 1
            const validateFunc = arrayMinLen(minLen)
            const input = null
            const expected: RuleViolation = {
                ruleName: arrayMinLen.name,
                attemptedValue: input,
                errorMessage: `The minimum length for this field is ${minLen}.`
            }

            const result = validateFunc(input, {})

            expect(result).toEqual(expected)
        })

        test("should return violation when input is undefined", () => {
            const minLen = 2
            const validateFunc = arrayMinLen(minLen)
            const input = undefined
            const expected: RuleViolation = {
                ruleName: arrayMinLen.name,
                attemptedValue: input,
                errorMessage: `The minimum length for this field is ${minLen}.`
            }

            const result = validateFunc(input, {})

            expect(result).toEqual(expected)
        })
    })

    describe("validation with default error message", () => {
        test("should return violation when array length is less than minimum", () => {
            const minLen = 3
            const validateFunc = arrayMinLen(minLen)
            const input = [1, 2]
            const expected: RuleViolation = {
                ruleName: arrayMinLen.name,
                attemptedValue: input,
                errorMessage: `The minimum length for this field is ${minLen}.`
            }

            const result = validateFunc(input, {})

            expect(result).toEqual(expected)
        })

        test("should return violation when array is empty and minimum is greater than zero", () => {
            const minLen = 1
            const validateFunc = arrayMinLen(minLen)
            const input: any[] = []
            const expected: RuleViolation = {
                ruleName: arrayMinLen.name,
                attemptedValue: input,
                errorMessage: `The minimum length for this field is ${minLen}.`
            }

            const result = validateFunc(input, {})

            expect(result).toEqual(expected)
        })

        test("should return undefined when array length equals minimum", () => {
            const minLen = 2
            const validateFunc = arrayMinLen(minLen)
            const input = [1, 2]

            const result = validateFunc(input, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined when array length is greater than minimum", () => {
            const minLen = 2
            const validateFunc = arrayMinLen(minLen)
            const input = [1, 2, 3, 4]

            const result = validateFunc(input, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined when minimum is zero and array is empty", () => {
            const minLen = 0
            const validateFunc = arrayMinLen(minLen)
            const input: any[] = []

            const result = validateFunc(input, {})

            expect(result).toBeUndefined()
        })
    })

    describe("validation with custom error message", () => {
        test("should return violation with custom error message when validation fails", () => {
            const minLen = 2
            const customErrorMessage = "Please add at least 2 items to your cart"
            const validateFunc = arrayMinLen(minLen, customErrorMessage)
            const input = [1]
            const expected: RuleViolation = {
                ruleName: arrayMinLen.name,
                attemptedValue: input,
                errorMessage: customErrorMessage
            }

            const result = validateFunc(input, {})

            expect(result).toEqual(expected)
        })

        test("should return violation with custom error message when input is null", () => {
            const minLen = 1
            const customErrorMessage = "Items are required"
            const validateFunc = arrayMinLen(minLen, customErrorMessage)
            const input = null
            const expected: RuleViolation = {
                ruleName: arrayMinLen.name,
                attemptedValue: input,
                errorMessage: customErrorMessage
            }

            const result = validateFunc(input, {})

            expect(result).toEqual(expected)
        })

        test("should return undefined with custom error message when validation passes", () => {
            const minLen = 2
            const customErrorMessage = "Please add at least 2 items"
            const validateFunc = arrayMinLen(minLen, customErrorMessage)
            const input = [1, 2, 3]

            const result = validateFunc(input, {})

            expect(result).toBeUndefined()
        })
    })

    describe("edge cases", () => {
        test("should handle array with mixed data types", () => {
            const minLen = 2
            const validateFunc = arrayMinLen(minLen)
            const input = [1, "string", { key: "value" }, null, undefined]

            const result = validateFunc(input, {})

            expect(result).toBeUndefined()
        })

        test("should handle large arrays", () => {
            const minLen = 1000
            const validateFunc = arrayMinLen(minLen)
            const input = new Array(1001).fill(0)

            const result = validateFunc(input, {})

            expect(result).toBeUndefined()
        })

        test("should handle arrays with only falsy values", () => {
            const minLen = 3
            const validateFunc = arrayMinLen(minLen)
            const input = [null, undefined, false, 0, ""]

            const result = validateFunc(input, {})

            expect(result).toBeUndefined()
        })
    })
}) 