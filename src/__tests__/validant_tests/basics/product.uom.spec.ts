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
                name: ["This field is required."],
                units: {
                    arrayErrors: ["Product uom has to be at least 3 units."],
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                name: ["This field is required."],
                                conversion: ["The minimum value for this field is 1."]
                            },
                            validatedObject: {
                                name: "",
                                conversion: 0
                            }
                        },
                        {
                            index: 1,
                            errors: {
                                conversion: ["The minimum value for this field is 1."]
                            },
                            validatedObject: {
                                name: "cm",
                                conversion: 0
                            }
                        }
                    ]
                }
            }
        }

        expect(validationResult).toEqual(expected)
    })
})
