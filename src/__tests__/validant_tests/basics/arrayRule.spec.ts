import { Validator, ValidationRule, ValidationResult, arrayMinLen, maxNumber, minNumber, required } from "../../../index"

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
        arrayElementRule: {
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

        const validator = new Validator(rule)
        const actual = validator.validate(order)
        const expected: ValidationResult<Order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    arrayErrors: ["The minimum length for this field is 1."]
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

        const validator = new Validator(rule)
        const actual = validator.validate(order)
        const expected: ValidationResult<Order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    arrayElementErrors: [
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
