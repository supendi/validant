import { maxNumber } from "../../../rules/maxNumber"
import { RuleViolation } from "../../../types/ValidationRule"

describe("maxNumber", () => {
    describe("when value is within maximum limit", () => {
        test("should return undefined for value equal to maximum", () => {
            const maxValue = 5
            const validateFunc = maxNumber(maxValue)
            const value = 5

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for value less than maximum", () => {
            const maxValue = 10
            const validateFunc = maxNumber(maxValue)
            const value = 3

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for negative value within limit", () => {
            const maxValue = 0
            const validateFunc = maxNumber(maxValue)
            const value = -5

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for zero value", () => {
            const maxValue = 0
            const validateFunc = maxNumber(maxValue)
            const value = 0

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for bigint value within limit", () => {
            const maxValue = 100
            const validateFunc = maxNumber(maxValue)
            const value = BigInt(50) as any as number

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })

    describe("when value exceeds maximum limit", () => {
        test("should return violation with default error message", () => {
            const maxValue = 5
            const validateFunc = maxNumber(maxValue)
            const value = 10
            const expectedErrorMessage = `The maximum value for this field is ${maxValue}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: maxNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation with custom error message", () => {
            const maxValue = 1
            const customErrorMessage = `Maximum order for this item is ${maxValue}.`
            const validateFunc = maxNumber(maxValue, customErrorMessage)
            const value = 2

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: maxNumber.name,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation for value equal to maximum + 1", () => {
            const maxValue = 100
            const validateFunc = maxNumber(maxValue)
            const value = 101

            const result = validateFunc(value, {})

            expect(result).toBeDefined()
            expect(result?.ruleName).toBe(maxNumber.name)
            expect(result?.attemptedValue).toBe(value)
        })

        test("should return violation for bigint value exceeding limit", () => {
            const maxValue = 50
            const validateFunc = maxNumber(maxValue)
            const value = BigInt(100) as any as number

            const result = validateFunc(value, {})

            expect(result).toBeDefined()
            expect(result?.ruleName).toBe(maxNumber.name)
            expect(result?.attemptedValue).toBe(value)
        })

        test("should return violation for negative value exceeding negative maximum", () => {
            const maxValue = -10
            const validateFunc = maxNumber(maxValue)
            const value = -5

            const result = validateFunc(value, {})

            expect(result).toBeDefined()
            expect(result?.ruleName).toBe(maxNumber.name)
            expect(result?.attemptedValue).toBe(value)
        })
    })

    describe("when value is not a number", () => {
        test("should throw error for string value", () => {
            const maxValue = 100
            const validateFunc = maxNumber(maxValue)
            const badInput = "1" as any as number

            const actual = () => validateFunc(badInput, {})
            const expectedMessage = `${maxNumber.name}: Value is not a number. The value was: ${badInput} (type: '${typeof badInput}')`

            expect(actual).toThrow(new Error(expectedMessage))
        })

        test("should throw error for boolean value", () => {
            const maxValue = 100
            const validateFunc = maxNumber(maxValue)
            const badInput = true as any as number

            const actual = () => validateFunc(badInput, {})
            const expectedMessage = `${maxNumber.name}: Value is not a number. The value was: ${badInput} (type: '${typeof badInput}')`

            expect(actual).toThrow(new Error(expectedMessage))
        })

        test("should throw error for null value", () => {
            const maxValue = 100
            const validateFunc = maxNumber(maxValue)
            const badInput = null as any as number

            const actual = () => validateFunc(badInput, {})
            const expectedMessage = `${maxNumber.name}: Value is not a number. The value was: ${badInput} (type: '${typeof badInput}')`

            expect(actual).toThrow(new Error(expectedMessage))
        })

        test("should throw error for undefined value", () => {
            const maxValue = 100
            const validateFunc = maxNumber(maxValue)
            const badInput = undefined as any as number

            const actual = () => validateFunc(badInput, {})
            const expectedMessage = `${maxNumber.name}: Value is not a number. The value was: ${badInput} (type: '${typeof badInput}')`

            expect(actual).toThrow(new Error(expectedMessage))
        })

        test("should throw error for object value", () => {
            const maxValue = 100
            const validateFunc = maxNumber(maxValue)
            const badInput = {} as any as number

            const actual = () => validateFunc(badInput, {})
            const expectedMessage = `${maxNumber.name}: Value is not a number. The value was: ${badInput} (type: '${typeof badInput}')`

            expect(actual).toThrow(new Error(expectedMessage))
        })

        test("should throw error for array value", () => {
            const maxValue = 100
            const validateFunc = maxNumber(maxValue)
            const badInput = [1, 2, 3] as any as number

            const actual = () => validateFunc(badInput, {})
            const expectedMessage = `${maxNumber.name}: Value is not a number. The value was: ${badInput} (type: '${typeof badInput}')`

            expect(actual).toThrow(new Error(expectedMessage))
        })
    })

    describe("edge cases", () => {
        test("should handle Infinity value", () => {
            const maxValue = 100
            const validateFunc = maxNumber(maxValue)
            const value = Infinity

            const result = validateFunc(value, {})

            expect(result).toBeDefined()
            expect(result?.ruleName).toBe(maxNumber.name)
            expect(result?.attemptedValue).toBe(value)
        })

        test("should handle -Infinity value", () => {
            const maxValue = 100
            const validateFunc = maxNumber(maxValue)
            const value = -Infinity

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle NaN value", () => {
            const maxValue = 100
            const validateFunc = maxNumber(maxValue)
            const value = NaN

            const result = validateFunc(value, {})

            expect(result).toBeDefined()
            expect(result?.ruleName).toBe(maxNumber.name)
            expect(result?.attemptedValue).toBe(value)
        })

        test("should handle very large numbers", () => {
            const maxValue = Number.MAX_SAFE_INTEGER
            const validateFunc = maxNumber(maxValue)
            const value = Number.MAX_SAFE_INTEGER + 1

            const result = validateFunc(value, {})

            expect(result).toBeDefined()
            expect(result?.ruleName).toBe(maxNumber.name)
            expect(result?.attemptedValue).toBe(value)
        })

        test("should handle very small numbers", () => {
            const maxValue = Number.MIN_SAFE_INTEGER
            const validateFunc = maxNumber(maxValue)
            const value = Number.MIN_SAFE_INTEGER - 1

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })
}) 