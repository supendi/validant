import { minNumber } from "../../../rules/minNumber"
import { RuleViolation } from "../../../types/ValidationRule"

describe("minNumber", () => {
    describe("validation failures", () => {
        test("should return violation when value is less than minimum", () => {
            const minValue = 10
            const validateFunc = minNumber(minValue)
            const value = 5
            const expectedErrorMessage = `The minimum value for this field is ${minValue}.`

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: minNumber.name,
                attemptedValue: value,
                errorMessage: expectedErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should return violation when value equals minimum (edge case)", () => {
            const minValue = 10
            const validateFunc = minNumber(minValue)
            const value = 10

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return violation with custom error message", () => {
            const minValue = 2
            const customErrorMessage = "Minimum order for this item is 2"
            const validateFunc = minNumber(minValue, customErrorMessage)
            const value = 1

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: minNumber.name,
                attemptedValue: value,
                errorMessage: customErrorMessage
            }
            expect(result).toEqual(expected)
        })

        test("should handle negative minimum values", () => {
            const minValue = -5
            const validateFunc = minNumber(minValue)
            const value = -10

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: minNumber.name,
                attemptedValue: value,
                errorMessage: `The minimum value for this field is ${minValue}.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle zero minimum value", () => {
            const minValue = 0
            const validateFunc = minNumber(minValue)
            const value = -1

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: minNumber.name,
                attemptedValue: value,
                errorMessage: `The minimum value for this field is ${minValue}.`
            }
            expect(result).toEqual(expected)
        })

        test("should handle decimal numbers", () => {
            const minValue = 5.5
            const validateFunc = minNumber(minValue)
            const value = 5.4

            const result = validateFunc(value, {})

            const expected: RuleViolation = {
                ruleName: minNumber.name,
                attemptedValue: value,
                errorMessage: `The minimum value for this field is ${minValue}.`
            }
            expect(result).toEqual(expected)
        })
    })

    describe("validation successes", () => {
        test("should return undefined when value is greater than minimum", () => {
            const minValue = 2
            const validateFunc = minNumber(minValue)
            const value = 100

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined when value equals minimum", () => {
            const minValue = 2
            const validateFunc = minNumber(minValue)
            const value = 2

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle zero value with zero minimum", () => {
            const minValue = 0
            const validateFunc = minNumber(minValue)
            const value = 0

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle large numbers", () => {
            const minValue = 1000
            const validateFunc = minNumber(minValue)
            const value = 999999

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })

        test("should handle decimal numbers that meet minimum", () => {
            const minValue = 5.5
            const validateFunc = minNumber(minValue)
            const value = 5.6

            const result = validateFunc(value, {})

            expect(result).toBeUndefined()
        })
    })

    describe("type validation", () => {
        test("should throw error when value is not a number (string)", () => {
            const minValue = 100
            const validateFunc = minNumber(minValue)
            const badInput = "1" as any as number

            expect(() => validateFunc(badInput, {})).toThrow(
                `${minNumber.name}: Value is not a number. The value was: ${badInput} (type: 'string')`
            )
        })

        test("should throw error when value is not a number (boolean)", () => {
            const minValue = 100
            const validateFunc = minNumber(minValue)
            const badInput = true as any as number

            expect(() => validateFunc(badInput, {})).toThrow(
                `${minNumber.name}: Value is not a number. The value was: ${badInput} (type: 'boolean')`
            )
        })

        test("should throw error when value is not a number (object)", () => {
            const minValue = 100
            const validateFunc = minNumber(minValue)
            const badInput = {} as any as number

            expect(() => validateFunc(badInput, {})).toThrow(
                `${minNumber.name}: Value is not a number. The value was: ${badInput} (type: 'object')`
            )
        })

        test("should throw error when value is not a number (array)", () => {
            const minValue = 100
            const validateFunc = minNumber(minValue)
            const badInput = [] as any as number

            expect(() => validateFunc(badInput, {})).toThrow(
                `${minNumber.name}: Value is not a number. The value was: ${badInput} (type: 'object')`
            )
        })

        test("should throw error when value is not a number (null)", () => {
            const minValue = 100
            const validateFunc = minNumber(minValue)
            const badInput = null as any as number

            expect(() => validateFunc(badInput, {})).toThrow(
                `${minNumber.name}: Value is not a number. The value was: ${badInput} (type: 'object')`
            )
        })

        test("should throw error when value is not a number (undefined)", () => {
            const minValue = 100
            const validateFunc = minNumber(minValue)
            const badInput = undefined as any as number

            expect(() => validateFunc(badInput, {})).toThrow(
                `${minNumber.name}: Value is not a number. The value was: ${badInput} (type: 'undefined')`
            )
        })

        test("should accept bigint values", () => {
            const minValue = 10
            const validateFunc = minNumber(minValue)
            const value = BigInt(15)

            const result = validateFunc(value as any as number, {})

            expect(result).toBeUndefined()
        })

        test("should handle bigint values that violate minimum", () => {
            const minValue = 10
            const validateFunc = minNumber(minValue)
            const value = BigInt(5)

            const result = validateFunc(value as any as number, {})

            const expected: RuleViolation = {
                ruleName: minNumber.name,
                attemptedValue: value,
                errorMessage: `The minimum value for this field is ${minValue}.`
            }
            expect(result).toEqual(expected)
        })
    })
}) 