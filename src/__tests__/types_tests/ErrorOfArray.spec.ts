/**
 * Ensure all the code below are compiled
 */

import { ErrorOfArray } from "../../types/ErrorOf"

describe("ErrorOfArray Test", () => {
    it("Should compile", () => {
        interface Product {
            name: string
            price: number
        }

        let productsErrors: ErrorOfArray<Product[]> = {
            arrayErrors: [
                {
                    errorMessage: "The minimum of selected products is 1",
                    attemptedValue: undefined,
                    ruleName: "minCount"
                }
            ],
            arrayElementErrors: [
                {
                    index: 0,
                    errors: {
                        name: [
                            {
                                errorMessage: "Required",
                                attemptedValue: "",
                                ruleName: "required"
                            }
                        ],
                        price: [
                            {
                                errorMessage: "Required",
                                attemptedValue: 0,
                                ruleName: "required"
                            }
                        ],
                    },
                    attemptedValue: {
                        name: "",
                        price: 0
                    }
                },
                {
                    index: 0,
                    errors: {
                        name: [
                            {
                                errorMessage: "Product name should not contain number.",
                                attemptedValue: "ProductName1",
                                ruleName: "invalidName"
                            }
                        ],
                        price: [
                            {
                                errorMessage: "Price maximum is 100.",
                                attemptedValue: 120,
                                ruleName: "max"
                            }
                        ],
                    },
                    attemptedValue: {
                        name: "ProductName1",
                        price: 120
                    }
                }
            ]
        }

        expect(productsErrors).not.toBeNull()
    })
})