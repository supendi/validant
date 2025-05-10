import { minNumber } from "../../propertyRules/minNumber"

describe(`Test ${minNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const minValue = 10
        const validator = minNumber(minValue)
        const myNumber = 5
        const defaultValidatorErrorMessage = `The minimum value for this field is ${minValue}.`

        var {
            isValid,
            errorMessage
        } = validator(myNumber)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${minNumber.name}`, () => {
    it("should return false and have custom error message", () => {
        const minValue = 2
        const customErrorMessage = "Minimum order for this item is 2"
        const validator = minNumber(minValue, customErrorMessage)
        const myNumber = 1


        var {
            isValid,
            errorMessage
        } = validator(myNumber)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${minNumber.name}`, () => {
    it("should return true and have custom error message", () => {
        const minValue = 2
        const customErrorMessage = "Minimum order for this item is 2"
        const validator = minNumber(minValue, customErrorMessage)
        const orderItems = 100


        var {
            isValid,
            errorMessage
        } = validator(orderItems)

        expect(isValid).toEqual(true)
    })
}) 