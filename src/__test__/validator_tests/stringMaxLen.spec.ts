import { stringMaxLen } from "../../validators/stringMaxLen"

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return false and have default error message", () => {
        const maxLength = 3
        const defaultValidatorErrorMessage = `The max string is ${maxLength}.`
        const validator = stringMaxLen(maxLength, defaultValidatorErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate("abcd")

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const maxLength = 5
        const defaultValidatorErrorMessage = `Hey we want a string with minimum length = 10.`
        const validator = stringMaxLen(maxLength, defaultValidatorErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate("12345601")

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return true and have custom error message", () => {
        const maxLength = 5
        const defaultValidatorErrorMessage = `The max length string is ${maxLength}.`
        const validator = stringMaxLen(maxLength, defaultValidatorErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate("abcde")

        expect(isValid).toEqual(true)
    })
})

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const maxLength = 5
        const defaultValidatorErrorMessage = `The max length string is ${maxLength}.`
        const validator = stringMaxLen(maxLength, defaultValidatorErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate("asdfasdfasdf")

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return true and have custom error message", () => {
        const maxLength = 1000
        const defaultValidatorErrorMessage = `The max length string is ${maxLength}.`
        const validator = stringMaxLen(maxLength, defaultValidatorErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate(12345)

        expect(isValid).toEqual(true)
    })
})