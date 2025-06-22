import { stringMaxLen } from "../../../rules/stringMaxLen"
import { RuleViolation } from "../../../types/ValidationRule"

describe("stringMaxLen", () => {
    describe("validation failures", () => {
        test("should return violation when string length exceeds maximum", () => {
            const maxLength = 3
            const validateFunc = stringMaxLen(maxLength)
            const value = "abcd"
            const expectedErrorMessage = `The maximum length allowed is ${maxLength} characters.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMaxLen.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation with custom error message", () => {
            const maxLength = 5
            const customErrorMessage = "Hey we want a string with max length = 5."
            const validateFunc = stringMaxLen(maxLength, customErrorMessage)
            const value = "12345601"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMaxLen.name,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should handle zero maximum length", () => {
            const maxLength = 0
            const validateFunc = stringMaxLen(maxLength)
            const value = "a"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMaxLen.name,
                attemptedValue: value,
                errorMessage: `The maximum length allowed is ${maxLength} characters.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle very long string exceeding limit", () => {
            const maxLength = 10
            const validateFunc = stringMaxLen(maxLength)
            const value = "a".repeat(1000)

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMaxLen.name,
                attemptedValue: value,
                errorMessage: `The maximum length allowed is ${maxLength} characters.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle string with special characters exceeding limit", () => {
            const maxLength = 5
            const validateFunc = stringMaxLen(maxLength)
            const value = "test@123"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMaxLen.name,
                attemptedValue: value,
                errorMessage: `The maximum length allowed is ${maxLength} characters.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle string with unicode characters exceeding limit", () => {
            const maxLength = 3
            const validateFunc = stringMaxLen(maxLength)
            const value = "🚀🚀🚀🚀"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMaxLen.name,
                attemptedValue: value,
                errorMessage: `The maximum length allowed is ${maxLength} characters.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle string with emojis exceeding limit", () => {
            const maxLength = 2
            const validateFunc = stringMaxLen(maxLength)
            const value = "😀😀😀"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMaxLen.name,
                attemptedValue: value,
                errorMessage: `The maximum length allowed is ${maxLength} characters.`
            }
            expect(result).toEqual(expected)
        })
    })

    describe("validation successes", () => {
        test("should return undefined when string length equals maximum", () => {
            const maxLength = 4
            const validateFunc = stringMaxLen(maxLength)
            const value = "test"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined when string length is less than maximum", () => {
            const maxLength = 10
            const validateFunc = stringMaxLen(maxLength)
            const value = "test"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for empty string", () => {
            const maxLength = 5
            const validateFunc = stringMaxLen(maxLength)
            const value = ""

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for zero maximum length with empty string", () => {
            const maxLength = 0
            const validateFunc = stringMaxLen(maxLength)
            const value = ""

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle large maximum length", () => {
            const maxLength = 1000
            const validateFunc = stringMaxLen(maxLength)
            const value = "a".repeat(500)

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with special characters within limit", () => {
            const maxLength = 10
            const validateFunc = stringMaxLen(maxLength)
            const value = "test@123"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with unicode characters within limit", () => {
            const maxLength = 4
            const validateFunc = stringMaxLen(maxLength)
            const value = "🚀🚀"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with emojis within limit", () => {
            const maxLength = 4
            const validateFunc = stringMaxLen(maxLength)
            const value = "😀😀"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with mixed content within limit", () => {
            const maxLength = 15
            const validateFunc = stringMaxLen(maxLength)
            const value = "Hello 🚀 World!"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle whitespace string within limit", () => {
            const maxLength = 5
            const validateFunc = stringMaxLen(maxLength)
            const value = "   "

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle single character", () => {
            const maxLength = 1
            const validateFunc = stringMaxLen(maxLength)
            const value = "a"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })

    describe("type validation", () => {
        test("should throw error when value is not a string (number)", () => {
            const maxLength = 100
            const validateFunc = stringMaxLen(maxLength)
            const badInput = 10000000 as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMaxLen.name}: Expected a string but received number.`
            )
        })

        test("should throw error when value is not a string (boolean)", () => {
            const maxLength = 100
            const validateFunc = stringMaxLen(maxLength)
            const badInput = true as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMaxLen.name}: Expected a string but received boolean.`
            )
        })

        test("should throw error when value is not a string (object)", () => {
            const maxLength = 100
            const validateFunc = stringMaxLen(maxLength)
            const badInput = {} as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMaxLen.name}: Expected a string but received object.`
            )
        })

        test("should throw error when value is not a string (array)", () => {
            const maxLength = 100
            const validateFunc = stringMaxLen(maxLength)
            const badInput = [] as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMaxLen.name}: Expected a string but received object.`
            )
        })

        test("should throw error when value is not a string (null)", () => {
            const maxLength = 100
            const validateFunc = stringMaxLen(maxLength)
            const badInput = null as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMaxLen.name}: Expected a string but received object.`
            )
        })

        test("should throw error when value is not a string (undefined)", () => {
            const maxLength = 100
            const validateFunc = stringMaxLen(maxLength)
            const badInput = undefined as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMaxLen.name}: Expected a string but received undefined.`
            )
        })

        test("should throw error when value is not a string (function)", () => {
            const maxLength = 100
            const validateFunc = stringMaxLen(maxLength)
            const badInput = (() => {}) as any as string

            expect(() => validateFunc(badInput, {})).toThrow(
                `${stringMaxLen.name}: Expected a string but received function.`
            )
        })
    })

    describe("parameter validation", () => {
        test("should throw error when maximum length is negative", () => {
            const maxLength = -100

            expect(() => stringMaxLen(maxLength)).toThrow(
                `${stringMaxLen.name}: The maximum length argument must be a non-negative number.`
            )
        })
    })

    describe("edge cases", () => {
        test("should handle very large maximum length", () => {
            const maxLength = 10000
            const validateFunc = stringMaxLen(maxLength)
            const value = "a".repeat(1000)

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle maximum length at boundary", () => {
            const maxLength = 1000
            const validateFunc = stringMaxLen(maxLength)
            const value = "a".repeat(1000)

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle maximum length just above boundary", () => {
            const maxLength = 1000
            const validateFunc = stringMaxLen(maxLength)
            const value = "a".repeat(1001)

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: stringMaxLen.name,
                attemptedValue: value,
                errorMessage: `The maximum length allowed is ${maxLength} characters.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle string with null bytes", () => {
            const maxLength = 5
            const validateFunc = stringMaxLen(maxLength)
            const value = "a\0b\0c"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with control characters", () => {
            const maxLength = 5
            const validateFunc = stringMaxLen(maxLength)
            const value = "a\x01b\x02c"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with surrogate pairs", () => {
            const maxLength = 4
            const validateFunc = stringMaxLen(maxLength)
            const value = "🚀🚀"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with combining characters", () => {
            const maxLength = 5
            const validateFunc = stringMaxLen(maxLength)
            const value = "e\u0301" // é with combining acute accent

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })
}) 