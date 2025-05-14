import { equalToPropertyValue } from "../../rules/equalToPropertyValue"
import { PropertyRuleValidationResult } from "../../types"

describe(`Test ${equalToPropertyValue.name}`, () => {
    it("should return false and have default error message", () => {
        type Customer = {
            email: string
        }

        const customer: Customer = {
            email: "test123@gmail.com"
        }

        const propertyName: keyof Customer = 'email'
        const defaultErrorMessage = `The value should be equal to the value of '${propertyName}'.`
        const input = "test12333@gmail.com"

        const ruleFunc = equalToPropertyValue<Customer>(propertyName)

        const actual = ruleFunc(input, customer)
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${equalToPropertyValue.name}`, () => {
    it("should return false and have custom error message", () => {
        const customErrorMessage = `Hey the email and re-enter email is must be equal`

        type Customer = {
            email: string
        }

        const customer: Customer = {
            email: "test123@gmail.com"
        }

        const propertyName: keyof Customer = 'email'
        const input = "test12333@gmail.com"

        const ruleFunc = equalToPropertyValue<Customer>(propertyName, customErrorMessage)

        const actual = ruleFunc(input, customer)
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${equalToPropertyValue.name}`, () => {
    it("should return true and empty error", () => {
        const customErrorMessage = `Hey the email and re-enter email is must be equal`

        type Customer = {
            email: string
        }

        const customer: Customer = {
            email: "admin@gmail.com"
        }

        const propertyName: keyof Customer = 'email'
        const input = "admin@gmail.com"

        const ruleFunc = equalToPropertyValue<Customer>(propertyName, customErrorMessage)

        const actual = ruleFunc(input, customer)
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${equalToPropertyValue.name}`, () => {
    it("should return false and custom error message.", () => {
        const customErrorMessage = `Invalid address`

        interface Address {
            street: string
            cityId: number
        }
        type Customer = {
            email: string
            address: Address
        }

        const customer: Customer = {
            email: "admin@gmail.com",
            address: {
                cityId: 1,
                street: "Bandung"
            }
        }

        const propertyName: keyof Customer = 'address'

        // Not reference : should return false
        const addressValue = {
            cityId: 1,
            street: "Bandung"
        }

        const ruleFunc = equalToPropertyValue<Customer>(propertyName, customErrorMessage)

        const actual = ruleFunc(addressValue, customer)
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${equalToPropertyValue.name}`, () => {
    it("should return true and empty error message.", () => {
        const customErrorMessage = `Invalid address`

        interface Address {
            street: string
            cityId: number
        }
        
        type Customer = {
            email: string
            address: Address
        }

        const customer: Customer = {
            email: "admin@gmail.com",
            address: {
                cityId: 1,
                street: "Bandung"
            }
        }

        const propertyName: keyof Customer = 'address'

        // Reference: Should return true
        const addressValue = customer.address

        const ruleFunc = equalToPropertyValue<Customer>(propertyName, customErrorMessage)

        const actual = ruleFunc(addressValue, customer)
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
}) 