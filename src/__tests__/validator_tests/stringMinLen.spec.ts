import { stringMinLen } from "../../propertyRules/stringMinLen"

describe(`Test ${stringMinLen.name}`, () => {
    it("should return false and have default error message", () => {
        const minLen = 10
        const defaultValidatorErrorMessage = `The minimum string is ${minLen}.`
        const validator = stringMinLen(minLen, defaultValidatorErrorMessage)


        var {
            isValid,
            errorMessage
        } = validator("abcd")


        expect(isValid).toEqual(false)
    })
})

describe(`Test ${stringMinLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const minLen = 10
        const defaultValidatorErrorMessage = `Hey we want a string with minimum length = 10.`
        const validator = stringMinLen(minLen, defaultValidatorErrorMessage)

        var {
            isValid,
            errorMessage
        } = validator("12345601")


        expect(isValid).toEqual(false)
    })
})

describe(`Test ${stringMinLen.name}`, () => {
    it("should return true and have custom error message", () => {
        const minLen = 5
        const defaultValidatorErrorMessage = `The minimum length string is ${minLen}.`
        const validator = stringMinLen(1, defaultValidatorErrorMessage)

        var {
            isValid,
            errorMessage
        } = validator("abcde")


        expect(isValid).toEqual(true)
    })
})

describe(`Test ${stringMinLen.name}`, () => {
    it("should return true and have custom error message", () => {
        const minLen = 5
        const defaultValidatorErrorMessage = `The minimum length string is ${minLen}.`
        const validator = stringMinLen(1, defaultValidatorErrorMessage)

        var {
            isValid,
            errorMessage
        } = validator("asdfasdfasdf")


        expect(isValid).toEqual(true)
    })
})

describe(`Test ${stringMinLen.name}`, () => {
    it("should return true and have custom error message", () => {
        const minLen = 5
        const defaultValidatorErrorMessage = `The minimum length string is ${minLen}.`
        const validator = stringMinLen(1, defaultValidatorErrorMessage)

        var {
            isValid,
            errorMessage
        } = validator("12345")

        expect(isValid).toEqual(true)
    })
})