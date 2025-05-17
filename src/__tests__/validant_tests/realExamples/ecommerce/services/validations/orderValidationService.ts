import { emailAddress, isDateObject, maxNumber, minNumber, required } from "../../../../../../rules"
import { validant, ValidationResult } from "../../../../../../validant"
import { AsyncValidationRule } from "../../../../../../types/AsyncValidationRule"
import { UserRepository } from "../repositories/userRepository"
import { OrderItemRequest, OrderRequest } from "../repositories/orderRepository"
import { ProductRepository } from "../repositories/productRepository"

function isValidUser(userRepository: UserRepository) {
    return async (userEmail: string) => {
        if (!userEmail) { // skip checking if not provided
            return {
                isValid: true
            }
        }
        const user = await userRepository.getUserAsync(userEmail)
        if (!user) {
            return {
                isValid: false,
                errorMessage: `Invalid user ${userEmail}`
            }
        }
        return {
            isValid: true
        }
    }
}

function isValidProductRule(productRepository: ProductRepository) {
    return async function (productId: number) {
        const product = await productRepository.getProductByIdAsync(productId)
        if (!product) {
            return {
                isValid: false,
                errorMessage: `Product id ${productId} is invalid.`
            }
        }
        return {
            isValid: true
        }
    }
}

function discountExceedOrderItemAmountRule(currentOrderItem: OrderItemRequest) {
    return function (discountAmount: number) {
        const isValid = discountAmount <= currentOrderItem.amount
        if (!isValid) {
            return {
                isValid: false,
                errorMessage: "Discount amount can't be greater than the item amount itself, are you doing a business or charity?"
            }
        }

        return {
            isValid: true
        }
    }
}

function buildOrderRule(userRepository: UserRepository, productRepository: ProductRepository) {
    const orderRequest: AsyncValidationRule<OrderRequest> = {
        orderDate: [
            required(),
            isDateObject()
        ],
        userEmail: [
            required(),
            emailAddress(),
            isValidUser(userRepository),
        ],
        customer: {
            fullName: [required()],
            email: [required()],
        },
        orderItems: {
            arrayRules: [required("Please add at least an item")],
            arrayItemRule: function (currentOrderItem, order) {
                return {
                    productId: [
                        required("Please enter product id."),
                        isValidProductRule(productRepository)
                    ],
                    qty: [
                        minNumber(1),
                        maxNumber(10),
                    ],
                    price: [
                        minNumber(1),
                        maxNumber(10000000000000)
                    ],
                    amount: [
                        minNumber(1),
                        maxNumber(10000000000000)
                    ],
                    discountPercentage: [
                        minNumber(0, "What will happen if a discount percentage is -10%? I cant let you do that."),
                        maxNumber(30, "Can't be more than 30 percent of discount. Our boss is watching."),
                    ],
                    discountAmount: [
                        discountExceedOrderItemAmountRule(currentOrderItem),
                        maxNumber(10000000000000)
                    ],
                    subtotal: [
                        minNumber(1),
                        maxNumber(10000000000000)
                    ],
                }
            }
        },
        totalAmount: [minNumber(1)],
        gst: [required()],
    }
    return orderRequest
}

export interface OrderValidationService {
    validateAsync(request: OrderRequest): Promise<ValidationResult<OrderRequest>>
}

export function createOrderValidationService(userRepository: UserRepository, productRepository: ProductRepository): OrderValidationService {
    async function validateAsync(request: OrderRequest) {
        const registrationRule = buildOrderRule(userRepository, productRepository)
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
