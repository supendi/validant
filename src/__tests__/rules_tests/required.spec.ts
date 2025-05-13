import { required } from "../../rules/required"

describe(`Test ${required.name}`, () => {
    it("RequiredValidator should return false and have default error message", () => {
        const validator = required()
        const myName = ""
        const defaultValidatorErrorMessage = "This field is required."

        var {
            isValid,
            errorMessage
        } = validator(myName)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${required.name}`, () => {
    it("RequiredValidator should return false and have custom error message", () => {
        const customErrorMessage = "Please fill this field"
        const validator = required(customErrorMessage)
        const myName = ""

        var {
            isValid,
            errorMessage
        } = validator(myName)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${required.name}`, () => {
    it("RequiredValidator should return true and have custom error message", () => {
        const customErrorMessage = "Please fill this field"
        const validator = required(customErrorMessage)
        const myName = "Is Not empty"

        var {
            isValid,
            errorMessage
        } = validator(myName)

        expect(isValid).toEqual(true)
    })
})