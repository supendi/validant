import { ValidatorFunc } from "../../types"
import { custom } from "../../validators/custom-validator"

describe("CustomValidator Test", () => {
    it("Test simple custom validator", () => {
        const maximumNumberIsOneValidator: ValidatorFunc = (value, object) => {
            if (value === undefined || value === null) {
                return false
            }
            const typeofValue = typeof (value)
            const valueIsNumber = typeofValue === "bigint" || typeofValue === "number"
            if (!valueIsNumber) {
                return false
            }
            return value <= 1
        }
        const errorMessage = "There is error."
        const validator = custom(maximumNumberIsOneValidator, errorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(errorMessage)

        let input = undefined
        let isValid = validator.validate(input)
        expect(isValid).toEqual(false)

        input = "undefined"
        isValid = validator.validate(input)
        expect(isValid).toEqual(false)

        input = ""
        isValid = validator.validate(input)
        expect(isValid).toEqual(false)

        input = "1"
        isValid = validator.validate(input)
        expect(isValid).toEqual(false)

        input = 2
        isValid = validator.validate(input)
        expect(isValid).toEqual(false)

        input = false
        isValid = validator.validate(input)
        expect(isValid).toEqual(false)

        input = function () { }
        isValid = validator.validate(input)
        expect(isValid).toEqual(false)

        input = 1
        isValid = validator.validate(input)
        expect(isValid).toEqual(true)

        input = 0
        isValid = validator.validate(input)
        expect(isValid).toEqual(true)

        input = 0
        isValid = validator.validate(input)
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

        const guardAgainstMinusValidator: ValidatorFunc = (value, object) => {
            if (!object) {
                return false
            }
            const isOrderObject = !!object.number && object.orderItems
            if (!isOrderObject) {
                return false
            }
            const order = object as Order
            for (let index = 0; index < order.orderItems.length; index++) {
                const orderItem = order.orderItems[index];
                if (orderItem.qty < 0) {
                    return false
                }
            }
            return true
        }

        const errorMessage = "There is error."
        const validator = custom(guardAgainstMinusValidator, errorMessage)

        expect(validator).not.toBeUndefined()
        expect(validator.validate).not.toBeUndefined()
        expect(validator.returningErrorMessage).toEqual(errorMessage)

        let inputValue = undefined
        let isValid = validator.validate(inputValue)
        expect(isValid).toEqual(false)

        inputValue = undefined
        isValid = validator.validate(inputValue)
        expect(isValid).toEqual(false)

        inputValue = undefined
        isValid = validator.validate(inputValue, order)
        expect(isValid).toEqual(false)
    })
})
