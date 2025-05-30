import { emailAddress } from "../../rules/emailAddress"
import { RuleViolation } from "../../types/ValidationRule"

describe(`Test ${emailAddress.name}`, () => {
    it("should return false and have default error message", () => {
        const input = "wrongemail@.com"
        const defaultErrorMessage = `Invalid email address. The valid email example: john.doe@example.com.`

        const validateFunc = emailAddress()

        const actual = validateFunc(input, {})

        const expected: RuleViolation = {
            ruleName: emailAddress.name,
            attemptedValue: input,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${emailAddress.name}`, () => {
    it("should return false and have custom error message", () => {
        const input = "another@wrong@email.com"
        const customErrorMessage = `Invalid email address '${input}'`
        const validateFunc = emailAddress(customErrorMessage)

        const actual = validateFunc(input, {})
        const expected: RuleViolation = {
            ruleName: emailAddress.name,
            attemptedValue: input,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${emailAddress.name}`, () => {
    it("should return true and empty error", () => {
        const input = 'john@doe.com'
        const customErrorMessage = `Invalid email.`
        const validateFunc = emailAddress(customErrorMessage)

        const actual = validateFunc(input, {})
        const expected = undefined
        expect(actual).toEqual(expected)
    })
})

describe(`Test ${emailAddress.name}`, () => {
    it("should return false and have custom error message", () => {
        const input = 'john@'
        const customErrorMessage = `Invalid email :value`
        const validateFunc = emailAddress(customErrorMessage)

        const actual = validateFunc(input, {})
        const expected: RuleViolation = {
            ruleName: emailAddress.name,
            attemptedValue: input,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
}) 