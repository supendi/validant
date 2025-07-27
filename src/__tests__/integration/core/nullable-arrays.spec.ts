
import { Validator, ValidationResult, arrayMinLen, elementOf, maxNumber, minNumber, required, ValidationRule } from "../../../index"

interface Order {
    id: string
    orderItems: OrderItem[] | null
}

interface OrderItem {
    productId: number
    quantity: number
}

const productIds = [1, 2, 3, 4, 5]

const orderItemsRule: ValidationRule<OrderItem, Order> = {
    productId: [required(), elementOf(productIds)],
    quantity: [minNumber(1), maxNumber(5)],
}

const rule: ValidationRule<Order> = {
    orderItems: {
        arrayRules: [arrayMinLen(1)],
        arrayElementRule: orderItemsRule
    }
}

describe("Validate null property", () => {
    it("Should return error", () => {

        const order: Order = {
            id: "1",
            orderItems: null
        }

        const validator = new Validator()
        const actual = validator.validate(order, rule)
        const expected: ValidationResult<Order> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                orderItems: {
                    arrayErrors: [
                        {
                            errorMessage: "The minimum length for this field is 1.",
                            attemptedValue: null,
                            ruleName: arrayMinLen.name
                        }
                    ]
                }
            },
        }

        expect(actual).toEqual(expected)
    })
})
