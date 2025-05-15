import { regularExpression } from "../../rules/regularExpression"
import { PropertyRuleValidationResult } from "../../types/ValidationRule"

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])([A-Za-z\d]|[^a-zA-Z\d]){8,}$/

describe(`Test ${regularExpression.name}`, () => {
    it("should return false and have default error message", () => {
        const ruleFunc = regularExpression(strongPasswordRegex)
        const defaultErrorMessage = `The value ':value' doesn't match with the specified regular expression.`
        const inputValue = "Hallo"

        const actual = ruleFunc(inputValue, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${regularExpression.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = `Invalid value`
        const ruleFunc = regularExpression(strongPasswordRegex, customErrorMessage)
        const inputValue = "cumaMisCall1"

        const actual = ruleFunc(inputValue, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${regularExpression.name}`, () => {
    it("should return true and emtpy error", () => {
        const customErrorMessage = `Invalid value`
        const ruleFunc = regularExpression(strongPasswordRegex, customErrorMessage)
        const inputValue = "ThisIsStrongPassword123.,"

        const actual = ruleFunc(inputValue, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
}) 