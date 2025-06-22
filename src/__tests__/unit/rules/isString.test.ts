import { isString } from "../../../rules/isString"
import { RuleViolation } from "../../../types/ValidationRule"

describe("isString", () => {
  describe("valid cases", () => {
    test("should pass for valid string", () => {
      const validateFunc = isString()
      const value = "hello world"
      
      const result = validateFunc(value, {})
      
      expect(result).toBeUndefined()
    })

    test("should pass for empty string", () => {
      const validateFunc = isString()
      const value = ""
      
      const result = validateFunc(value, {})
      
      expect(result).toBeUndefined()
    })

    test("should pass for whitespace string", () => {
      const validateFunc = isString()
      const value = "   "
      
      const result = validateFunc(value, {})
      
      expect(result).toBeUndefined()
    })

    test("should pass for string with special characters", () => {
      const validateFunc = isString()
      const value = "!@#$%^&*()_+-=[]{}|;':\",./<>?"
      
      const result = validateFunc(value, {})
      
      expect(result).toBeUndefined()
    })

    test("should pass for string with numbers", () => {
      const validateFunc = isString()
      const value = "12345"
      
      const result = validateFunc(value, {})
      
      expect(result).toBeUndefined()
    })

    test("should pass for string with unicode characters", () => {
      const validateFunc = isString()
      const value = "🚀🌟🎉"
      
      const result = validateFunc(value, {})
      
      expect(result).toBeUndefined()
    })

    test("should pass for string created from Date.toString()", () => {
      const validateFunc = isString()
      const value = new Date().toString()
      
      const result = validateFunc(value, {})
      
      expect(result).toBeUndefined()
    })

    test("should pass for string created from String constructor", () => {
      const validateFunc = isString()
      const value = String(123)
      
      const result = validateFunc(value, {})
      
      expect(result).toBeUndefined()
    })
  })

  describe("invalid cases", () => {
    test("should fail for null with default error message", () => {
      const validateFunc = isString()
      const value = null
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for undefined with default error message", () => {
      const validateFunc = isString()
      const value = undefined
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for number with default error message", () => {
      const validateFunc = isString()
      const value = 42
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for zero with default error message", () => {
      const validateFunc = isString()
      const value = 0
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for negative number with default error message", () => {
      const validateFunc = isString()
      const value = -42
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for decimal number with default error message", () => {
      const validateFunc = isString()
      const value = 3.14
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for NaN with default error message", () => {
      const validateFunc = isString()
      const value = NaN
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for Infinity with default error message", () => {
      const validateFunc = isString()
      const value = Infinity
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for boolean true with default error message", () => {
      const validateFunc = isString()
      const value = true
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for boolean false with default error message", () => {
      const validateFunc = isString()
      const value = false
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for empty object with default error message", () => {
      const validateFunc = isString()
      const value = {}
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for non-empty object with default error message", () => {
      const validateFunc = isString()
      const value = { key: "value" }
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for empty array with default error message", () => {
      const validateFunc = isString()
      const value: any[] = []
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for non-empty array with default error message", () => {
      const validateFunc = isString()
      const value = [1, 2, 3]
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for Date object with default error message", () => {
      const validateFunc = isString()
      const value = new Date()
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for invalid Date with default error message", () => {
      const validateFunc = isString()
      const value = new Date("invalid")
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for function with default error message", () => {
      const validateFunc = isString()
      const value = () => {}
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for Symbol with default error message", () => {
      const validateFunc = isString()
      const value = Symbol("test")
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail for BigInt with default error message", () => {
      const validateFunc = isString()
      const value = BigInt(123)
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })
  })

  describe("custom error message", () => {
    test("should fail with custom error message for null", () => {
      const customErrorMessage = "Custom error message"
      const validateFunc = isString(customErrorMessage)
      const value = null
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: customErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail with custom error message for number", () => {
      const customErrorMessage = "Value must be a string"
      const validateFunc = isString(customErrorMessage)
      const value = 42
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: customErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should fail with custom error message for object", () => {
      const customErrorMessage = "Invalid string type"
      const validateFunc = isString(customErrorMessage)
      const value = { test: "value" }
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: customErrorMessage
      }
      expect(result).toEqual(expected)
    })
  })

  describe("edge cases", () => {
    test("should pass for string with only spaces and tabs", () => {
      const validateFunc = isString()
      const value = " \t \n \r "
      
      const result = validateFunc(value, {})
      
      expect(result).toBeUndefined()
    })

    test("should pass for string with null bytes", () => {
      const validateFunc = isString()
      const value = "hello\u0000world"
      
      const result = validateFunc(value, {})
      
      expect(result).toBeUndefined()
    })

    test("should pass for very long string", () => {
      const validateFunc = isString()
      const value = "a".repeat(10000)
      
      const result = validateFunc(value, {})
      
      expect(result).toBeUndefined()
    })

    test("should handle object with toString method", () => {
      const validateFunc = isString()
      const value = {
        toString: () => "string representation"
      }
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should handle object with valueOf method", () => {
      const validateFunc = isString()
      const value = {
        valueOf: () => "primitive value"
      }
      const expectedErrorMessage = `This field is not a valid string, type of value was: ${typeof value}.`
      
      const result = validateFunc(value, {})
      
      const expected: RuleViolation = {
        ruleName: isString.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })
  })
}) 