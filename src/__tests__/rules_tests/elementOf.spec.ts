import { elementOf } from "../../rules/elementOf"
import { RuleViolation } from "../../types/ValidationRule"

describe(`Test ${elementOf.name}`, () => {
    it("should return false and have default error message", () => {
        const arr = [1, 2, 3]
        const input = 4
        const defaultErrorMessage = `The value '${input}' is not an element of [${arr.join(", ")}].` // the ':value' is expected. its validateField.ts that replaces that.

        const validateFunc = elementOf(arr)

        const actual = validateFunc(input, {})
        const expected: RuleViolation = {
            ruleName: elementOf.name,
            attemptedValue: input,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${elementOf.name}`, () => {
    it("should return false and have custom error message", () => {
        const arr = [1, 2, 3]
        const customErrorMessage = `Wrong guess.`
        const input = 4

        const validateFunc = elementOf(arr, customErrorMessage)

        const actual = validateFunc(input, {})
        const expected: RuleViolation = {
            ruleName: elementOf.name,
            attemptedValue: input,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${elementOf.name}`, () => {
    it("should return true and empty error", () => {
        const arr = [1, 2, 3]
        const customErrorMessage = `Wrong guess.`
        const input = 3

        const validateFunc = elementOf(arr, customErrorMessage)

        const actual = validateFunc(input, {})

        expect(actual).toEqual(undefined)
    })
})

describe(`Test ${elementOf.name}`, () => {
    it("should return true and have custom error message", () => {
        const arr = ["Indonesia", "India", "UK", "USA"]
        const customErrorMessage = `Wrong guess.`
        const input = "Indonesia"

        const validateFunc = elementOf(arr, customErrorMessage)

        const actual = validateFunc(input, {})

        expect(actual).toEqual(undefined)
    })
})

describe(`Test ${elementOf.name}`, () => {
    it("should return false and have custom error message", () => {
        const arr = [
            {
                id: 1,
                name: "john"
            },
            {
                id: 2,
                name: "karen"
            }
        ]
        const customErrorMessage = `Wrong guess.`
        const validateFunc = elementOf(arr, customErrorMessage)

        //The following IS NOT the reference element of the above array. Even it looks similar.
        const input = {
            name: "john",
            id: 1,
        }

        const actual = validateFunc(input, {})
        const expected: RuleViolation = {
            ruleName: elementOf.name,
            attemptedValue: input,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${elementOf.name}`, () => {
    it("should return true and have custom error message", () => {
        const arr = [
            {
                id: 1,
                name: "john"
            },
            {
                id: 2,
                name: "karen"
            }
        ]
        const customErrorMessage = `Wrong guess.`
        const validateFunc = elementOf(arr, customErrorMessage)

        //The following IS the reference element of the above array.
        const input = arr.find(x => x.id === 1)

        const actual = validateFunc(input, {})

        expect(actual).toEqual(undefined)
    })
})

describe(`Test ${elementOf.name}`, () => {
    it("should throw error", () => {
        const badInput = "not array" as any

        const actual = () => elementOf(badInput)

        const expectedMessage = `${elementOf.name}: Expected an array but received ${typeof badInput}.`;

        expect(actual).toThrow(new Error(expectedMessage));
    })
})

