import { emailAddress } from "../../validators/emailAddress-validator"

describe("EmailAddressValidator Test", () => {
    it("should return false and have default error message", () => {
        const testValue = "wrongemail@.com"
        const validator = emailAddress()
        const defaultValidatorErrorMessage = `Invalid email address. The valid email example: john.doe@example.com`

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate(testValue)

        expect(isValid).toEqual(false)
    })
})

describe("EmailAddressValidator Test", () => {
    it("should return false and have custom error message", () => {
        const testValue = "another@wrong@email.com"
        const customErrorMessage = `Invalid email address '${testValue}'`
        const validator = emailAddress(customErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(customErrorMessage)

        var isValid = validator.validate(testValue)

        expect(isValid).toEqual(false)
    })
})

describe("EmailAddressValidator Test", () => {
    it("should return true and have custom error message", () => {
        const testValue = 'john@doe.com'
        const customErrorMessage = `Invalid email.`
        const validator = emailAddress(customErrorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(customErrorMessage)

        var isValid = validator.validate(testValue)

        expect(isValid).toEqual(true)
    })
}) 