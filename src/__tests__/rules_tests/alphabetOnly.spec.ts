import { alphabetOnly } from "../../rules"
import { PropertyRuleValidationResult } from "../../types"

describe(`Test ${alphabetOnly.name}`, () => {
    it("should return false and have default error message", () => {
        const errorMessage = "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
        const ruleFunc = alphabetOnly()
        const testValue = "abcdD1unseenA number" // Contains number: 1

        const actual = ruleFunc(testValue, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${alphabetOnly.name}`, () => {
    it("should return false and have custom error message", () => {
        const errorMessage = "Hey be good bro."
        const ruleFunc = alphabetOnly(errorMessage)
        const testValue = "abcd*,.asdf|'asd!@#$%^&*()"

        const actual = ruleFunc(testValue, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${alphabetOnly.name}`, () => {
    it("should return true and have custom error message", () => {
        const errorMessage = "Hey be good bro."
        const ruleFunc = alphabetOnly(errorMessage)
        const testValue = "Here I am having space but not dot or comma"

        const actual = ruleFunc(testValue, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true,
        }

        expect(actual).toEqual(expected)
    })
})