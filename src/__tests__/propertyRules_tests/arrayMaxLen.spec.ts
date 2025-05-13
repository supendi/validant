import { arrayMaxLen } from "../../rules/arrayMaxLen"

describe(`Test ${arrayMaxLen.name}`, () => {
    it("should return false and have default error message", () => {
        const maxValue = 2
        const ruleFunc = arrayMaxLen<number, any>(maxValue)
        const myArray = [1, 2, 3]
        const defaultruleFuncErrorMessage = `The maximum length for this field is ${maxValue}.`

        expect(ruleFunc).not.toBeUndefined()

        var {
            isValid,
            errorMessage
        } = ruleFunc(myArray)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${arrayMaxLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const maxValue = 1
        const customErrorMessage = `The maximum length for this field is ${maxValue}`
        const ruleFunc = arrayMaxLen(maxValue, customErrorMessage)
        const orderItems = [1, 2]

        expect(ruleFunc).not.toBeUndefined()
        expect(ruleFunc).not.toBeUndefined()

        var {
            isValid,
            errorMessage
        } = ruleFunc(orderItems)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${arrayMaxLen.name}`, () => {
    it("should return true and have custom error message", () => {
        const maxValue = 2
        const customErrorMessage = `The maximum length for this field is ${maxValue}`
        const ruleFunc = arrayMaxLen(maxValue, customErrorMessage)
        const orderItems = [
            101,
            10
        ]

        expect(ruleFunc).not.toBeUndefined()
        expect(ruleFunc).not.toBeUndefined()
        var {
            isValid,
            errorMessage
        } = ruleFunc(orderItems)

        expect(isValid).toEqual(true)
    })
})