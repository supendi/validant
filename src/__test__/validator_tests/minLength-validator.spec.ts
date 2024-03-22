import { minLength } from "../../validators/minLength-validator"

describe("MinLengthValidator Test", () => {
    it("should return false and have default error message", () => {
        const minValue = 1
        const validator = minLength(minValue)
        const myArray = []
        const defaultValidatorErrorMessage = `The minimum length for this field is ${minValue}.`

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate(myArray)

        expect(isValid).toEqual(false)
    })
})

describe("MinLengthValidator Test", () => {
    it("should return false and have custom error message", () => {
        const minValue = 2
        const customErrorMessage = "Please add at least one order item"
        const validator = minLength(minValue, customErrorMessage)
        const orderItems = []

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(customErrorMessage)

        var isValid = validator.validate(orderItems)

        expect(isValid).toEqual(false)
    })
})

describe("MinLengthValidator Test", () => {
    it("should return true and have custom error message", () => {
        const minValue = 2
        const customErrorMessage = "Please add at least one order item"
        const validator = minLength(minValue, customErrorMessage)
        const orderItems = [
            101,
            10
        ]

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(customErrorMessage)

        var isValid = validator.validate(orderItems)

        expect(isValid).toEqual(true)
    })
}) 