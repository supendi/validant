"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ensure all the code below compiled
 */
describe("StringifiedValidationResult Test", () => {
    it("Should compile", () => {
        const validationResult = {
            isValid: true,
            errorMessage: "",
            errors: null,
            subErrors: null
        };
        expect(validationResult).not.toBeNull();
    });
});
describe("StringifiedValidationResult Test", () => {
    it("Should compile", () => {
        const validationResult = {
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
        };
        expect(validationResult).not.toBeNull();
    });
});
describe("StringifiedValidationResult Test", () => {
    it("Should compile", () => {
        const validationResult = {
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
        };
        expect(validationResult).not.toBeNull();
    });
});
