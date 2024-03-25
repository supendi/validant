import { stringLengthMinimum } from "../../validators/stringLengthMinimum"

describe(`Test ${stringLengthMinimum.name}`, () => {
    it("should return false and have default error message", () => {
        const minLen = 10
        const defaultValidatorErrorMessage = `The minimum string is ${minLen}.`
        const validator = stringLengthMinimum(minLen, defaultValidatorErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate("abcd")

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${stringLengthMinimum.name}`, () => {
    it("should return false and have custom error message", () => {
        const minLen = 10
        const defaultValidatorErrorMessage = `Hey we want a string with minimum length = 10.`
        const validator = stringLengthMinimum(minLen, defaultValidatorErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate("12345601")

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${stringLengthMinimum.name}`, () => {
    it("should return true and have custom error message", () => {
        const minLen = 5
        const defaultValidatorErrorMessage = `The minimum string is ${minLen}.`
        const validator = stringLengthMinimum(1, defaultValidatorErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate("abcde")

        expect(isValid).toEqual(true)
    })
})

describe(`Test ${stringLengthMinimum.name}`, () => {
    it("should return true and have custom error message", () => {
        const minLen = 5
        const defaultValidatorErrorMessage = `The minimum string is ${minLen}.`
        const validator = stringLengthMinimum(1, defaultValidatorErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate("asdfasdfasdf")

        expect(isValid).toEqual(true)
    })
})

describe(`Test ${stringLengthMinimum.name}`, () => {
    it("should return true and have custom error message", () => {
        const minLen = 5
        const defaultValidatorErrorMessage = `The minimum string is ${minLen}.`
        const validator = stringLengthMinimum(1, defaultValidatorErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate(12345)

        expect(isValid).toEqual(true)
    })
})