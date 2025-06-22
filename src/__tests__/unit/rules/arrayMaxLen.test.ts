import { arrayMaxLen } from "../../../rules/arrayMaxLen"
import { RuleViolation } from "../../../types/ValidationRule"

describe("arrayMaxLen", () => {
  // Test data for reuse
  const validEmptyArray: number[] = []
  const validShortArray = [1, 2]
  const validLongArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const testObject = { context: "test" }

  describe("Rule constructor", () => {
    test("should create rule with valid positive maxLen", () => {
      expect(() => arrayMaxLen(5)).not.toThrow()
      expect(() => arrayMaxLen(100)).not.toThrow()
      expect(() => arrayMaxLen(1)).not.toThrow()
    })

    test("should create rule with zero maxLen", () => {
      expect(() => arrayMaxLen(0)).not.toThrow()
    })

    test("should throw error for negative maxLen", () => {
      const negativeValues = [-1, -5, -100]
      
      negativeValues.forEach(maxLen => {
        const expectedError = new Error(
          `${arrayMaxLen.name}: The maximum length should be non negative and positive number. Your input was: ${maxLen}`
        )
        expect(() => arrayMaxLen(maxLen)).toThrow(expectedError)
      })
    })

    test("should throw error for floating point negative maxLen", () => {
      const maxLen = -0.5
      const expectedError = new Error(
        `${arrayMaxLen.name}: The maximum length should be non negative and positive number. Your input was: ${maxLen}`
      )
      expect(() => arrayMaxLen(maxLen)).toThrow(expectedError)
    })
  })

  describe("Rule execution - null and undefined handling", () => {
    test("should pass validation for null input", () => {
      const validator = arrayMaxLen(2)
      const result = validator(null, testObject)

      expect(result).toBeUndefined()
    })

    test("should pass validation for undefined input", () => {
      const validator = arrayMaxLen(2)
      const result = validator(undefined, testObject)

      expect(result).toBeUndefined()
    })

    test("should pass validation for null input with zero maxLen", () => {
      const validator = arrayMaxLen(0)
      const result = validator(null, testObject)

      expect(result).toBeUndefined()
    })

    test("should pass validation for undefined input with zero maxLen", () => {
      const validator = arrayMaxLen(0)
      const result = validator(undefined, testObject)

      expect(result).toBeUndefined()
    })
  })

  describe("Rule execution - invalid input types", () => {
    test("should throw error for string input", () => {
      const validator = arrayMaxLen(2)
      const invalidInput = "not an array" as any
      const expectedError = new Error(
        `${arrayMaxLen.name}: Expected an array but received ${typeof invalidInput}.`
      )

      expect(() => validator(invalidInput, testObject)).toThrow(expectedError)
    })

    test("should throw error for number input", () => {
      const validator = arrayMaxLen(2)
      const invalidInput = 42 as any
      const expectedError = new Error(
        `${arrayMaxLen.name}: Expected an array but received ${typeof invalidInput}.`
      )

      expect(() => validator(invalidInput, testObject)).toThrow(expectedError)
    })

    test("should throw error for boolean input", () => {
      const validator = arrayMaxLen(2)
      const invalidInput = true as any
      const expectedError = new Error(
        `${arrayMaxLen.name}: Expected an array but received ${typeof invalidInput}.`
      )

      expect(() => validator(invalidInput, testObject)).toThrow(expectedError)
    })

    test("should throw error for object input", () => {
      const validator = arrayMaxLen(2)
      const invalidInput = { length: 1 } as any
      const expectedError = new Error(
        `${arrayMaxLen.name}: Expected an array but received ${typeof invalidInput}.`
      )

      expect(() => validator(invalidInput, testObject)).toThrow(expectedError)
    })

    test("should throw error for function input", () => {
      const validator = arrayMaxLen(2)
      const invalidInput = (() => {}) as any
      const expectedError = new Error(
        `${arrayMaxLen.name}: Expected an array but received ${typeof invalidInput}.`
      )

      expect(() => validator(invalidInput, testObject)).toThrow(expectedError)
    })
  })

  describe("Rule execution - valid arrays", () => {
    test("should pass validation when array length equals maxLen", () => {
      const maxLen = 3
      const validator = arrayMaxLen(maxLen)
      const inputArray = [1, 2, 3]
      const result = validator(inputArray, testObject)

      expect(result).toBeUndefined()
    })

    test("should pass validation when array length is less than maxLen", () => {
      const maxLen = 5
      const validator = arrayMaxLen(maxLen)
      const result = validator(validShortArray, testObject)

      expect(result).toBeUndefined()
    })

    test("should pass validation when array is empty and maxLen is 0", () => {
      const validator = arrayMaxLen(0)
      const result = validator(validEmptyArray, testObject)

      expect(result).toBeUndefined()
    })

    test("should pass validation when array is empty and maxLen is positive", () => {
      const validator = arrayMaxLen(5)
      const result = validator(validEmptyArray, testObject)

      expect(result).toBeUndefined()
    })

    test("should pass validation for single element array when maxLen is 1", () => {
      const validator = arrayMaxLen(1)
      const singleElementArray = [42]
      const result = validator(singleElementArray, testObject)

      expect(result).toBeUndefined()
    })

    test("should pass validation for arrays with mixed data types", () => {
      const validator = arrayMaxLen(5)
      const mixedArray = ["string", 123, true, null]
      const result = validator(mixedArray, testObject)

      expect(result).toBeUndefined()
    })
  })

  describe("Rule execution - invalid arrays (violations)", () => {
    test("should return violation when array length exceeds maxLen", () => {
      const maxLen = 2
      const validator = arrayMaxLen<number, typeof testObject>(maxLen)
      const inputArray = [1, 2, 3]
      const result = validator(inputArray, testObject)

      const expectedViolation: RuleViolation = {
        ruleName: arrayMaxLen.name,
        attemptedValue: inputArray,
        errorMessage: `The maximum length for this field is ${maxLen}.`
      }

      expect(result).toEqual(expectedViolation)
    })

    test("should return violation when single element array exceeds maxLen of 0", () => {
      const maxLen = 0
      const validator = arrayMaxLen(maxLen)
      const inputArray = [1]
      const result = validator(inputArray, testObject)

      const expectedViolation: RuleViolation = {
        ruleName: arrayMaxLen.name,
        attemptedValue: inputArray,
        errorMessage: `The maximum length for this field is ${maxLen}.`
      }

      expect(result).toEqual(expectedViolation)
    })

    test("should return violation when array significantly exceeds maxLen", () => {
      const maxLen = 2
      const validator = arrayMaxLen(maxLen)
      const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const result = validator(inputArray, testObject)

      const expectedViolation: RuleViolation = {
        ruleName: arrayMaxLen.name,
        attemptedValue: inputArray,
        errorMessage: `The maximum length for this field is ${maxLen}.`
      }

      expect(result).toEqual(expectedViolation)
    })

    test("should return violation with custom error message", () => {
      const maxLen = 2
      const customMessage = "Custom error: array too long!"
      const validator = arrayMaxLen<number, typeof testObject>(maxLen, customMessage)
      const inputArray = [1, 2, 3, 4]
      const result = validator(inputArray, testObject)

      const expectedViolation: RuleViolation = {
        ruleName: arrayMaxLen.name,
        attemptedValue: inputArray,
        errorMessage: customMessage
      }

      expect(result).toEqual(expectedViolation)
    })

    test("should return violation with interpolated custom error message", () => {
      const maxLen = 3
      const customMessage = `Maximum allowed length is ${maxLen} items`
      const validator = arrayMaxLen<string, typeof testObject>(maxLen, customMessage)
      const inputArray = ["a", "b", "c", "d", "e"]
      const result = validator(inputArray, testObject)

      const expectedViolation: RuleViolation = {
        ruleName: arrayMaxLen.name,
        attemptedValue: inputArray,
        errorMessage: customMessage
      }

      expect(result).toEqual(expectedViolation)
    })
  })

  describe("Rule execution - edge cases", () => {
    test("should handle very large arrays", () => {
      const maxLen = 1000
      const validator = arrayMaxLen(maxLen)
      const largeArray = new Array(1001).fill("item")
      const result = validator(largeArray, testObject)

      expect(result).toBeDefined()
      expect(result?.ruleName).toBe(arrayMaxLen.name)
      expect(result?.attemptedValue).toBe(largeArray)
    })

    test("should handle arrays with complex objects", () => {
      const maxLen = 2
      const validator = arrayMaxLen(maxLen)
      const complexArray = [
        { id: 1, nested: { data: "test" } },
        { id: 2, nested: { data: "test2" } },
        { id: 3, nested: { data: "test3" } }
      ]
      const result = validator(complexArray, testObject)

      expect(result).toBeDefined()
      expect(result?.attemptedValue).toBe(complexArray)
    })

    test("should handle sparse arrays", () => {
      const maxLen = 2
      const validator = arrayMaxLen(maxLen)
      const sparseArray = [1, , , 4] // length is 4, but has undefined elements
      const result = validator(sparseArray, testObject)

      expect(result).toBeDefined()
      expect(result?.attemptedValue).toBe(sparseArray)
    })

    test("should handle arrays with all falsy values", () => {
      const maxLen = 3
      const validator = arrayMaxLen(maxLen)
      const falsyArray = [false, 0, "", null, undefined, NaN]
      const result = validator(falsyArray, testObject)

      expect(result).toBeDefined()
      expect(result?.attemptedValue).toBe(falsyArray)
    })

    test("should handle extremely large maxLen values", () => {
      const maxLen = Number.MAX_SAFE_INTEGER
      const validator = arrayMaxLen(maxLen)
      const smallArray = [1, 2, 3]
      const result = validator(smallArray, testObject)

      expect(result).toBeUndefined()
    })

    test("should handle floating point maxLen values", () => {
      const maxLen = 2.9 // Should be treated as 2.9
      const validator = arrayMaxLen(maxLen)
      const inputArray = [1, 2, 3] // length 3 > 2.9
      const result = validator(inputArray, testObject)

      expect(result).toBeDefined()
      expect(result?.ruleName).toBe(arrayMaxLen.name)
    })
  })

  describe("Rule execution - boundary conditions", () => {
    test("should handle exactly at boundary - valid case", () => {
      const maxLen = 5
      const validator = arrayMaxLen(maxLen)
      const boundaryArray = [1, 2, 3, 4, 5] // exactly maxLen
      const result = validator(boundaryArray, testObject)

      expect(result).toBeUndefined()
    })

    test("should handle exactly at boundary + 1 - invalid case", () => {
      const maxLen = 5
      const validator = arrayMaxLen(maxLen)
      const boundaryArray = [1, 2, 3, 4, 5, 6] // exactly maxLen + 1
      const result = validator(boundaryArray, testObject)

      expect(result).toBeDefined()
      expect(result?.ruleName).toBe(arrayMaxLen.name)
    })

    test("should handle zero-length array with maxLen 1", () => {
      const maxLen = 1
      const validator = arrayMaxLen(maxLen)
      const result = validator(validEmptyArray, testObject)

      expect(result).toBeUndefined()
    })
  })

  describe("Rule execution - type safety", () => {
    test("should preserve type information in violation", () => {
      const maxLen = 1
      const validator = arrayMaxLen<string, typeof testObject>(maxLen)
      const stringArray = ["a", "b"]
      const result = validator(stringArray, testObject)

      expect(result).toBeDefined()
      expect(result?.attemptedValue).toBe(stringArray)
      expect(Array.isArray(result?.attemptedValue)).toBe(true)
    })

    test("should work with different object context types", () => {
      const complexContext = { 
        user: { id: 1, name: "test" }, 
        metadata: { version: "1.0" } 
      }
      const validator = arrayMaxLen<number, typeof complexContext>(2)
      const inputArray = [1, 2, 3]
      const result = validator(inputArray, complexContext)

      expect(result).toBeDefined()
      expect(result?.attemptedValue).toBe(inputArray)
    })
  })
}) 