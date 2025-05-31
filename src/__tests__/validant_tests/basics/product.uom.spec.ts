import { arrayMinLen, minNumber, required, ValidationResult, ValidationRule, Validator } from "../../../index"

interface Product {
    name?: string
    units?: Unit[]
}

interface Unit {
    name: string,
    conversion: number,
}

const validationRule: ValidationRule<Product> = {
    name: [required()],
    units: {
        arrayRules: [arrayMinLen(3, "Product uom has to be at least 3 units.")],
        arrayElementRule: {
            name: [required()],
            conversion: [minNumber(1)]
        }
    }
}

describe("Validate test with product", () => {
    it("Returns name and uom errors", () => {
        const ironStick: Product = {
            name: "",
            units: [
                {
                    name: "",
                    conversion: 0
                },
                {
                    name: "cm",
                    conversion: 0
                }
            ]
        }

        const validator = new Validator(validationRule)
        const validationResult = validator.validate(ironStick)

        const expected: ValidationResult<Product> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                units: {
                    arrayErrors: [
                        {
                            errorMessage: "Product uom has to be at least 3 units.",
                            attemptedValue: ironStick.units,
                            ruleName: arrayMinLen.name
                        }
                    ],
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                name: [
                                    {
                                        errorMessage: "This field is required.",
                                        attemptedValue: "",
                                        ruleName: required.name
                                    }
                                ],
                                conversion: [
                                    {
                                        errorMessage: "The minimum value for this field is 1.",
                                        attemptedValue: 0,
                                        ruleName: minNumber.name
                                    }
                                ]
                            },
                            attemptedValue: ironStick.units[0]
                        },
                        {
                            index: 1,
                            errors: {
                                conversion: [
                                    {
                                        errorMessage: "The minimum value for this field is 1.",
                                        attemptedValue: 0,
                                        ruleName: minNumber.name
                                    }
                                ]
                            },
                            attemptedValue: ironStick.units[1]
                        }
                    ]
                }
            }
        }

        expect(validationResult).toEqual(expected)
    })
})