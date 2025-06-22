import { required } from "../../../rules/required"
import { RuleViolation } from "../../../types/ValidationRule"

describe("required", () => {
    const defaultErrorMessage = "This field is required."

    describe("invalid values", () => {
        test("should return violation for null value", () => {
            const validateFunc = required()
            const value = null

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for undefined value", () => {
            const validateFunc = required()
            const value = undefined

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for empty string", () => {
            const validateFunc = required()
            const value = ""

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for whitespace string", () => {
            const validateFunc = required()
            const value = "   "

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for tab-only string", () => {
            const validateFunc = required()
            const value = "\t"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for newline-only string", () => {
            const validateFunc = required()
            const value = "\n"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for mixed whitespace string", () => {
            const validateFunc = required()
            const value = " \t\n "

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for empty array", () => {
            const validateFunc = required()
            const value = []

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for empty object", () => {
            const validateFunc = required()
            const value = {}

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for NaN", () => {
            const validateFunc = required()
            const value = NaN

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for invalid date", () => {
            const validateFunc = required()
            const value = new Date("invalid date")

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation with custom error message", () => {
            const customErrorMessage = "Empty object treated as invalid"
            const validateFunc = required(customErrorMessage)
            const value = {}

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })
    })

    describe("valid values", () => {
        test("should return undefined for zero string", () => {
            const validateFunc = required()
            const value = "0"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for zero number", () => {
            const validateFunc = required()
            const value = 0

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for false boolean", () => {
            const validateFunc = required()
            const value = false

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for true boolean", () => {
            const validateFunc = required()
            const value = true

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for non-empty array", () => {
            const validateFunc = required()
            const value = [1]

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for array with multiple items", () => {
            const validateFunc = required()
            const value = [1, 2, 3]

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for array with empty string", () => {
            const validateFunc = required()
            const value = [""]

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for positive number", () => {
            const validateFunc = required()
            const value = 1

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for negative number", () => {
            const validateFunc = required()
            const value = -1

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for decimal number", () => {
            const validateFunc = required()
            const value = 3.14

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for non-empty object", () => {
            const validateFunc = required()
            const value = { number: 1 }

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for object with empty string property", () => {
            const validateFunc = required()
            const value = { empty: "" }

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for object with null property", () => {
            const validateFunc = required()
            const value = { nullProp: null }

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for valid date", () => {
            const validateFunc = required()
            const value = new Date()

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for date string", () => {
            const validateFunc = required()
            const value = "2023-01-01"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for non-whitespace string", () => {
            const validateFunc = required()
            const value = "hello"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for string with leading/trailing whitespace", () => {
            const validateFunc = required()
            const value = " hello "

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for function", () => {
            const validateFunc = required()
            const value = () => {}

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for symbol", () => {
            const validateFunc = required()
            const value = Symbol("test")

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for bigint", () => {
            const validateFunc = required()
            const value = BigInt(123)

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for infinity", () => {
            const validateFunc = required()
            const value = Infinity

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for negative infinity", () => {
            const validateFunc = required()
            const value = -Infinity

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })

    describe("edge cases", () => {
        test("should handle object with only undefined properties", () => {
            const validateFunc = required()
            const value = { prop: undefined }

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle object with only null properties", () => {
            const validateFunc = required()
            const value = { prop: null }

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle object with only empty string properties", () => {
            const validateFunc = required()
            const value = { prop: "" }

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle object with only whitespace properties", () => {
            const validateFunc = required()
            const value = { prop: "   " }

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle array with only null values", () => {
            const validateFunc = required()
            const value = [null]

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle array with only undefined values", () => {
            const validateFunc = required()
            const value = [undefined]

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle array with only empty strings", () => {
            const validateFunc = required()
            const value = [""]

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle array with only whitespace strings", () => {
            const validateFunc = required()
            const value = ["   "]

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle very long string", () => {
            const validateFunc = required()
            const value = "a".repeat(10000)

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle very long string with only whitespace", () => {
            const validateFunc = required()
            const value = " ".repeat(10000)

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: required.name,
                attemptedValue: value,
                errorMessage: defaultErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should handle object with many properties", () => {
            const validateFunc = required()
            const value = { a: 1, b: 2, c: 3, d: 4, e: 5 }

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle nested objects", () => {
            const validateFunc = required()
            const value = { nested: { prop: "value" } }

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle nested arrays", () => {
            const validateFunc = required()
            const value = [[1, 2], [3, 4]]

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle complex nested structure", () => {
            const validateFunc = required()
            const value = { arr: [1, 2, 3], obj: { prop: "value" } }

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })
}) 