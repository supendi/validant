import { required } from "../../rules"
import { ArrayValidationRule } from "../../types/ValidationRule"
import { ValidateFunc } from "../../types/ValidationRule"
import { ValidationRule } from "../../types/ValidationRule"

const requiredRule: ValidateFunc<any, any> = (value: any, obj?: any) => {
    return {
        ruleName: requiredRule.name,
        attemptedValue: value,
        errorMessage: "This field is required"
    }
}
const minNumberValidator: ValidateFunc<any, any> = (value: any, obj?: any) => {
    return {
        ruleName: minNumberValidator.name,
        attemptedValue: value,
        errorMessage: "yeah"
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
            name: [requiredRule],
            age: [requiredRule, minNumberValidator],
        }

        const arrayOfPersonValidationRule: ArrayValidationRule<Person[], Person> = {
            arrayRules: [requiredRule],
            arrayElementRule: personRule,
        }

        expect(arrayOfPersonValidationRule).not.toBeUndefined()

        expect(arrayOfPersonValidationRule.arrayRules).not.toBeUndefined()
        expect(Array.isArray(arrayOfPersonValidationRule.arrayRules)).toBeTruthy()
        expect(arrayOfPersonValidationRule.arrayRules?.length).toEqual(1)
        expect(arrayOfPersonValidationRule.arrayRules ? arrayOfPersonValidationRule.arrayRules[0] : undefined).toEqual(requiredRule)
    })
})

describe("ArrayValidationRule Compile Test", () => {
    it("Should compile", () => {
        interface Person {
            name?: string
            age?: number
        }

        const personRule: ValidationRule<Person> = {
            name: [requiredRule],
            age: [requiredRule, minNumberValidator],
        }

        const arrayOfPersonValidationRule: ArrayValidationRule<Person[], Person> = {
            arrayRules: [requiredRule],
            arrayElementRule: personRule,
        }

        expect(arrayOfPersonValidationRule).not.toBeUndefined()

        expect(arrayOfPersonValidationRule.arrayRules).not.toBeUndefined()
        expect(Array.isArray(arrayOfPersonValidationRule.arrayRules)).toBeTruthy()
        expect(arrayOfPersonValidationRule.arrayRules?.length).toEqual(1)
        expect(arrayOfPersonValidationRule.arrayRules ? arrayOfPersonValidationRule.arrayRules[0] : undefined).toEqual(requiredRule)
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
                    arrayRules: [required("")],
                    arrayElementRule: {
                        productId: []
                    }
                }
            }
        }
    })
})
