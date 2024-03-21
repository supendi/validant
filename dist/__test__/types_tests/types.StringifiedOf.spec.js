"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ensure all the code below compiled
 */
describe("StringifiedErrorOf Simple Person Test", () => {
    it("Should compile", () => {
        const actual = {
            age: "",
            name: ""
        };
        expect(!actual).not.toBeNull();
    });
});
describe("StringifiedErrorOf Complex Person Test", () => {
    it("Should compile", () => {
        const actual = {
            age: "Minimum age is 18",
            name: "The name field is required",
            birthDate: "birt date is required",
            children: {
                errorMessage: "Please add at least one child",
                errors: [
                    {
                        age: "Min Number is 6",
                        birthDate: "birt date is requred",
                        name: "Minimumm char length for name is 2 chars",
                    }
                ],
                isValid: false
            }
        };
        expect(actual).not.toBeNull();
    });
});
describe("StringifiedErrorOf Complex Order Test", () => {
    it("Should compile", () => {
        const actual = {
            // id: "", // ensure we can skip one or more fields
            orderDate: "Date cannot be back date",
            orderNumber: "Order number should be at least 3 chars",
            orderItems: {
                errorMessage: "Please add one or more products",
                errors: [
                    {
                        // id: "", we dont need to validate order item id
                        // orderId: "", we also dont want to validate the order id 
                        productId: "Invalid product id '1'",
                        product: {
                            name: "name is required",
                            price: "Price should be greater than 0",
                            subProducts: {
                                errorMessage: "One or more validation error exist",
                                isValid: false,
                                errors: [
                                    {
                                        price: "The maximum price is 100",
                                        subProducts: {
                                            errorMessage: "",
                                            errors: [],
                                            isValid: true,
                                        }
                                    }
                                ]
                            }
                        },
                        quantity: ""
                    }
                ],
                isValid: false
            }
        };
        expect(!actual).not.toBeNull();
    });
});
