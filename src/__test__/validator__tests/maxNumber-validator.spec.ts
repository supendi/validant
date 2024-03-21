import { maxNumber } from "../../validators/maxNumber-validator"

describe("MaxNumberValidator Test", () => {
    it("should return false and have default error message", () => {
        const maxValue = 5
        const validator = maxNumber(maxValue)
        const myNumber = 10
        const defaultValidatorErrorMessage =  `The maximum value for this field is ${maxValue}`

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage)

        var isValid = validator.validate(myNumber)

        expect(isValid).toEqual(false)
    })
})

describe("MaxNumberValidator Test", () => {
    it("should return false and have custom error message", () => {
        const maxValue = 1
        const customErrorMessage = `Maximum order for this item is ${maxValue}`
        const validator = maxNumber(maxValue, customErrorMessage)
        const myNumber = 2

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(customErrorMessage)

        var isValid = validator.validate(myNumber)

        expect(isValid).toEqual(false)
    })
})

describe("MaxNumberValidator Test", () => {
    it("should return true and have custom error message", () => {
        const maxValue = 100
        const customErrorMessage = `Maximum order for this item is ${maxValue}`
        const validator = maxNumber(maxValue, customErrorMessage)
        const orderItems = 1

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(customErrorMessage)

        var isValid = validator.validate(orderItems)

        expect(isValid).toEqual(true)
    })
}) 