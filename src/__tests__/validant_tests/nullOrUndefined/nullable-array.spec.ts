
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
        arrayItemRule: orderItemsRule
    }
}

describe("Validate null property", () => {
    it("Should return error", () => {

        const order: Order = {
            id: "1",
            orderItems: null
        }

        const validator = new Validator(rule)
        const actual = validator.validate(order)
        const expected: ValidationResult<Order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    errors: ["The minimum length for this field is 1."]
                }
            },
        }

        expect(actual).toEqual(expected)
    })
})
