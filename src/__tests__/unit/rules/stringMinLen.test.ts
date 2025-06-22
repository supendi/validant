import { stringMinLen } from "../../../rules/stringMinLen"
import { RuleViolation } from "../../../types/ValidationRule"

describe("stringMinLen", () => {
    describe("validation failures", () => {
        test("should return violation when string length is less than minimum", () => {
            const minLen = 10
            const validateFunc = stringMinLen(minLen)
            const value = "abcd"
            const expectedErrorMessage = `The min length allowed is ${minLen} characters.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMinLen.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation with custom error message", () => {
            const minLen = 10
            const customErrorMessage = "Hey we want a string with minimum length = 10."
            const validateFunc = stringMinLen(minLen, customErrorMessage)
            const value = "abcd"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMinLen.name,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should handle empty string with non-zero minimum", () => {
            const minLen = 5
            const validateFunc = stringMinLen(minLen)
            const value = ""

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMinLen.name,
                attemptedValue: value,
                errorMessage: `The min length allowed is ${minLen} characters.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle single character with minimum greater than 1", () => {
            const minLen = 3
            const validateFunc = stringMinLen(minLen)
            const value = "a"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMinLen.name,
                attemptedValue: value,
                errorMessage: `The min length allowed is ${minLen} characters.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle string with special characters below minimum", () => {
            const minLen = 10
            const validateFunc = stringMinLen(minLen)
            const value = "test@123"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMinLen.name,
                attemptedValue: value,
                errorMessage: `The min length allowed is ${minLen} characters.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle string with unicode characters below minimum", () => {
            const minLen = 5
            const validateFunc = stringMinLen(minLen)
            const value = "🚀🚀"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMinLen.name,
                attemptedValue: value,
                errorMessage: `The min length allowed is ${minLen} characters.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle string with emojis below minimum", () => {
            const minLen = 5
            const validateFunc = stringMinLen(minLen)
            const value = "😀😀"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMinLen.name,
                attemptedValue: value,
                errorMessage: `The min length allowed is ${minLen} characters.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle whitespace string below minimum", () => {
            const minLen = 5
            const validateFunc = stringMinLen(minLen)
            const value = "   "

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMinLen.name,
                attemptedValue: value,
                errorMessage: `The min length allowed is ${minLen} characters.`
            }
            expect(result).toEqual(expected)
        })
    })

    describe("validation successes", () => {
        test("should return undefined when string length equals minimum", () => {
            const minLen = 5
            const validateFunc = stringMinLen(minLen)
            const value = "abcde"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined when string length exceeds minimum", () => {
            const minLen = 5
            const validateFunc = stringMinLen(minLen)
            const value = "abcdefghij"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for empty string with zero minimum", () => {
            const minLen = 0
            const validateFunc = stringMinLen(minLen)
            const value = ""

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for single character with minimum of 1", () => {
            const minLen = 1
            const validateFunc = stringMinLen(minLen)
            const value = "a"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle large minimum length", () => {
            const minLen = 100
            const validateFunc = stringMinLen(minLen)
            const value = "a".repeat(150)

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with special characters meeting minimum", () => {
            const minLen = 8
            const validateFunc = stringMinLen(minLen)
            const value = "test@123"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with unicode characters meeting minimum", () => {
            const minLen = 4
            const validateFunc = stringMinLen(minLen)
            const value = "🚀🚀"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with emojis meeting minimum", () => {
            const minLen = 4
            const validateFunc = stringMinLen(minLen)
            const value = "😀😀"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with mixed content meeting minimum", () => {
            const minLen = 15
            const validateFunc = stringMinLen(minLen)
            const value = "Hello 🚀 World!"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle whitespace string meeting minimum", () => {
            const minLen = 5
            const validateFunc = stringMinLen(minLen)
            const value = "     "

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle very long string", () => {
            const minLen = 100
            const validateFunc = stringMinLen(minLen)
            const value = "a".repeat(1000)

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })

    describe("type validation", () => {
        test("should throw error when value is not a string (number)", () => {
            const minLen = 100
            const validateFunc = stringMinLen(minLen)
            const badInput = 10000000 as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMinLen.name}: Expected a string but received number.`
            )
        })

        test("should throw error when value is not a string (boolean)", () => {
            const minLen = 100
            const validateFunc = stringMinLen(minLen)
            const badInput = true as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMinLen.name}: Expected a string but received boolean.`
            )
        })

        test("should throw error when value is not a string (object)", () => {
            const minLen = 100
            const validateFunc = stringMinLen(minLen)
            const badInput = {} as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMinLen.name}: Expected a string but received object.`
            )
        })

        test("should throw error when value is not a string (array)", () => {
            const minLen = 100
            const validateFunc = stringMinLen(minLen)
            const badInput = [] as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMinLen.name}: Expected a string but received object.`
            )
        })

        test("should throw error when value is not a string (null)", () => {
            const minLen = 100
            const validateFunc = stringMinLen(minLen)
            const badInput = null as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMinLen.name}: Expected a string but received object.`
            )
        })

        test("should throw error when value is not a string (undefined)", () => {
            const minLen = 100
            const validateFunc = stringMinLen(minLen)
            const badInput = undefined as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMinLen.name}: Expected a string but received undefined.`
            )
        })

        test("should throw error when value is not a string (function)", () => {
            const minLen = 100
            const validateFunc = stringMinLen(minLen)
            const badInput = (() => {}) as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMinLen.name}: Expected a string but received function.`
            )
        })
    })

    describe("parameter validation", () => {
        test("should throw error when minimum length is negative", () => {
            const minLen = -100

            expect(() => stringMinLen(minLen)).toThrow(
                `${stringMinLen.name}: The minimum length argument must be a non-negative number.`
            )
        })
    })

    describe("edge cases", () => {
        test("should handle very large minimum length", () => {
            const minLen = 10000
            const validateFunc = stringMinLen(minLen)
            const value = "a".repeat(10000)

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle minimum length at boundary", () => {
            const minLen = 1000
            const validateFunc = stringMinLen(minLen)
            const value = "a".repeat(1000)

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle minimum length just below boundary", () => {
            const minLen = 1000
            const validateFunc = stringMinLen(minLen)
            const value = "a".repeat(999)

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMinLen.name,
                attemptedValue: value,
                errorMessage: `The min length allowed is ${minLen} characters.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle string with null bytes", () => {
            const minLen = 5
            const validateFunc = stringMinLen(minLen)
            const value = "a\0b\0c"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with control characters", () => {
            const minLen = 5
            const validateFunc = stringMinLen(minLen)
            const value = "a\x01b\x02c"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with surrogate pairs", () => {
            const minLen = 4
            const validateFunc = stringMinLen(minLen)
            const value = "🚀🚀"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with combining characters", () => {
            const minLen = 5
            const validateFunc = stringMinLen(minLen)
            const value = "e\u0301\u0302\u0303\u0304\u0305" // é with multiple combining accents

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle zero minimum length with any string", () => {
            const minLen = 0
            const validateFunc = stringMinLen(minLen)
            const value = "any string"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle zero minimum length with empty string", () => {
            const minLen = 0
            const validateFunc = stringMinLen(minLen)
            const value = ""

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle minimum length of 1 with single character", () => {
            const minLen = 1
            const validateFunc = stringMinLen(minLen)
            const value = "a"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle minimum length of 1 with empty string", () => {
            const minLen = 1
            const validateFunc = stringMinLen(minLen)
            const value = ""

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMinLen.name,
                attemptedValue: value,
                errorMessage: `The min length allowed is ${minLen} characters.`
            }
            expect(result).toEqual(expected)
        })
    })
}) 