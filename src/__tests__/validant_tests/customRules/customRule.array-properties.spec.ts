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
            arrayItemRule: {
                orderId: [required("required")],
                deliveryAddress: {
                    arrayItemRule: function test(deliveryAddress, order) {
                        return {
                            cities: function () {
                                return {
                                    arrayRules: [arrayMinLen(1)],
                                    arrayItemRule: function test(city, order1) {
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
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    errorsEach: [
                        {
                            index: 0,
                            validatedObject: {
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
                                orderId: ["required"],
                                deliveryAddress: {
                                    errorsEach: [
                                        {
                                            errors: {
                                                cities: {
                                                    errors: ["The minimum length for this field is 1."]
                                                }
                                            },
                                            index: 0,
                                            validatedObject: {
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
