import { arrayMinLen, elementOf, emailAddress, maxNumber, minNumber, required } from "../../../rules"
import { ValidationRule } from "../../../types/ValidationRule"
import validant, { ValidationResult } from "../../../validant"

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
        arrayItemRule: orderItemsRule
    }
}

const errorMessage = "One or more validation errors occurred.";

describe("Validate empty order items", () => {
    it("Should return errors", () => { 
        const orderWithEmptyItem: Order = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            customer: {
                id: 1,
                email: "invalid",
                name: ""
            },
            orderItems: []
        }

        const actual1 = validant.validate(orderWithEmptyItem, rule)
        const expected1: ValidationResult<Order> = {
            message: errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                customer: {
                    id: ["The value '1' is not an element of [10, 11, 12, 13]."],
                    email: ["Invalid email address. The valid email example: john.doe@example.com."],
                    name: ["This field is required."]
                },
                orderItems: {
                    errors: ["The minimum length for this field is 4."],
                }
            }
        }

        expect(actual1).toEqual(expected1)
    })
})

describe("Validate empty order items", () => {
    it("Should return errors", () => { 
        const order: Order = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            customer: {
                id: 1,
                email: "",
                name: ""
            },
            orderItems: [
                {
                    id: "1",
                    orderId: "1",
                    productId: 0,
                    quantity: 0,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 5,
                    quantity: 5,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 6,
                    quantity: 12,
                },
            ]
        }
        const actual = validant.validate(order, rule)
        const expected: ValidationResult<Order> = {
            message: errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                customer: {
                    id: ["The value '1' is not an element of [10, 11, 12, 13]."],
                    email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."],
                    name: ["This field is required."]
                },
                orderItems: {
                    errors: ["The minimum length for this field is 4."],
                    errorsEach: [
                        {
                            index: 0,
                            errors: {
                                productId: ["The value '0' is not an element of [1, 2, 3, 4, 5]."],
                                quantity: ["The minimum value for this field is 1."],
                            },
                            validatedObject: order.orderItems[0]
                        },
                        {
                            index: 2,
                            errors: {
                                productId: ["The value '6' is not an element of [1, 2, 3, 4, 5]."],
                                quantity: ["The maximum value for this field is 5."],
                            },
                            validatedObject: order.orderItems[2]
                        },
                    ]
                }
            }
        }
        expect(actual).toEqual(expected)
    })
})