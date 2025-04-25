import { required } from "../../propertyValidators"
import { ValidationRule, ArrayValidationRule, PropertyValidator, } from "../../types"

const requiredValidator: PropertyValidator<any, any> = {
    description: "Required Validator",
    returningErrorMessage: "This field is required",
    validate: (value: any, obj?: any) => {
        return !!value
    }
}
const minNumberValidator: PropertyValidator<any, any> = {
    description: "Minimum Number Validator",
    returningErrorMessage: "Minimum number is",
    validate: (value: any, obj?: any) => {
        return false
    }
}

/**
 * Ensure all the code below compiled
 */
describe("ArrayValidationRule Compile Test", () => {
    it("Should compile", () => {
        interface Person {
            name: string
            age: number
        }

        const personRule: ValidationRule<Person> = {
            name: [requiredValidator],
            age: [requiredValidator, minNumberValidator],
        }

        const arrayOfPersonValidationRule: ArrayValidationRule<Person[], Person> = {
            validators: [requiredValidator],
            validationRule: personRule,
        }

        expect(arrayOfPersonValidationRule).not.toBeUndefined()

        expect(arrayOfPersonValidationRule.validators).not.toBeUndefined()
        expect(Array.isArray(arrayOfPersonValidationRule.validators)).toBeTruthy()
        expect(arrayOfPersonValidationRule.validators?.length).toEqual(1)
        expect(arrayOfPersonValidationRule.validators ? arrayOfPersonValidationRule.validators[0] : undefined).toEqual(requiredValidator)
    })
})

describe("ArrayValidationRule Compile Test", () => {
    it("Should compile", () => {
        interface Person {
            name?: string
            age?: number
        }

        const personRule: ValidationRule<Person> = {
            name: [requiredValidator],
            age: [requiredValidator, minNumberValidator],
        }

        const arrayOfPersonValidationRule: ArrayValidationRule<Person[], Person> = {
            validators: [requiredValidator],
            validationRule: personRule,
        }

        expect(arrayOfPersonValidationRule).not.toBeUndefined()

        expect(arrayOfPersonValidationRule.validators).not.toBeUndefined()
        expect(Array.isArray(arrayOfPersonValidationRule.validators)).toBeTruthy()
        expect(arrayOfPersonValidationRule.validators?.length).toEqual(1)
        expect(arrayOfPersonValidationRule.validators ? arrayOfPersonValidationRule.validators[0] : undefined).toEqual(requiredValidator)
    })
})

describe("ArrayValidationRule Compile Test", () => {
    it("Should compile", () => {
        interface Order {
            orderItems: OrderItem[]
        }

        interface OrderItem {
            productId: number
        }

        var rule: ValidationRule<Order> = {
            orderItems: function build(y: OrderItem[], x: Order) {
                return {
                    validators: [required("")],
                    validationRule: {
                        productId: []
                    }
                }
            }
        }
    })
})
