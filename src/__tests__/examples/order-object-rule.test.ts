import { arrayMinLen, elementOf, emailAddress, maxNumber, minNumber, required, ValidationResult, ValidationRule, Validator } from "../../index"

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

const errorMessage = "Validation failed. Please check and fix the errors to continue.";

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

        const validator = new Validator()
        const actual1 = validator.validate(orderWithEmptyItem, rule)
        const expected1: ValidationResult<Order> = {
            message: errorMessage,
            isValid: false,
            errors: {
                orderDate: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: null,
                        ruleName: required.name
                    }
                ],
                orderNumber: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                customer: {
                    id: [
                        {
                            errorMessage: `The value '1' is not an element of [${customerIds.join(", ")}].`,
                            attemptedValue: 1,
                            ruleName: elementOf.name
                        }
                    ],
                    email: [
                        {
                            errorMessage: "Invalid email address. The valid email example: john.doe@example.com.",
                            attemptedValue: "invalid",
                            ruleName: emailAddress.name
                        }
                    ],
                    name: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: "",
                            ruleName: required.name
                        }
                    ]
                },
                orderItems: {
                    arrayErrors: [
                        {
                            errorMessage: "The minimum length for this field is 4.",
                            attemptedValue: [],
                            ruleName: arrayMinLen.name
                        }
                    ],
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

        const validator = new Validator()
        const actual = validator.validate(order, rule)

        const expected: ValidationResult<Order> = {
            message: errorMessage,
            isValid: false,
            errors: {
                orderDate: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: null,
                        ruleName: required.name
                    }
                ],
                orderNumber: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                customer: {
                    id: [
                        {
                            errorMessage: `The value '1' is not an element of [${customerIds.join(", ")}].`,
                            attemptedValue: 1,
                            ruleName: elementOf.name
                        }
                    ],
                    email: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: "",
                            ruleName: required.name
                        },
                        {
                            errorMessage: "Invalid email address. The valid email example: john.doe@example.com.",
                            attemptedValue: "",
                            ruleName: emailAddress.name
                        }
                    ],
                    name: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: "",
                            ruleName: required.name
                        }
                    ]
                },
                orderItems: {
                    arrayErrors: [
                        {
                            errorMessage: "The minimum length for this field is 4.",
                            attemptedValue: order.orderItems,
                            ruleName: arrayMinLen.name
                        }
                    ],
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                productId: [
                                    {
                                        errorMessage: `The value '0' is not an element of [${productIds.join(", ")}].`,
                                        attemptedValue: 0,
                                        ruleName: elementOf.name
                                    }
                                ],
                                quantity: [
                                    {
                                        errorMessage: "The minimum value for this field is 1.",
                                        attemptedValue: 0,
                                        ruleName: minNumber.name
                                    }
                                ],
                            },
                            attemptedValue: order.orderItems[0]
                        },
                        {
                            index: 2,
                            errors: {
                                productId: [
                                    {
                                        errorMessage: `The value '6' is not an element of [${productIds.join(", ")}].`,
                                        attemptedValue: 6,
                                        ruleName: elementOf.name
                                    }
                                ],
                                quantity: [
                                    {
                                        errorMessage: "The maximum value for this field is 5.",
                                        attemptedValue: 12,
                                        ruleName: maxNumber.name
                                    }
                                ],
                            },
                            attemptedValue: order.orderItems[2]
                        },
                    ]
                }
            }
        }
        expect(actual).toEqual(expected)
    })
})