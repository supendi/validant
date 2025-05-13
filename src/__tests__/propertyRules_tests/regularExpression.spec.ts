import { regularExpression } from "../../rules/regularExpression"


describe(`Test ${regularExpression.name}`, () => {
    it("should return false and have default error message", () => {
        const testValue = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])([A-Za-z\d]|[^a-zA-Z\d]){8,}$/
        const validator = regularExpression(testValue)
        const defaultValidatorErrorMessage = `The value ':value' doesn't match with the specified regular expression.`
        const inputValue = "Hallo"


        var {
            isValid,
            errorMessage
        } = validator(inputValue)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${regularExpression.name}`, () => {
    it("should return false and have custom error message", () => {
        const testValue = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])([A-Za-z\d]|[^a-zA-Z\d]){8,}$/
        const customErrorMessage = `Invalid value`
        const validator = regularExpression(testValue, customErrorMessage)
        const inputValue = "cumaMisCall1"

        var {
            isValid,
            errorMessage
        } = validator(inputValue)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${regularExpression.name}`, () => {
    it("should return true and have custom error message", () => {
        const testValue = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])([A-Za-z\d]|[^a-zA-Z\d]){8,}$/
        const customErrorMessage = `Invalid value`
        const validator = regularExpression(testValue, customErrorMessage)
        const inputValue = "ThisIsStrongPassword123.,"

        var {
            isValid,
            errorMessage
        } = validator(inputValue)
        
        expect(isValid).toEqual(true)
    })
}) 