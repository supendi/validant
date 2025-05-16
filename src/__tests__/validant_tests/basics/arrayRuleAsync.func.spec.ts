import { validant, } from "../../../index"
import { ValidationResult } from "../../../validant"
import { arrayMinLen, maxNumber, minNumber, required } from "../../../rules"
import { AsyncValidationRule } from "../../../types/AsyncValidationRule"

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
            arrayItemRule: function () {
                return {
                    productId: [
                        required(),
                        async function (productId) {
                            const id = await fetchProductIdAsync(productId)
                            if (!id) {
                                return {
                                    isValid: false,
                                    errorMessage: `Invalid product id ${productId}.`
                                }
                            }
                            return {
                                isValid: true
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

        const actual = await validant.validateAsync(order, rule)
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
    it("return errors", async () => {

        const order: Order = {
            id: "1",
            orderItems: []
        }

        const actual = await validant.validateAsync(order, rule)
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

        const actual = await validant.validateAsync(order, rule)
        const expected: ValidationResult<Order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    errorsEach: [
                        {
                            index: 0,
                            validatedObject: {
                                productId: 0,
                                quantity: 0
                            },
                            errors: {
                                quantity: ["Min qty is 1."],
                                productId: [`Invalid product id ${0}.`]
                            }
                        }
                    ]
                }
            },
        }

        expect(actual).toEqual(expected)
    })
})
