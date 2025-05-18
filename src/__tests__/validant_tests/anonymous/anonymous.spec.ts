import { Validator, ValidationRule, ValidationResult, arrayMinLen, isNumber, maxNumber, minNumber, required } from "../../../index"

const rule = {
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

describe("Validate Anonymous", () => {
    it("return errors", () => {

        const order = {
            orderItems: []
        }

        const validator = new Validator(rule)
        const actual = validator.validate(order)
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

describe("Validate Anonymous", () => {
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

describe("Validate Anonymous", () => {
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

        // I cant do literal object for isolatedRule => const isolatedRule {
        // tsc will fails the minNumber rule, it compares string and number.
        // so ValidationRule<any> is the equivalent to literal object
        const isolatedRule: ValidationRule<any> = {
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
        const validator = new Validator(isolatedRule)
        const actual = () => validator.validate(order)
        const error = new Error("minNumber: Value is not a number. The value was: 0 (type: 'string')")

        expect(actual).toThrow(error)
    })
})