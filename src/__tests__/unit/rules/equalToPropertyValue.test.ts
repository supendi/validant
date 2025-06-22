import { equalToPropertyValue } from "../../../rules/equalToPropertyValue"
import { RuleViolation } from "../../../types/ValidationRule"

describe("equalToPropertyValue", () => {
    describe("when value equals property value", () => {
        test("should return undefined for primitive values", () => {
            type Customer = {
                email: string
            }

            const customer: Customer = {
                email: "admin@gmail.com"
            }

            const propertyName: keyof Customer = 'email'
            const input = "admin@gmail.com"

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)

            expect(result).toBeUndefined()
        })

        test("should return undefined for object references", () => {
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
            const addressValue = customer.address // Same reference

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(addressValue, customer)

            expect(result).toBeUndefined()
        })

        test("should return undefined for null values", () => {
            type Customer = {
                email: string | null
            }

            const customer: Customer = {
                email: null
            }

            const propertyName: keyof Customer = 'email'
            const input = null

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)

            expect(result).toBeUndefined()
        })

        test("should return undefined for undefined values", () => {
            type Customer = {
                email: string | undefined
            }

            const customer: Customer = {
                email: undefined
            }

            const propertyName: keyof Customer = 'email'
            const input = undefined

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)

            expect(result).toBeUndefined()
        })
    })

    describe("when value does not equal property value", () => {
        test("should return violation with default error message for primitive values", () => {
            type Customer = {
                email: string
            }

            const customer: Customer = {
                email: "test123@gmail.com"
            }

            const propertyName: keyof Customer = 'email'
            const input = "test12333@gmail.com"
            const expectedErrorMessage = `The value should be equal to the value of '${propertyName}'.`

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)
            const expected: RuleViolation = {
                ruleName: equalToPropertyValue.name,
                attemptedValue: input,
                errorMessage: expectedErrorMessage
            }

            expect(result).toEqual(expected)
        })

        test("should return violation with custom error message for primitive values", () => {
            const customErrorMessage = "Hey the email and re-enter email is must be equal"

            type Customer = {
                email: string
            }

            const customer: Customer = {
                email: "test123@gmail.com"
            }

            const propertyName: keyof Customer = 'email'
            const input = "test12333@gmail.com"

            const validateFunc = equalToPropertyValue<Customer>(propertyName, customErrorMessage)

            const result = validateFunc(input, customer)
            const expected: RuleViolation = {
                ruleName: equalToPropertyValue.name,
                attemptedValue: input,
                errorMessage: customErrorMessage
            }

            expect(result).toEqual(expected)
        })

        test("should return violation for object with same structure but different reference", () => {
            const customErrorMessage = "Invalid address"

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
            const addressValue = {
                cityId: 1,
                street: "Bandung"
            } // Same structure, different reference

            const validateFunc = equalToPropertyValue<Customer>(propertyName, customErrorMessage)

            const result = validateFunc(addressValue, customer)
            const expected: RuleViolation = {
                ruleName: equalToPropertyValue.name,
                attemptedValue: addressValue,
                errorMessage: customErrorMessage
            }

            expect(result).toEqual(expected)
        })

        test("should return violation for different primitive values", () => {
            type Customer = {
                age: number
            }

            const customer: Customer = {
                age: 25
            }

            const propertyName: keyof Customer = 'age'
            const input = 30

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)
            const expected: RuleViolation = {
                ruleName: equalToPropertyValue.name,
                attemptedValue: input,
                errorMessage: `The value should be equal to the value of '${propertyName}'.`
            }

            expect(result).toEqual(expected)
        })

        test("should return violation for boolean values", () => {
            type Customer = {
                isActive: boolean
            }

            const customer: Customer = {
                isActive: true
            }

            const propertyName: keyof Customer = 'isActive'
            const input = false

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)
            const expected: RuleViolation = {
                ruleName: equalToPropertyValue.name,
                attemptedValue: input,
                errorMessage: `The value should be equal to the value of '${propertyName}'.`
            }

            expect(result).toEqual(expected)
        })

        test("should return violation when comparing null with undefined", () => {
            type Customer = {
                email: string | null
            }

            const customer: Customer = {
                email: null
            }

            const propertyName: keyof Customer = 'email'
            const input = undefined

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)
            const expected: RuleViolation = {
                ruleName: equalToPropertyValue.name,
                attemptedValue: input,
                errorMessage: `The value should be equal to the value of '${propertyName}'.`
            }

            expect(result).toEqual(expected)
        })

        test("should return violation when comparing undefined with null", () => {
            type Customer = {
                email: string | undefined
            }

            const customer: Customer = {
                email: undefined
            }

            const propertyName: keyof Customer = 'email'
            const input = null

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)
            const expected: RuleViolation = {
                ruleName: equalToPropertyValue.name,
                attemptedValue: input,
                errorMessage: `The value should be equal to the value of '${propertyName}'.`
            }

            expect(result).toEqual(expected)
        })
    })

    describe("edge cases", () => {
        test("should handle empty string comparison", () => {
            type Customer = {
                name: string
            }

            const customer: Customer = {
                name: ""
            }

            const propertyName: keyof Customer = 'name'
            const input = ""

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)

            expect(result).toBeUndefined()
        })

        test("should handle zero number comparison", () => {
            type Customer = {
                count: number
            }

            const customer: Customer = {
                count: 0
            }

            const propertyName: keyof Customer = 'count'
            const input = 0

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)

            expect(result).toBeUndefined()
        })

        test("should handle NaN comparison", () => {
            type Customer = {
                value: number
            }

            const customer: Customer = {
                value: NaN
            }

            const propertyName: keyof Customer = 'value'
            const input = NaN

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)
            const expected: RuleViolation = {
                ruleName: equalToPropertyValue.name,
                attemptedValue: input,
                errorMessage: `The value should be equal to the value of '${propertyName}'.`
            }

            expect(result).toEqual(expected)
        })

        test("should handle function comparison", () => {
            type Customer = {
                handler: () => void
            }

            const handler = () => {}
            const customer: Customer = {
                handler
            }

            const propertyName: keyof Customer = 'handler'
            const input = handler

            const validateFunc = equalToPropertyValue<Customer>(propertyName)

            const result = validateFunc(input, customer)

            expect(result).toBeUndefined()
        })
    })
}) 