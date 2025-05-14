import { emailAddress } from "../../rules/emailAddress"
import { PropertyRuleValidationResult } from "../../types"

describe(`Test ${emailAddress.name}`, () => {
    it("should return false and have default error message", () => {
        const input = "wrongemail@.com"
        const defaultErrorMessage = `Invalid email address. The valid email example: john.doe@example.com.`

        const ruleFunc = emailAddress()

        const actual = ruleFunc(input, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${emailAddress.name}`, () => {
    it("should return false and have custom error message", () => {
        const input = "another@wrong@email.com"
        const customErrorMessage = `Invalid email address '${input}'`
        const ruleFunc = emailAddress(customErrorMessage)

        const actual = ruleFunc(input, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${emailAddress.name}`, () => {
    it("should return true and empty error", () => {
        const input = 'john@doe.com'
        const customErrorMessage = `Invalid email.`
        const ruleFunc = emailAddress(customErrorMessage)

        const actual = ruleFunc(input, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${emailAddress.name}`, () => {
    it("should return false and have custom error message", () => {
        const input = 'john@'
        const customErrorMessage = `Invalid email :value`
        const ruleFunc = emailAddress(customErrorMessage)

        const actual = ruleFunc(input, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
}) 