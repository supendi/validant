import { stringMaxLen } from "../../propertyRules/stringMaxLen"

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return false and have default error message", () => {
        const maxLength = 3
        const defaultValidatorErrorMessage = `The max string is ${maxLength}.`
        const validator = stringMaxLen(maxLength, defaultValidatorErrorMessage)

        var {
            isValid,
            errorMessage
        } = validator("abcd")


        expect(isValid).toEqual(false)
    })
})

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const maxLength = 5
        const defaultValidatorErrorMessage = `Hey we want a string with minimum length = 10.`
        const validator = stringMaxLen(maxLength, defaultValidatorErrorMessage)

        var {
            isValid,
            errorMessage
        } = validator("12345601")


        expect(isValid).toEqual(false)
    })
})

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return true and have custom error message", () => {
        const maxLength = 5
        const defaultValidatorErrorMessage = `The max length string is ${maxLength}.`
        const validator = stringMaxLen(maxLength, defaultValidatorErrorMessage)


        var {
            isValid,
            errorMessage
        } = validator("abcde")


        expect(isValid).toEqual(true)
    })
})

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const maxLength = 5
        const defaultValidatorErrorMessage = `The max length string is ${maxLength}.`
        const validator = stringMaxLen(maxLength, defaultValidatorErrorMessage)


        var {
            isValid,
            errorMessage
        } = validator("asdfasdfasdf")


        expect(isValid).toEqual(false)
    })
})

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return true and have custom error message", () => {
        const maxLength = 1000
        const defaultValidatorErrorMessage = `The max length string is ${maxLength}.`
        const validator = stringMaxLen(maxLength, defaultValidatorErrorMessage)

        var {
            isValid,
            errorMessage
        } = validator("12345")


        expect(isValid).toEqual(true)
    })
})