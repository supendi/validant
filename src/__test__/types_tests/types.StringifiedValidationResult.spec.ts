import { StringifiedValidationResult } from "../../types"

/**
 * Ensure all the code below compiled
 */

describe("StringifiedValidationResult Test", () => {
    it("Should compile", () => {
        interface Product {
            name: string
            price: number
        }

        const validationResult: StringifiedValidationResult<Product> = {
            isValid: true,
            errorMessage: "",
            errors: null,
            subErrors: null
        }

        expect(validationResult).not.toBeNull()
    })
})


describe("StringifiedValidationResult Test", () => {
    it("Should compile", () => {
        interface Product {
            name: string
            price: number
            subProducts: Product[]
        }

        const validationResult: StringifiedValidationResult<Product> = {
            isValid: false,
            errorMessage: "There are errors",
            errors: {
                name: "name is required",
                price: "Price should be greater than 0",
                subProducts: {
                    errorMessage: "One or more validation error exist",
                    isValid: false,
                    subErrors: [
                        {
                            price: "The maximum price is 100",
                            subProducts: {
                                isValid: true,
                                errorMessage: ""
                            }
                        }
                    ]
                }
            },
        }

        expect(validationResult).not.toBeNull()
    })
})

describe("StringifiedValidationResult Test", () => {
    it("Should compile", () => {
        interface Product {
            name: string
            price: number
            subProducts?: Product[]
        }

        interface Order {
            id: string
            orderNumber: string
            orderDate: Date
            orderItems: OrderItem[]
        }

        interface OrderItem {
            id: string
            orderId: string
            productId: number
            product: Product
            quantity: number
        }

        const validationResult: StringifiedValidationResult<Order> = {
            isValid: false,
            errorMessage: "There are errors",
            errors: {
                // id: "", // ensure we can skip one or more fields
                orderDate: "Date cannot be back date",
                orderNumber: "Order number should be at least 3 chars",
                orderItems: {
                    errorMessage: "Please add one or more products",
                    isValid: false,
                    subErrors: [
                        {
                            // id: "", we dont need to validate order item id
                            // orderId: "", we also dont want to validate the order id 
                            quantity: "Quantity minimum is 1",
                            productId: "Invalid product id '1'",
                            product: {
                                name: "name is required",
                                price: "Price should be greater than 0",
                                subProducts: {
                                    errorMessage: "One or more validation error exist",
                                    isValid: false,
                                    subErrors: [
                                        {
                                            price: "The maximum price is 100",
                                            subProducts: {
                                                isValid: true,
                                                errorMessage: ""
                                            }
                                        }
                                    ]
                                }
                            },
                        }
                    ]
                },
            },
        }


        expect(validationResult).not.toBeNull()
    })
})
