import { isNumber } from "../../../rules/isNumber"
import { RuleViolation } from "../../../types/ValidationRule"

describe("isNumber", () => {
    describe("valid values", () => {
        test("should return undefined for positive integer", () => {
            const validateFunc = isNumber()
            const value = 42

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for negative integer", () => {
            const validateFunc = isNumber()
            const value = -42

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for zero", () => {
            const validateFunc = isNumber()
            const value = 0

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for positive float", () => {
            const validateFunc = isNumber()
            const value = 3.14

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for negative float", () => {
            const validateFunc = isNumber()
            const value = -3.14

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for Infinity", () => {
            const validateFunc = isNumber()
            const value = Infinity

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for negative Infinity", () => {
            const validateFunc = isNumber()
            const value = -Infinity

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for Number.MAX_SAFE_INTEGER", () => {
            const validateFunc = isNumber()
            const value = Number.MAX_SAFE_INTEGER

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for Number.MIN_SAFE_INTEGER", () => {
            const validateFunc = isNumber()
            const value = Number.MIN_SAFE_INTEGER

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })

    describe("invalid values", () => {
        test("should return violation for null", () => {
            const validateFunc = isNumber()
            const value = null
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for undefined", () => {
            const validateFunc = isNumber()
            const value = undefined
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for empty string", () => {
            const validateFunc = isNumber()
            const value = ""
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for whitespace string", () => {
            const validateFunc = isNumber()
            const value = "   "
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for string zero", () => {
            const validateFunc = isNumber()
            const value = "0"
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for numeric string", () => {
            const validateFunc = isNumber()
            const value = "123"
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for NaN", () => {
            const validateFunc = isNumber()
            const value = NaN
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for true boolean", () => {
            const validateFunc = isNumber()
            const value = true
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for false boolean", () => {
            const validateFunc = isNumber()
            const value = false
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for empty array", () => {
            const validateFunc = isNumber()
            const value: any[] = []
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for non-empty array", () => {
            const validateFunc = isNumber()
            const value = [1, 2, 3]
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for empty object", () => {
            const validateFunc = isNumber()
            const value = {}
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for non-empty object", () => {
            const validateFunc = isNumber()
            const value = { number: 1 }
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for Date object", () => {
            const validateFunc = isNumber()
            const value = new Date()
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for Date string", () => {
            const validateFunc = isNumber()
            const value = new Date().toISOString()
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for function", () => {
            const validateFunc = isNumber()
            const value = () => {}
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for symbol", () => {
            const validateFunc = isNumber()
            const value = Symbol("test")
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for BigInt", () => {
            const validateFunc = isNumber()
            const value = BigInt(123)
            const expectedErrorMessage = `This field is not a valid number, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })
    })

    describe("custom error message", () => {
        test("should return violation with custom error message for invalid value", () => {
            const customErrorMessage = "Custom error message"
            const validateFunc = isNumber(customErrorMessage)
            const value = "invalid"

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isNumber.name,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return undefined for valid value even with custom error message", () => {
            const customErrorMessage = "Custom error message"
            const validateFunc = isNumber(customErrorMessage)
            const value = 42

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })

    describe("edge cases", () => {
        test("should return violation for Number.MAX_VALUE", () => {
            const validateFunc = isNumber()
            const value = Number.MAX_VALUE

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return violation for Number.MIN_VALUE", () => {
            const validateFunc = isNumber()
            const value = Number.MIN_VALUE

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return violation for Number.EPSILON", () => {
            const validateFunc = isNumber()
            const value = Number.EPSILON

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return violation for Number.POSITIVE_INFINITY", () => {
            const validateFunc = isNumber()
            const value = Number.POSITIVE_INFINITY

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return violation for Number.NEGATIVE_INFINITY", () => {
            const validateFunc = isNumber()
            const value = Number.NEGATIVE_INFINITY

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })
}) 