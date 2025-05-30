import { alphabetOnly } from "../../rules"
import { RuleViolation } from "../../types/ValidationRule"

describe(`Test ${alphabetOnly.name}`, () => {
    it("should return false and have default error message", () => {
        const errorMessage = "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
        const validateFunc = alphabetOnly()
        const testValue = "abcdD1unseenA number" // Contains number: 1

        const actual = validateFunc(testValue, {})
        const expected: RuleViolation = {
            ruleName: alphabetOnly.name,
            attemptedValue: testValue,
            errorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${alphabetOnly.name}`, () => {
    it("should return false and have custom error message", () => {
        const errorMessage = "Hey be good bro."
        const validateFunc = alphabetOnly(errorMessage)
        const testValue = "abcd*,.asdf|'asd!@#$%^&*()"

        const actual = validateFunc(testValue, {})
        const expected: RuleViolation = {
            ruleName: alphabetOnly.name,
            attemptedValue: testValue,
            errorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${alphabetOnly.name}`, () => {
    it("should return true and have custom error message", () => {
        const errorMessage = "Hey be good bro."
        const validateFunc = alphabetOnly(errorMessage)
        const testValue = "Here I am having space but not dot or comma"

        const actual = validateFunc(testValue, {})

        expect(actual).toBeUndefined()
    })
})