import { maxNumber } from "../../rules/maxNumber"

describe(`Test ${maxNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const maxValue = 5
        const validator = maxNumber(maxValue)
        const myNumber = 10
        const defaultValidatorErrorMessage = `The maximum value for this field is ${maxValue}.`


        var {
            isValid,
            errorMessage
        } = validator(myNumber)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${maxNumber.name}`, () => {
    it("should return false and have custom error message", () => {
        const maxValue = 1
        const customErrorMessage = `Maximum order for this item is ${maxValue}.`
        const validator = maxNumber(maxValue, customErrorMessage)
        const myNumber = 2
        var {
            isValid,
            errorMessage
        } = validator(myNumber)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${maxNumber.name}`, () => {
    it("should return true and have custom error message", () => {
        const maxValue = 100
        const customErrorMessage = `Maximum order for this item is ${maxValue}.`
        const validator = maxNumber(maxValue, customErrorMessage)
        const orderItems = 1

        var {
            isValid,
            errorMessage
        } = validator(orderItems)

        expect(isValid).toEqual(true)
    })
}) 