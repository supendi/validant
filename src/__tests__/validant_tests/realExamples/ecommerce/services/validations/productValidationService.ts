import { arrayMaxLen, arrayMinLen, minNumber, required, stringMinLen } from "../../../../../../rules"
import validant, { ValidationResult } from "../../../../../../validant"
import { AsyncValidationRule } from "../../../../../../types/AsyncValidationRule"
import { ProductPrice, ProductRequest } from "../repositories/productRepository"
import { UserRepository } from "../repositories/userRepository"

function sequentialPriceLevelRule(currentPriceItem: ProductPrice) {
    return function (level: number, product: ProductRequest) {
        if (!currentPriceItem) throw new Error("Product price cannot be null or undefined.")
        if (!product) throw new Error("Product cannot be null or undefined.")
        if (!product.prices) throw new Error("Product prices cannot be null or undefined.")

        // Checks if price level is sequential 
        const currentPriceItemIndex = product.prices.indexOf(currentPriceItem)
        const isFirstIndex = currentPriceItemIndex === 0

        // First index is ok: no comparer
        if (isFirstIndex) {
            return {
                isValid: true
            }
        }

        const prevPriceIndex = currentPriceItemIndex - 1
        const prevPrice = product.prices[prevPriceIndex]
        if (!prevPrice) throw new Error(`Previous price item is expected defined. But got: ${prevPrice}`)

        const expectedNextPriceLevel = prevPrice.level + 1
        const isValid = level === expectedNextPriceLevel
        if (!isValid) {
            return {
                isValid: false,
                errorMessage: `Current price level should be: ${expectedNextPriceLevel}`
            }
        }

        return {
            isValid: true
        }
    }
}

function userCanCreateProductRule(userRepository: UserRepository) {
    return async function (userEmail: string) {
        const user = await userRepository.getUserAsync(userEmail)
        if (!user) {
            return {
                isValid: false,
                errorMessage: `Invalid user email ${userEmail}.`
            }
        }

        if (user.type !== "tenant") {
            return {
                isValid: false,
                errorMessage: `User is not allowed to create product.`
            }
        }
        return {
            isValid: true
        }
    }
}

function buildProductRule(userRepository: UserRepository) {
    const productRequest: AsyncValidationRule<ProductRequest> = {
        productName: [
            required(),
            stringMinLen(3, "Product name should be at least 3 chars"),
        ],
        prices: {
            arrayRules: [
                required(),
                arrayMinLen(1, "Product has to be at least having 1 price."),
                arrayMaxLen(5, "Product prices maximum is 5 level."),
            ],
            arrayItemRule: function (currentPriceItem: ProductPrice, product: ProductRequest) {
                return {
                    level: [
                        required(),
                        minNumber(1, "Product level non 0 and a positive number."),
                        sequentialPriceLevelRule(currentPriceItem)
                    ]
                }
            }
        },
        userEmail: [
            userCanCreateProductRule(userRepository)
        ]
    }
    return productRequest
}

export interface ProductValidationService {
    validateAsync(request: ProductRequest): Promise<ValidationResult<ProductRequest>>
}

export function createProductValidationService(userRepository: UserRepository): ProductValidationService {
    async function validateAsync(request: ProductRequest) {
        const registrationRule = buildProductRule(userRepository)
        return validant.validateAsync(request, registrationRule, {
            errorMessage: "error",
            okMessage: "ok"
        })
    }
    return {
        validateAsync
    }
}

describe("Just to make jest not complaining about it should have a test.", () => {
    it("A helper file for testing", () => {
    })
})
