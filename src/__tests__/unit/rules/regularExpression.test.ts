import { regularExpression } from "../../../rules/regularExpression"
import { RuleViolation } from "../../../types/ValidationRule"

describe("regularExpression", () => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])([A-Za-z\d]|[^a-zA-Z\d]){8,}$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const simpleRegex = /^[A-Z]+$/

    describe("validation failures", () => {
        test("should return violation with default error message when value doesn't match regex", () => {
            const validateFunc = regularExpression(strongPasswordRegex)
            const value = "Hallo"
            const expectedErrorMessage = `The value '${value}' doesn't match with the specified regular expression.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: regularExpression.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation with custom error message", () => {
            const customErrorMessage = "Invalid value"
            const validateFunc = regularExpression(strongPasswordRegex, regularExpression.name, customErrorMessage)
            const value = "cumaMisCall1"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: regularExpression.name,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation with custom rule name", () => {
            const customRuleName = "passwordValidation"
            const validateFunc = regularExpression(strongPasswordRegex, customRuleName)
            const value = "weak"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: customRuleName,
                attemptedValue: value,
                errorMessage: `The value '${value}' doesn't match with the specified regular expression.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle empty string that doesn't match regex", () => {
            const validateFunc = regularExpression(simpleRegex)
            const value = ""

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: regularExpression.name,
                attemptedValue: value,
                errorMessage: `The value '${value}' doesn't match with the specified regular expression.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle whitespace string that doesn't match regex", () => {
            const validateFunc = regularExpression(simpleRegex)
            const value = "   "

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: regularExpression.name,
                attemptedValue: value,
                errorMessage: `The value '${value}' doesn't match with the specified regular expression.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle special characters in value", () => {
            const validateFunc = regularExpression(emailRegex)
            const value = "test@domain"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: regularExpression.name,
                attemptedValue: value,
                errorMessage: `The value '${value}' doesn't match with the specified regular expression.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle complex regex patterns", () => {
            const complexRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            const validateFunc = regularExpression(complexRegex)
            const value = "password"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: regularExpression.name,
                attemptedValue: value,
                errorMessage: `The value '${value}' doesn't match with the specified regular expression.`
            }
            expect(result).toEqual(expected)
        })
    })

    describe("validation successes", () => {
        test("should return undefined when value matches regex", () => {
            const validateFunc = regularExpression(strongPasswordRegex)
            const value = "ThisIsStrongPassword123.,"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined when value matches simple regex", () => {
            const validateFunc = regularExpression(simpleRegex)
            const value = "ABC"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined when value matches email regex", () => {
            const validateFunc = regularExpression(emailRegex)
            const value = "test@domain.com"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined when value matches complex regex", () => {
            const complexRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
            const validateFunc = regularExpression(complexRegex)
            const value = "Password123"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle single character that matches regex", () => {
            const validateFunc = regularExpression(simpleRegex)
            const value = "A"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle very long string that matches regex", () => {
            const validateFunc = regularExpression(simpleRegex)
            const value = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })

    describe("edge cases", () => {
        test("should handle regex with anchors", () => {
            const anchoredRegex = /^test$/
            const validateFunc = regularExpression(anchoredRegex)
            const value = "test"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle regex with quantifiers", () => {
            const quantifierRegex = /a{2,4}/
            const validateFunc = regularExpression(quantifierRegex)
            const value = "aaa"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle regex with character classes", () => {
            const charClassRegex = /[a-zA-Z0-9]+/
            const validateFunc = regularExpression(charClassRegex)
            const value = "abc123"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle regex with lookaheads", () => {
            const lookaheadRegex = /(?=.*[A-Z])[a-zA-Z]+/
            const validateFunc = regularExpression(lookaheadRegex)
            const value = "TestString"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle regex with escaped characters", () => {
            const escapedRegex = /test\.com/
            const validateFunc = regularExpression(escapedRegex)
            const value = "test.com"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle regex with unicode characters", () => {
            const unicodeRegex = /[\u0041-\u005A]+/
            const validateFunc = regularExpression(unicodeRegex)
            const value = "ABC"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle regex with flags", () => {
            const caseInsensitiveRegex = /test/i
            const validateFunc = regularExpression(caseInsensitiveRegex)
            const value = "TEST"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle regex with global flag", () => {
            const globalRegex = /test/g
            const validateFunc = regularExpression(globalRegex)
            const value = "test"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })

    describe("parameter combinations", () => {
        test("should work with only regex parameter", () => {
            const validateFunc = regularExpression(simpleRegex)
            const value = "ABC"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should work with regex and custom rule name", () => {
            const customRuleName = "customRule"
            const validateFunc = regularExpression(simpleRegex, customRuleName)
            const value = "ABC"

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should work with regex and custom error message", () => {
            const customErrorMessage = "Custom error"
            const validateFunc = regularExpression(simpleRegex, undefined, customErrorMessage)
            const value = "abc"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: regularExpression.name,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should work with all parameters", () => {
            const customRuleName = "customRule"
            const customErrorMessage = "Custom error"
            const validateFunc = regularExpression(simpleRegex, customRuleName, customErrorMessage)
            const value = "abc"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: customRuleName,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })
    })
}) 