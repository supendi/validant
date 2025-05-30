import { AsyncValidator, AsyncValidationRule, emailAddress, required, ValidationResult, isDateObject, minNumber, maxNumber } from "../../../../../../index"
import { UserRepository } from "../repositories/userRepository"
import { OrderItemRequest, OrderRequest } from "../repositories/orderRepository"
import { ProductRepository } from "../repositories/productRepository"

function isValidUser(userRepository: UserRepository) {
    return async (userEmail: string) => {
        if (!userEmail) { // skip checking if not provided
            return
        }
        const user = await userRepository.getUserAsync(userEmail)
        if (!user) {
            return {
                ruleName: isValidUser.name,
                attemptedValue: userEmail,
                errorMessage: `Invalid user ${userEmail}`
            }
        }
    }
}

function isValidProductRule(productRepository: ProductRepository) {
    return async function (productId: number) {
        const product = await productRepository.getProductByIdAsync(productId)
        if (!product) {
            return {
                ruleName: isValidUser.name,
                attemptedValue: productId,
                errorMessage: `Product id ${productId} is invalid.`
            }
        }
    }
}

function discountExceedOrderItemAmountRule(currentOrderItem: OrderItemRequest) {
    return function (discountAmount: number) {
        const isValid = discountAmount <= currentOrderItem.amount
        if (!isValid) {
            return {
                ruleName: discountExceedOrderItemAmountRule.name,
                attemptedValue: discountAmount,
                errorMessage: "Discount amount can't be greater than the item amount itself, are you doing a business or charity?"
            }
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
            arrayElementRule: function (currentOrderItem, order) {
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
        const orderRule = buildOrderRule(userRepository, productRepository)

        const validator = new AsyncValidator(orderRule)
        return validator.validateAsync(request, {
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
