import { ErrorOfArray } from "../../valty/types";


/**
 * Ensure all the code below are compiled
 */

describe("ErrorOfArray Test", () => {
    it("Should compile", () => {
        interface Product {
            name: string
            price: number
        }

        let productsErrors: ErrorOfArray<Product[]> = {
            errors: ["The minimum of selected products is 1"],
            errorsEach: [
                {
                    index: 0,
                    errors: {
                        name: ["Required"],
                        price: ["Required"],
                    },
                    validatedObject: {
                        name: "",
                        price: 0
                    }
                },
                {
                    index: 0,
                    errors: {
                        name: ["Product name should not contain number."],
                        price: ["Price maximum is 100."],
                    },
                    validatedObject: {
                        name: "ProductName1",
                        price: 120
                    }
                }
            ]
        }

        expect(productsErrors).not.toBeNull()
    })
})
