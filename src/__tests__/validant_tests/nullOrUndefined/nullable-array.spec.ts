import { validant, } from "../../../index"
import { ValidationRule } from "../../../types/ValidationRule"
import { ValidationResult } from "../../../validant"
import { arrayMinLen, elementOf, maxNumber, minNumber, required } from "../../../rules"

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

        const newOrder1: Order = {
            id: "1",
            orderItems: null
        }

        const actual1 = validant.validate(newOrder1, rule)
        const expected1: ValidationResult<Order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    errors: ["The minimum length for this field is 1."]
                }
            },
        }

        expect(actual1).toEqual(expected1)
    })
})
