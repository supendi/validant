import { required } from "../../validators/required"

describe(`Test ${required.name}`, () => {
    it("RequiredValidator should return false and have default error message", () => {
        const validator = required()
        const myName = ""
        const defaultValidatorErrorMessage = "This field is required."

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate(myName)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${required.name}`, () => {
    it("RequiredValidator should return false and have custom error message", () => {
        const customErrorMessage = "Please fill this field" 
        const validator = required(customErrorMessage)
        const myName = ""

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(customErrorMessage)

        var isValid = validator.validate(myName)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${required.name}`, () => {
    it("RequiredValidator should return true and have custom error message", () => {
        const customErrorMessage = "Please fill this field" 
        const validator = required(customErrorMessage)
        const myName = "Is Not empty"

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(customErrorMessage)

        var isValid = validator.validate(myName)

        expect(isValid).toEqual(true)
    })
})