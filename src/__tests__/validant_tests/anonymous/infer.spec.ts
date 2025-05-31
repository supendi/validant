import { Validator, ValidationRule, ValidationResult, arrayMinLen, isNumber, maxNumber, minNumber, required } from "../../../index"

const order = {
    id: "1",
    orderItems: []
}

const rule: ValidationRule<typeof order> = {
    orderItems: {
        arrayRules: [arrayMinLen(1)],
        arrayElementRule: {
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

        const validator = new Validator(rule)
        const actual = validator.validate(order)
        const expected: ValidationResult<typeof order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    arrayErrors: [
                        {
                            errorMessage: "The minimum length for this field is 1.",
                            attemptedValue: [],
                            ruleName: arrayMinLen.name
                        }
                    ]
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

        const validator = new Validator(rule)
        const actual = validator.validate(order)
        const expected: ValidationResult<typeof order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            attemptedValue: {
                                productId: 1,
                                quantity: 0
                            },
                            errors: {
                                quantity: [
                                    {
                                        errorMessage: "Min qty is 1.",
                                        attemptedValue: 0,
                                        ruleName: minNumber.name
                                    }
                                ]
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

        const validator = new Validator(rule)
        const actual = () => validator.validate(order)
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
                arrayElementRule: {
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

        const validator = new Validator(newOrderRule)
        const actual = validator.validate(order)
        const expected: ValidationResult<typeof order> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                orderItems: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            attemptedValue: {
                                productId: "1",
                                quantity: "0"
                            },
                            errors: {
                                productId: [
                                    {
                                        errorMessage: "This field is not a valid number, type of value was: string.",
                                        attemptedValue: "1",
                                        ruleName: isNumber.name
                                    }
                                ],
                                quantity: [
                                    {
                                        errorMessage: "This field is not a valid number, type of value was: string.",
                                        attemptedValue: "0",
                                        ruleName: isNumber.name
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
        }


        expect(actual).toEqual(expected)
    })
})
