import { isBool } from "../../../rules/isBool"
import { RuleViolation } from "../../../types/ValidationRule"

describe("isBool", () => {
  describe("valid boolean values", () => {
    test("should return undefined for true boolean", () => {
      const validateFunc = isBool()
      const value = true

      const result = validateFunc(value, {})

      expect(result).toBeUndefined()
    })

    test("should return undefined for false boolean", () => {
      const validateFunc = isBool()
      const value = false

      const result = validateFunc(value, {})

      expect(result).toBeUndefined()
    })
  })

  describe("invalid values", () => {
    test("should return violation for null", () => {
      const validateFunc = isBool()
      const value = null
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for undefined", () => {
      const validateFunc = isBool()
      const value = undefined
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for number", () => {
      const validateFunc = isBool()
      const value = 1
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for zero", () => {
      const validateFunc = isBool()
      const value = 0
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for NaN", () => {
      const validateFunc = isBool()
      const value = NaN
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for string", () => {
      const validateFunc = isBool()
      const value = "test"
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for empty string", () => {
      const validateFunc = isBool()
      const value = ""
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for 'true' string", () => {
      const validateFunc = isBool()
      const value = "true"
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for 'false' string", () => {
      const validateFunc = isBool()
      const value = "false"
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for '0' string", () => {
      const validateFunc = isBool()
      const value = "0"
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for '1' string", () => {
      const validateFunc = isBool()
      const value = "1"
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for whitespace string", () => {
      const validateFunc = isBool()
      const value = "   "
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for array", () => {
      const validateFunc = isBool()
      const value: any[] = []
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for non-empty array", () => {
      const validateFunc = isBool()
      const value = [1, 2, 3]
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for empty object", () => {
      const validateFunc = isBool()
      const value = {}
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for non-empty object", () => {
      const validateFunc = isBool()
      const value = { key: "value" }
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for Date object", () => {
      const validateFunc = isBool()
      const value = new Date()
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for invalid Date", () => {
      const validateFunc = isBool()
      const value = new Date("invalid")
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for Date string", () => {
      const validateFunc = isBool()
      const value = new Date().toString()
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for function", () => {
      const validateFunc = isBool()
      const value = () => {}
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for Symbol", () => {
      const validateFunc = isBool()
      const value = Symbol("test")
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for BigInt", () => {
      const validateFunc = isBool()
      const value = BigInt(123)
      const expectedErrorMessage = `This field is not a valid boolean, type of value was: ${typeof value}.`

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: expectedErrorMessage
      }
      expect(result).toEqual(expected)
    })
  })

  describe("custom error message", () => {
    test("should return violation with custom error message for invalid value", () => {
      const customErrorMessage = "Custom boolean error message"
      const validateFunc = isBool(customErrorMessage)
      const value = "not a boolean"

      const result = validateFunc(value, {})

      const expected: RuleViolation = {
        ruleName: isBool.name,
        attemptedValue: value,
        errorMessage: customErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return undefined for valid boolean even with custom error message", () => {
      const customErrorMessage = "Custom boolean error message"
      const validateFunc = isBool(customErrorMessage)
      const value = true

      const result = validateFunc(value, {})

      expect(result).toBeUndefined()
    })
  })

  describe("function behavior", () => {
    test("should return a function when called", () => {
      const result = isBool()

      expect(typeof result).toBe("function")
    })

    test("should return a function when called with custom error message", () => {
      const result = isBool("Custom message")

      expect(typeof result).toBe("function")
    })
  })
}) 