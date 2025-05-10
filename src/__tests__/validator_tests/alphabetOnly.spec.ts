import { alphabetOnly } from "../../propertyRules/alphabetOnly"


describe(`Test ${alphabetOnly.name}`, () => {
    it("should return false and have default error message", () => {
        const defaultValidatorErrorMessage = "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
        const ruleFunc = alphabetOnly(defaultValidatorErrorMessage)
        const testValue = "abcdD1unseenA number"

        var {
            isValid,
            errorMessage
        } = ruleFunc(testValue)

        expect(isValid).toEqual(false)
    })
})

describe(`Test ${alphabetOnly.name}`, () => {
    it("should return false and have custom error message", () => {
        const customeMessage = "Hey be good bro."
        const ruleFunc = alphabetOnly(customeMessage)

        const testValue = "abcd*,.asdf|'asd!@#$%^&*()"

        var {
            isValid,
            errorMessage
        } = ruleFunc(testValue)


        expect(isValid).toEqual(false)
    })
})

describe(`Test ${alphabetOnly.name}`, () => {
    it("should return true and have custom error message", () => {
        const customeMessage = "Hey be good bro."
        const ruleFunc = alphabetOnly(customeMessage) 
        const testValue = "Here I am having space but not dot or comma"
 
        var {
            isValid,
            errorMessage
        } = ruleFunc(testValue)


        expect(isValid).toEqual(true)
    })
})