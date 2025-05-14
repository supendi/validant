import { arrayMinLen, minNumber, required } from "../../rules"
import { ValidationRule } from "../../types"
import saferval, { ValidationResult } from "../../saferval"

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
        arrayItemRule: {
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

        const validationResult = saferval.validate(ironStick, validationRule)

        const expected: ValidationResult<Product> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["This field is required."],
                units: {
                    errors: ["Product uom has to be at least 3 units."],
                    errorsEach: [
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
