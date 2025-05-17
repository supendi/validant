import { validant, } from "../../../index"
import { ValidationRule } from "../../../types/ValidationRule"
import { ValidationResult } from "../../../validant"
import { arrayMinLen, isNumber, maxNumber, minNumber, required } from "../../../rules"

const order = {
    id: "1",
    orderItems: []
}

const rule: ValidationRule<typeof order> = {
    orderItems: {
        arrayRules: [arrayMinLen(1)],
        arrayItemRule: {
            productId: [
                isNumber(),
                required(),
            ],
            quantity: [
                isNumber(),
                minNumber(1, "Min qty is 1."),
                maxNumber(5)
            ],
        }
    }
}

describe("Validate Inferred", () => {
    it("return errors", () => {

        const actual = validant.validate(order, rule)
        const expected: ValidationResult<typeof order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    errors: ["The minimum length for this field is 1."]
                }
            },
        }

        expect(actual).toEqual(expected)
    })
})

describe("Validate Inferred", () => {
    it("return errors", () => {

        const order = {
            id: "1",
            orderItems: [
                {
                    productId: 1,
                    quantity: 0
                }
            ]
        }

        const actual = validant.validate(order, rule)
        const expected: ValidationResult<typeof order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    errorsEach: [
                        {
                            index: 0,
                            validatedObject: {
                                productId: 1,
                                quantity: 0
                            },
                            errors: {
                                quantity: ["Min qty is 1."]
                            }
                        }
                    ]
                }
            },
        }

        expect(actual).toEqual(expected)
    })
})

describe("Validate Inferred", () => {
    it("throws error : trying to validate string with min number.", () => {

        const order = {
            id: "1",
            orderItems: [
                {
                    productId: "1",
                    quantity: "0"
                }
            ]
        }

        const actual = () => validant.validate(order, rule)
        const error = new Error("minNumber: Value is not a number. The value was: 0 (type: 'string')")

        expect(actual).toThrow(error)
    })
})

describe("Validate Inferred", () => {
    it("return errors", () => {

        const order = {
            id: "1",
            orderItems: [
                {
                    productId: "1",
                    quantity: "0"
                }
            ]
        }

        const newOrderRule: ValidationRule<typeof order> = {
            orderItems: {
                arrayRules: [arrayMinLen(1)],
                arrayItemRule: {
                    productId: [
                        isNumber(),
                        required(),
                    ],
                    quantity: [
                        isNumber()
                    ],
                }
            }
        }

        const actual = validant.validate(order, newOrderRule)
        const expected: ValidationResult<typeof order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    errorsEach: [
                        {
                            index: 0,
                            validatedObject: {
                                productId: "1",
                                quantity: "0"
                            },
                            errors: {
                                productId: ["This field is not a valid number, type of value was: string."],
                                quantity: ["This field is not a valid number, type of value was: string."]
                            }
                        }
                    ]
                }
            },
        }


        expect(actual).toEqual(expected)
    })
})
