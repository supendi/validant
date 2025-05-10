import { elementOf } from "../../propertyRules/elementOf"


describe(`Test ${elementOf.name}`, () => {
    it("should return false and have default error message", () => {
        const testValue = [1, 2, 3]
        const ruleFunc = elementOf(testValue)
        const defaultValidatorErrorMessage = `The value ':value' is not the element of [${testValue.join(", ")}].`
        const inputValue = 4

        var {
            isValid,
            errorMessage
        } = ruleFunc(inputValue)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${elementOf.name}`, () => {
    it("should return false and have custom error message", () => {
        const testValue = [1, 2, 3]
        const customerErrorMessage = `Wrong guess.`
        const validator = elementOf(testValue, customerErrorMessage)
        const inputValue = 4

        var {
            isValid,
            errorMessage
        } = validator(inputValue)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${elementOf.name}`, () => {
    it("should return true and have custom error message", () => {
        const testValue = [1, 2, 3]
        const customerErrorMessage = `Wrong guess.`
        const validator = elementOf(testValue, customerErrorMessage)
        const inputValue = 3

        var {
            isValid,
            errorMessage
        } = validator(inputValue)

        expect(isValid).toEqual(true)
    })
})

describe(`Test ${elementOf.name}`, () => {
    it("should return true and have custom error message", () => {
        const testValue = ["Indonesia", "India", "UK", "USA"]
        const customerErrorMessage = `Wrong guess.`
        const validator = elementOf(testValue, customerErrorMessage)
        const inputValue = "Indonesia"

        var {
            isValid,
            errorMessage
        } = validator(inputValue)

        expect(isValid).toEqual(true)
    })
})

describe(`Test ${elementOf.name}`, () => {
    it("should return false and have custom error message", () => {
        const testValue = [
            {
                id: 1,
                name: "john"
            },
            {
                id: 2,
                name: "karen"
            }
        ]
        const customerErrorMessage = `Wrong guess.`
        const validator = elementOf(testValue, customerErrorMessage)

        //The following IS NOT the reference element of the above array. Even it looks similar.
        const inputValue = {
            name: "john",
            id: 1,
        }

        var {
            isValid,
            errorMessage
        } = validator(inputValue)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${elementOf.name}`, () => {
    it("should return true and have custom error message", () => {
        const testValue = [
            {
                id: 1,
                name: "john"
            },
            {
                id: 2,
                name: "karen"
            }
        ]
        const customerErrorMessage = `Wrong guess.`
        const validator = elementOf(testValue, customerErrorMessage)

        //The following IS the reference element of the above array.
        const inputValue = testValue.find(x => x.id === 1)

        var {
            isValid,
            errorMessage
        } = validator(inputValue)

        expect(isValid).toEqual(true)
    })
}) 