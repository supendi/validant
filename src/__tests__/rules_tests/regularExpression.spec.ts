import { regularExpression } from "../../rules/regularExpression"
import { RuleViolation } from "../../types/ValidationRule"

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])([A-Za-z\d]|[^a-zA-Z\d]){8,}$/

describe(`Test ${regularExpression.name}`, () => {
    it("should return false and have default error message", () => {
        const validateFunc = regularExpression(strongPasswordRegex)
        const value = "Hallo"
        const defaultErrorMessage = `The value '${value}' doesn't match with the specified regular expression.`

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: regularExpression.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${regularExpression.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = `Invalid value`
        const validateFunc = regularExpression(strongPasswordRegex, regularExpression.name, customErrorMessage)
        const value = "cumaMisCall1"

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: regularExpression.name,
            attemptedValue: value,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${regularExpression.name}`, () => {
    it("should return true and emtpy error", () => {
        const customErrorMessage = `Invalid value`
        const validateFunc = regularExpression(strongPasswordRegex, customErrorMessage)
        const value = "ThisIsStrongPassword123.,"

        const actual = validateFunc(value, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
}) 