import { isDateObject } from "../../../rules/isDateObject"
import { RuleViolation } from "../../../types/ValidationRule"

describe("isDateObject", () => {
    describe("valid cases", () => {
        test("should return undefined for valid Date object", () => {
            const validateFunc = isDateObject()
            const validDate = new Date()

            const result = validateFunc(validDate, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for valid Date object created from ISO string", () => {
            const validateFunc = isDateObject()
            const dateString = new Date().toISOString()
            const validDate = new Date(dateString)

            const result = validateFunc(validDate, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for valid Date object with custom error message", () => {
            const customErrorMessage = "Custom error message"
            const validateFunc = isDateObject(customErrorMessage)
            const validDate = new Date()

            const result = validateFunc(validDate, {})

            expect(result).toBeUndefined()
        })
    })

    describe("invalid cases", () => {
        test("should return violation for null with default error message", () => {
            const validateFunc = isDateObject()
            const value = null
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for undefined with default error message", () => {
            const validateFunc = isDateObject()
            const value = undefined
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for empty string with default error message", () => {
            const validateFunc = isDateObject()
            const value = ""
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for empty array with default error message", () => {
            const validateFunc = isDateObject()
            const value: any[] = []
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for empty object with default error message", () => {
            const validateFunc = isDateObject()
            const value = {}
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for empty object with custom error message", () => {
            const customErrorMessage = "Invalid date."
            const validateFunc = isDateObject(customErrorMessage)
            const value = {}

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for NaN with default error message", () => {
            const validateFunc = isDateObject()
            const value = NaN
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for invalid Date object with custom error message", () => {
            const customErrorMessage = "Date is invalid"
            const validateFunc = isDateObject(customErrorMessage)
            const value = new Date("invalid date")

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for invalid Date object with default error message", () => {
            const validateFunc = isDateObject()
            const value = new Date("invalid date")
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for whitespace string with default error message", () => {
            const validateFunc = isDateObject()
            const value = "   "
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for zero string with default error message", () => {
            const validateFunc = isDateObject()
            const value = "0"
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for false boolean with default error message", () => {
            const validateFunc = isDateObject()
            const value = false
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for true boolean with default error message", () => {
            const validateFunc = isDateObject()
            const value = true
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for number with default error message", () => {
            const validateFunc = isDateObject()
            const value = 1
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for object with default error message", () => {
            const validateFunc = isDateObject()
            const value = { number: 1 }
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for date string (toDateString) with default error message", () => {
            const validateFunc = isDateObject()
            const value = new Date().toDateString()
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for date string (toISOString) with default error message", () => {
            const validateFunc = isDateObject()
            const value = new Date().toISOString()
            const expectedErrorMessage = `This field is not a valid date, type of value was: ${typeof value}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for date string with custom error message", () => {
            const customErrorMessage = "Must be a Date object, not a string"
            const validateFunc = isDateObject(customErrorMessage)
            const value = new Date().toISOString()

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: isDateObject.name,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })
    })
}) 