import { elementOf } from "../../../rules/elementOf"
import { RuleViolation } from "../../../types/ValidationRule"

describe("elementOf", () => {
  describe("validation success cases", () => {
    test("should return undefined when value is in array of numbers", () => {
      const arr = [1, 2, 3]
      const input = 3
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      expect(result).toBeUndefined()
    })

    test("should return undefined when value is in array of strings", () => {
      const arr = ["Indonesia", "India", "UK", "USA"]
      const input = "Indonesia"
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      expect(result).toBeUndefined()
    })

    test("should return undefined when value is exact object reference", () => {
      const arr = [
        { id: 1, name: "john" },
        { id: 2, name: "karen" }
      ]
      const input = arr[0] // Exact reference
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      expect(result).toBeUndefined()
    })

    test("should return undefined when value is found by reference", () => {
      const arr = [
        { id: 1, name: "john" },
        { id: 2, name: "karen" }
      ]
      const input = arr.find(x => x.id === 1)
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      expect(result).toBeUndefined()
    })

    test("should return undefined for null value when null is in array", () => {
      const arr = [1, null, 3]
      const input = null
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      expect(result).toBeUndefined()
    })

    test("should return undefined for undefined value when undefined is in array", () => {
      const arr = [1, undefined, 3]
      const input = undefined
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      expect(result).toBeUndefined()
    })

    test("should return undefined for empty array", () => {
      const arr: number[] = []
      const input = 1
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      const expected: RuleViolation = {
        ruleName: elementOf.name,
        attemptedValue: input,
        errorMessage: `The value '1' is not an element of [].`
      }
      expect(result).toEqual(expected)
    })
  })

  describe("validation failure cases", () => {
    test("should return violation with default error message for number not in array", () => {
      const arr = [1, 2, 3]
      const input = 4
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      const expected: RuleViolation = {
        ruleName: elementOf.name,
        attemptedValue: input,
        errorMessage: `The value '4' is not an element of [1, 2, 3].`
      }
      expect(result).toEqual(expected)
    })

    test("should return violation with custom error message for number not in array", () => {
      const arr = [1, 2, 3]
      const input = 4
      const customErrorMessage = "Wrong guess."
      const validateFunc = elementOf(arr, customErrorMessage)

      const result = validateFunc(input, {})

      const expected: RuleViolation = {
        ruleName: elementOf.name,
        attemptedValue: input,
        errorMessage: customErrorMessage
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for string not in array", () => {
      const arr = ["Indonesia", "India", "UK", "USA"]
      const input = "Canada"
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      const expected: RuleViolation = {
        ruleName: elementOf.name,
        attemptedValue: input,
        errorMessage: `The value 'Canada' is not an element of [Indonesia, India, UK, USA].`
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for object with same properties but different reference", () => {
      const arr = [
        { id: 1, name: "john" },
        { id: 2, name: "karen" }
      ]
      const input = { id: 1, name: "john" } // Same properties but different reference
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      const expected: RuleViolation = {
        ruleName: elementOf.name,
        attemptedValue: input,
        errorMessage: `The value '{"id":1,"name":"john"}' is not an element of [[object Object], [object Object]].`
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for null when null is not in array", () => {
      const arr = [1, 2, 3]
      const input = null
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      const expected: RuleViolation = {
        ruleName: elementOf.name,
        attemptedValue: input,
        errorMessage: `The value 'null' is not an element of [1, 2, 3].`
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for undefined when undefined is not in array", () => {
      const arr = [1, 2, 3]
      const input = undefined
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      const expected: RuleViolation = {
        ruleName: elementOf.name,
        attemptedValue: input,
        errorMessage: `The value 'undefined' is not an element of [1, 2, 3].`
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for empty string when not in array", () => {
      const arr = ["hello", "world"]
      const input = ""
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      const expected: RuleViolation = {
        ruleName: elementOf.name,
        attemptedValue: input,
        errorMessage: `The value '' is not an element of [hello, world].`
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for boolean when not in array", () => {
      const arr = [1, 2, 3]
      const input = 5
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      const expected: RuleViolation = {
        ruleName: elementOf.name,
        attemptedValue: input,
        errorMessage: `The value '5' is not an element of [1, 2, 3].`
      }
      expect(result).toEqual(expected)
    })

    test("should return violation for zero when not in array", () => {
      const arr = [1, 2, 3]
      const input = 0
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      const expected: RuleViolation = {
        ruleName: elementOf.name,
        attemptedValue: input,
        errorMessage: `The value '0' is not an element of [1, 2, 3].`
      }
      expect(result).toEqual(expected)
    })
  })

  describe("error handling", () => {
    test("should throw error when first parameter is not an array", () => {
      const badInput = "not array" as any

      expect(() => elementOf(badInput)).toThrow(
        new Error(`${elementOf.name}: Expected an array but received string.`)
      )
    })

    test("should throw error when first parameter is null", () => {
      const badInput = null as any

      expect(() => elementOf(badInput)).toThrow(
        new Error(`${elementOf.name}: Expected an array but received object.`)
      )
    })

    test("should throw error when first parameter is undefined", () => {
      const badInput = undefined as any

      expect(() => elementOf(badInput)).toThrow(
        new Error(`${elementOf.name}: Expected an array but received undefined.`)
      )
    })

    test("should throw error when first parameter is a number", () => {
      const badInput = 123 as any

      expect(() => elementOf(badInput)).toThrow(
        new Error(`${elementOf.name}: Expected an array but received number.`)
      )
    })

    test("should throw error when first parameter is an object", () => {
      const badInput = {} as any

      expect(() => elementOf(badInput)).toThrow(
        new Error(`${elementOf.name}: Expected an array but received object.`)
      )
    })
  })

  describe("edge cases", () => {
    test("should handle array with mixed types", () => {
      const arr = [1, "string", true, null, undefined]
      const input = "string"
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      expect(result).toBeUndefined()
    })

    test("should handle array with duplicate values", () => {
      const arr = [1, 2, 2, 3]
      const input = 2
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      expect(result).toBeUndefined()
    })

    test("should handle nested arrays", () => {
      const arr = [[1, 2], [3, 4]]
      const input = [1, 2]
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      const expected: RuleViolation = {
        ruleName: elementOf.name,
        attemptedValue: input,
        errorMessage: `The value '[1,2]' is not an element of [1,2, 3,4].`
      }
      expect(result).toEqual(expected)
    })

    test("should handle function in array", () => {
      const testFunc = () => {}
      const arr = [testFunc]
      const input = testFunc
      const validateFunc = elementOf(arr)

      const result = validateFunc(input, {})

      expect(result).toBeUndefined()
    })
  })
}) 