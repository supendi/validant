import { Validator, arrayMinLen, emailAddress, minNumber, required, ValidationResult, ValidationRule, elementOf, maxNumber } from "../../../index"

interface Product {
    name: string
    price: number
    subProducts?: Product[]
}

interface Customer {
    id: number
    name: string
    email: string
}

interface Order {
    id: string
    customer: Customer
    orderNumber: string
    orderDate: Date | null
    orderItems: OrderItem[]
}

interface OrderItem {
    id: string
    orderId?: string
    productId: number
    product?: Product
    quantity: number
}

const productIds = [1, 2, 3, 4, 5]
const customerIds = [10, 11, 12, 13]

const orderItemsRule: ValidationRule<OrderItem, Order> = {
    productId: [required(), elementOf(productIds)],
    quantity: [minNumber(1), maxNumber(5)],
}

const rule: ValidationRule<Order> = {
    orderDate: [required()],
    orderNumber: [required()],
    customer: {
        id: [required(), elementOf(customerIds)],
        name: [required()],
        email: [required(), emailAddress()]
    },
    orderItems: {
        arrayRules: [arrayMinLen(4)],
        arrayElementRule: orderItemsRule
    }
}

describe("Validator another order, this time a valid order", () => {
    it("return a valid validation result", () => {

        const newOrder: Order = {
            id: "1",
            orderDate: new Date(),
            orderNumber: "ORD/0001",
            customer: {
                id: 10,
                email: "invalid@email.com",
                name: "Agung"
            },
            orderItems: [
                {
                    id: "1",
                    orderId: "1",
                    productId: 1,
                    quantity: 2,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 1,
                    quantity: 5,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 1,
                    quantity: 5,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 2,
                    quantity: 5,
                },
            ]
        }

        const validator = new Validator(rule)
        const actual = validator.validate(newOrder)
        const expected: ValidationResult<Order> = {
            message: "Validation successful.",
            isValid: true,
            errors: undefined,
        }

        expect(actual).toEqual(expected)
    })
})
