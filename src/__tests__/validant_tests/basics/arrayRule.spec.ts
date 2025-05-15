import { validant, } from "../../../index"
import { ValidationRule } from "../../../types/ValidationRule"
import { ValidationResult } from "../../../validant"
import { arrayMinLen, maxNumber, minNumber, required } from "../../../rules"

interface Order {
    id: string
    orderItems: OrderItem[]
}

interface OrderItem {
    productId: number
    quantity: number
}

const rule: ValidationRule<Order> = {
    orderItems: {
        arrayRules: [arrayMinLen(1)],
        arrayItemRule: {
            productId: [
                required(),
            ],
            quantity: [
                minNumber(1, "Min qty is 1."),
                maxNumber(5)
            ],
        }
    }
}

describe("Validate null property", () => {
    it("Should return a valid validation result", () => {

        const order: Order = {
            id: "1",
            orderItems: []
        }

        const actual = validant.validate(order, rule)
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

describe("Validate null property", () => {
    it("Should return a valid validation result", () => {

        const order: Order = {
            id: "1",
            orderItems: [
                {
                    productId: 1,
                    quantity: 0
                }
            ]
        }

        const actual = validant.validate(order, rule)
        const expected: ValidationResult<Order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    errorsEach: [
                        {
                            index: 0,
                            validatedObject: {
                                productId: 1,
                                quantity: 0
                            },
                            errors: {
                                quantity: ["Min qty is 1."]
                            }
                        }
                    ]
                }
            },
        }

        expect(actual).toEqual(expected)
    })
})
