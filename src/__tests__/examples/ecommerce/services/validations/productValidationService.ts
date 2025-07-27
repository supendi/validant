import { AsyncValidator, AsyncValidationRule, required, ValidationResult, minNumber, arrayMinLen, stringMinLen, arrayMaxLen } from "../../../../../index"
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
            return
        }

        const prevPriceIndex = currentPriceItemIndex - 1
        const prevPrice = product.prices[prevPriceIndex]
        if (!prevPrice) throw new Error(`Previous price item is expected defined. But got: ${prevPrice}`)

        const expectedNextPriceLevel = prevPrice.level + 1
        const isValid = level === expectedNextPriceLevel
        if (!isValid) {
            return {
                ruleName: sequentialPriceLevelRule.name,
                attemptedValue: level,
                errorMessage: `Price level should be sequential. And the current price level should be: ${expectedNextPriceLevel}, but got ${level}`
            }
        }
    }
}

function userCanCreateProductRule(userRepository: UserRepository) {
    return async function (userEmail: string) {
        const user = await userRepository.getUserAsync(userEmail)
        if (!user) {
            return {
                ruleName: userCanCreateProductRule.name,
                attemptedValue: userEmail,
                errorMessage: `Invalid user email ${userEmail}.`
            }
        }

        if (user.userType !== "tenant") {
            return {
                ruleName: userCanCreateProductRule.name,
                attemptedValue: userEmail,
                errorMessage: `User is not allowed to create product.`
            }
        }
    }
}

function noDuplicatePriceLevelRule() {
    return function (prices: ProductPrice[], product: ProductRequest) {
        for (let index = 0; index < prices.length; index++) {
            const productPrice = prices[index];
            const isDuplicatePrice = prices.filter(x => x.level === productPrice.level && x.price === productPrice.price).length > 1
            if (isDuplicatePrice) {
                return {
                    ruleName: noDuplicatePriceLevelRule.name,
                    attemptedValue: prices,
                    errorMessage: `Duplicate price ${productPrice.price} and level ${productPrice.level}. At index ${index}.`
                }
            }
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
                noDuplicatePriceLevelRule()
            ],
            arrayElementRule: function (currentPriceItem: ProductPrice, product: ProductRequest) {
                return {
                    level: [
                        required(),
                        minNumber(1, "Product level is a non 0 and positive number."),
                        sequentialPriceLevelRule(currentPriceItem)
                    ],
                    price: [
                        required(),
                        minNumber(1, "Minimum price is at least $1.")
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
        const productRule = buildProductRule(userRepository)

        const validator = new AsyncValidator({
            validationMessage: {
                errorMessage: "error",
                successMessage: "ok"
            }
        })
        return validator.validateAsync(request, productRule)
    }
    return {
        validateAsync
    }
}

describe("Just to make jest not complaining about it should have a test.", () => {
    it("A helper file for testing", () => {
    })
})
