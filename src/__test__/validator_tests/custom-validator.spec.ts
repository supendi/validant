import { ValidatorFunc } from "../../types"
import { custom } from "../../validators/custom-validator"

describe("CustomValidator Test", () => {
    it("Test simple custom validator", () => {
        function hoc<T, U>() {
            const maximumNumberIsOneValidator: ValidatorFunc<T, U> = (value, object) => {
                if (value === undefined || value === null) {
                    return false
                }
                const typeofValue = typeof (value)
                const valueIsNumber = typeofValue === "bigint" || typeofValue === "number"
                if (!valueIsNumber) {
                    return false
                }
                return (value as unknown as number) <= 1
            }
            return maximumNumberIsOneValidator
        }
        const errorMessage = "There is error."
        const customValidator = custom(hoc(), errorMessage)

        expect(customValidator).not.toBeUndefined()
        expect(customValidator.validate).not.toBeUndefined()
        expect(customValidator.returningErrorMessage).toEqual(errorMessage)

        let input = undefined
        let isValid = customValidator.validate(input)
        expect(isValid).toEqual(false)

        input = "undefined"
        isValid = customValidator.validate(input)
        expect(isValid).toEqual(false)

        input = ""
        isValid = customValidator.validate(input)
        expect(isValid).toEqual(false)

        input = "1"
        isValid = customValidator.validate(input)
        expect(isValid).toEqual(false)

        input = 2
        isValid = customValidator.validate(input)
        expect(isValid).toEqual(false)

        input = false
        isValid = customValidator.validate(input)
        expect(isValid).toEqual(false)

        input = function () { }
        isValid = customValidator.validate(input)
        expect(isValid).toEqual(false)

        input = 1
        isValid = customValidator.validate(input)
        expect(isValid).toEqual(true)

        input = 0
        isValid = customValidator.validate(input)
        expect(isValid).toEqual(true)

        input = 0
        isValid = customValidator.validate(input)
        expect(isValid).toEqual(true)
    })
})


describe("CustomValidator Test", () => {
    it("Test custom validator against complex type", () => {
        interface Order {
            number: number
            orderItems: OrderItem[]
        }
        interface OrderItem {
            qty: number
        }
        const order: Order = {
            number: 1,
            orderItems: [
                {
                    qty: 1
                },
                {
                    qty: 2
                },
                {
                    qty: -1
                }
            ]
        }

        const guardAgainstMinusQuantityValidator: ValidatorFunc<unknown, Order> = (value, object) => {
            if (!object) {
                return false
            }

            for (let index = 0; index < object.orderItems.length; index++) {
                const orderItem = object.orderItems[index];
                if (orderItem.qty < 0) {
                    return false
                }
            }
            return true
        }

        const errorMessage = "There is error."
        const customValidator = custom(guardAgainstMinusQuantityValidator, errorMessage)

        expect(customValidator).not.toBeUndefined()
        expect(customValidator.validate).not.toBeUndefined()
        expect(customValidator.returningErrorMessage).toEqual(errorMessage)

        let inputValue = undefined
        let isValid = customValidator.validate(inputValue)
        expect(isValid).toEqual(false)

        inputValue = undefined
        isValid = customValidator.validate(inputValue)
        expect(isValid).toEqual(false)

        inputValue = undefined
        isValid = customValidator.validate(inputValue, order)
        expect(isValid).toEqual(false)
    })
})
