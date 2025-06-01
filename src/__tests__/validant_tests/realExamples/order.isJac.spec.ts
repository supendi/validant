import { arrayMinLen, emailAddress, minNumber, required, ValidationResult, ValidationRule, Validator } from "../../../index"


const defaultMessage = { okMessage: "Validation successful.", errorMessage: "Validation failed. Please check and fix the errors to continue." }

interface Customer {
    fullName: string
    email: string
}

interface OrderItem {
    productId: number
    quantity: number
}

interface OrderRequest {
    orderNumber: string
    orderDate?: Date
    customer: Customer
    orderItems: OrderItem[]
}

const orderRule: ValidationRule<OrderRequest> = {
    orderNumber: [required("Order number is required.")],
    orderDate: [required("Please enter order date.")],
    customer: {
        fullName: [required()],
        email: [
            required(),
            emailAddress()
        ],
    },
    orderItems: {
        arrayRules: [arrayMinLen(1, "Please add at least one product.")],
        arrayElementRule: {
            productId: [required("Please enter product.")],
            quantity: [
                minNumber(1, "Minimum quantity is 1."),
                function (quantity, order) {

                    // Case:
                    // When customer first 3 letters contains : Jac ignore invariant
                    // Then Max Quantity = 100
                    // So  Jack, Jacob, Jacky, Jacka will get this special max quantity
                    // 
                    // Other than that
                    // Max quantity = 10

                    // Accessing other properties via order
                    const customerName = order.customer.fullName
                    const isJac = order.customer.fullName.toLowerCase().startsWith("jac");

                    const maxQuantityForJac = 100
                    const maxQuantityForOthers = 10

                    const isValidQuantityForJac = quantity <= maxQuantityForJac
                    const isValidQuantityForOthers = quantity <= maxQuantityForOthers

                    if (isJac) {
                        if (!isValidQuantityForJac) {
                            return {
                                ruleName: "isJac",
                                attemptedValue: quantity,
                                errorMessage: `You are special ${customerName}, other's max quantity is limited to ${maxQuantityForOthers}. Yours is limited to, but ${maxQuantityForJac} pcs.`
                            }
                        }
                    }

                    if (!isValidQuantityForOthers) {
                        return {
                            ruleName: "isJac",
                            attemptedValue: quantity,
                            errorMessage: `You only allowed to order ${maxQuantityForOthers} product at once.`
                        }
                    }
                }
            ]
        }
    }
}

describe("Validate Order Request with empty order items", () => {
    it("Return error product minimum quantity", () => {

        const orderRequest: OrderRequest = {
            orderNumber: "",
            customer: {
                email: "",
                fullName: ""
            },
            orderItems: []
        }

        const validator = new Validator(orderRule)
        const actual = validator.validate(orderRequest)

        const expected: ValidationResult<OrderRequest> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderNumber: [
                    {
                        errorMessage: "Order number is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                orderDate: [
                    {
                        errorMessage: "Please enter order date.",
                        attemptedValue: undefined,
                        ruleName: required.name
                    }
                ],
                customer: {
                    fullName: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: "",
                            ruleName: required.name
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
                    ]
                },
                orderItems: {
                    arrayErrors: [
                        {
                            errorMessage: "Please add at least one product.",
                            attemptedValue: [],
                            ruleName: arrayMinLen.name
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("Validate Order Request With Max order item quantity", () => {
    it("Return error product maximum quantity for non Jac", () => {

        const orderRequest: OrderRequest = {
            orderNumber: "",
            customer: {
                email: "",
                fullName: ""
            },
            orderItems: [
                {
                    productId: 0,
                    quantity: 16
                }
            ]
        }

        const validator = new Validator(orderRule)
        const actual = validator.validate(orderRequest)

        const expected: ValidationResult<OrderRequest> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderNumber: [
                    {
                        errorMessage: "Order number is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                orderDate: [
                    {
                        errorMessage: "Please enter order date.",
                        attemptedValue: undefined,
                        ruleName: required.name
                    }
                ],
                customer: {
                    fullName: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: "",
                            ruleName: required.name
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
                    ]
                },
                orderItems: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            attemptedValue: orderRequest.orderItems[0],
                            errors: {
                                quantity: [
                                    {
                                        errorMessage: "You only allowed to order 10 product at once.",
                                        attemptedValue: 16,
                                        ruleName: "isJac"
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})


describe("Jacky Chan Order Request", () => {
    it("Return error product maximum quantity for Jac variants", () => {

        const orderRequest: OrderRequest = {
            orderNumber: "",
            customer: {
                email: "",
                fullName: "JaCkY chan"
            },
            orderItems: [
                {
                    productId: 0,
                    quantity: 120
                }
            ]
        }

        const validator = new Validator(orderRule)
        const actual = validator.validate(orderRequest)

        const expected: ValidationResult<OrderRequest> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderNumber: [
                    {
                        errorMessage: "Order number is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                orderDate: [
                    {
                        errorMessage: "Please enter order date.",
                        attemptedValue: undefined,
                        ruleName: required.name
                    }
                ],
                customer: {
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
                    ]
                },
                orderItems: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            attemptedValue: orderRequest.orderItems[0],
                            errors: {
                                quantity: [
                                    {
                                        errorMessage: "You are special JaCkY chan, other's max quantity is limited to 10. Yours is limited to, but 100 pcs.",
                                        attemptedValue: 120,
                                        ruleName: "isJac"
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})