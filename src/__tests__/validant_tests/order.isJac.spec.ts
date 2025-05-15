import { validant, } from "../../index"
import { ValidationRule } from "../../types"
import { ValidationResult } from "../../validant"
import { emailAddress, arrayMinLen, required, minNumber } from "../../rules"

const defaultMessage = { okMessage: "Good to go.", errorMessage: "One or more validation errors occurred." }

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
        arrayItemRule: {
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

                    if (isJac) {
                        return {
                            isValid: quantity <= maxQuantityForJac,
                            errorMessage: `You are special ${customerName}, other's max quantity is limited to ${maxQuantityForOthers}. Yours is limited to, but ${maxQuantityForJac} pcs.`
                        }
                    }
                    return {
                        isValid: quantity <= maxQuantityForOthers,
                        errorMessage: `You only allowed to order ${maxQuantityForOthers} product at once.`
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

        const actual = validant.validate(orderRequest, orderRule)

        const expected: ValidationResult<OrderRequest> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderNumber: ["Order number is required."],
                orderDate: ["Please enter order date."],
                customer: {
                    fullName: ["This field is required."],
                    email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."]
                },
                orderItems: {
                    errors: ["Please add at least one product."]
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

        const actual = validant.validate(orderRequest, orderRule)

        const expected: ValidationResult<OrderRequest> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderNumber: ["Order number is required."],
                orderDate: ["Please enter order date."],
                customer: {
                    fullName: ["This field is required."],
                    email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."]
                },
                orderItems: {
                    errorsEach: [
                        {
                            index: 0,
                            validatedObject: orderRequest.orderItems[0],
                            errors: {
                                quantity: ["You only allowed to order 10 product at once."]
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

        const actual = validant.validate(orderRequest, orderRule)

        const expected: ValidationResult<OrderRequest> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderNumber: ["Order number is required."],
                orderDate: ["Please enter order date."],
                customer: {
                    email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."]
                },
                orderItems: {
                    errorsEach: [
                        {
                            index: 0,
                            validatedObject: orderRequest.orderItems[0],
                            errors: {
                                quantity: ["You are special JaCkY chan, other's max quantity is limited to 10. Yours is limited to, but 100 pcs."]
                            }
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})