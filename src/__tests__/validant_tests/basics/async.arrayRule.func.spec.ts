import { AsyncValidator, AsyncValidationRule, ValidationResult, arrayMinLen, maxNumber, minNumber, required } from "../../../index"

interface Order {
    id: string
    orderItems: OrderItem[]
}

interface OrderItem {
    productId: number
    quantity: number
}

const fetchProductIdAsync = jest.fn(async (productId: number) => {
    const productIds = [1, 2, 3, 4, 5, 6]
    return new Promise((resolve) => {
        setTimeout(() => {
            const existingProductId = productIds.find(id => id === productId)
            if (existingProductId) {
                resolve(existingProductId);
            } else {
                resolve(undefined);
            }
        }, 100);
    });
});

const rule: AsyncValidationRule<Order> = {
    orderItems: function () {
        return {
            arrayRules: [arrayMinLen(1)],
            arrayElementRule: function () {
                return {
                    productId: [
                        required(),
                        async function (productId) {
                            const id = await fetchProductIdAsync(productId)
                            if (!id) {
                                return {
                                    ruleName: "unknownProductId",
                                    attemptedValue: productId,
                                    errorMessage: `Invalid product id ${productId}.`
                                }
                            }
                        }
                    ],
                    quantity: [
                        minNumber(1, "Min qty is 1."),
                        maxNumber(5)
                    ],
                }
            }
        }
    }
}

describe("ValidateAsync Test", () => {
    it("return errors", async () => {

        const order: Order = {
            id: "1",
            orderItems: []
        }

        const validator = new AsyncValidator(rule)
        const actual = await validator.validateAsync(order)
        const expected: ValidationResult<Order> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                orderItems: {
                    arrayErrors: [
                        {
                            errorMessage: "The minimum length for this field is 1.",
                            attemptedValue: [],
                            ruleName: arrayMinLen.name
                        }
                    ]
                }
            },
        }

        expect(actual).toEqual(expected)
    })
})

describe("Validate null property", () => {
    it("return errors", async () => {

        const order: Order = {
            id: "1",
            orderItems: []
        }

        const validator = new AsyncValidator(rule)
        const actual = await validator.validateAsync(order)
        const expected: ValidationResult<Order> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                orderItems: {
                    arrayErrors: [
                        {
                            errorMessage: "The minimum length for this field is 1.",
                            attemptedValue: [],
                            ruleName: arrayMinLen.name
                        }
                    ]
                }
            },
        }

        expect(actual).toEqual(expected)
    })
})

describe("ValidateAsync Test", () => {
    it("return product id errors", async () => {

        const order: Order = {
            id: "1",
            orderItems: [
                {
                    productId: 0,
                    quantity: 0
                }
            ]
        }

        const validator = new AsyncValidator(rule)
        const actual = await validator.validateAsync(order)
        const expected: ValidationResult<Order> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                orderItems: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            attemptedValue: {
                                productId: 0,
                                quantity: 0
                            },
                            errors: {
                                quantity: [
                                    {
                                        errorMessage: "Min qty is 1.",
                                        attemptedValue: 0,
                                        ruleName: minNumber.name
                                    }
                                ],
                                productId: [
                                    {
                                        errorMessage: "Invalid product id 0.",
                                        attemptedValue: 0,
                                        ruleName: "unknownProductId"
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
        }

        expect(actual).toEqual(expected)
    })
})
