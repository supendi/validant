import { Validator, required, ValidationRule, ValidationResult, arrayMinLen } from "../../../index"

interface Product {
    name: string
    price: number
    subProducts?: Product[]
}

interface Order {
    orderItems: OrderItem[]
}

interface City {
    name: string
}

interface DeliveryAddress {
    street: string
    cities: City[]
}

interface OrderItem {
    id: string
    orderId?: string
    productId: number
    product?: Product
    quantity: number
    deliveryAddress: DeliveryAddress[]
}

const orderRule: ValidationRule<Order> = {
    orderItems: function build(orderItems, order) {
        return {
            arrayElementRule: {
                orderId: [required("required")],
                deliveryAddress: {
                    arrayElementRule: function test(deliveryAddress, order) {
                        return {
                            cities: function () {
                                return {
                                    arrayRules: [arrayMinLen(1)],
                                    arrayElementRule: function test(city, order1) {
                                        return {
                                            name: []
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}


describe("Validator Test The Custom Validator", () => {
    it("Custom validator test", () => {
        const order: Order = {
            orderItems: [
                {
                    id: "1",
                    productId: 1,
                    quantity: 2,
                    deliveryAddress: [
                        {
                            street: "",
                            cities: []
                        }
                    ]
                },
            ]
        }

        const validator = new Validator(orderRule)
        const actual = validator.validate(order)
        const expected: ValidationResult<Order> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                orderItems: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            attemptedValue: {
                                id: '1',
                                productId: 1,
                                quantity: 2,
                                deliveryAddress: [
                                    {
                                        street: "",
                                        cities: []
                                    }
                                ]
                            },
                            errors: {
                                orderId: [
                                    {
                                        errorMessage: "required",
                                        attemptedValue: undefined,
                                        ruleName: required.name
                                    }
                                ],
                                deliveryAddress: {
                                    arrayElementErrors: [
                                        {
                                            errors: {
                                                cities: {
                                                    arrayErrors: [
                                                        {
                                                            errorMessage: "The minimum length for this field is 1.",
                                                            attemptedValue: [],
                                                            ruleName: arrayMinLen.name
                                                        }
                                                    ]
                                                }
                                            },
                                            index: 0,
                                            attemptedValue: {
                                                cities: [],
                                                street: ""
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})
