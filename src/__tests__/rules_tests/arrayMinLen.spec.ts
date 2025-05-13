import { arrayMinLen } from "../../rules/arrayMinLen"

describe(`Test ${arrayMinLen.name}`, () => {
    it("should return false and have default error message", () => {
        const minValue = 1
        const ruleFunc = arrayMinLen(minValue)
        const myArray = []
        const defaultValidatorErrorMessage = `The minimum length for this field is ${minValue}.`

        var {
            isValid,
            errorMessage
        } = ruleFunc(myArray)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${arrayMinLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const minValue = 2
        const customErrorMessage = "Please add at least one order item"
        const ruleFunc = arrayMinLen(minValue, customErrorMessage)
        const orderItems = []

       var {
            isValid,
            errorMessage
        } = ruleFunc(orderItems)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${arrayMinLen.name}`, () => {
    it("should return true and have custom error message", () => {
        const minValue = 2
        const customErrorMessage = "Please add at least one order item"
        const ruleFunc = arrayMinLen(minValue, customErrorMessage)
        const orderItems = [
            101,
            10
        ]

       var {
            isValid,
            errorMessage
        } = ruleFunc(orderItems)

        expect(isValid).toEqual(true)
    })
}) 