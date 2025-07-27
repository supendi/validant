import { required, ValidationResult, ValidationRule, Validator } from "../../../index"

interface Product {
    expiredDate?: Date
}

const rule: ValidationRule<Product> = {
    expiredDate: [required()],
}

describe("Test", () => {
    it("return error empty Date", () => {
        const product: Product = {} // date undefined

        const validator = new Validator()
        const actual = validator.validate(product, rule)
        const expected: ValidationResult<Product> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                expiredDate: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: undefined,
                        ruleName: required.name
                    }
                ]
            },
        }

        expect(actual).toEqual(expected)
    })
})

describe("Test non empty date", () => {
    it("return is valid ", () => {
        const product = {
            expiredDate: new Date()
        }
        const validator = new Validator()
        const actual = validator.validate(product, rule)

        const expected: ValidationResult<Product> = {
            message: "Validation successful.",
            isValid: true,
            errors: undefined
        }

        expect(actual).toEqual(expected)
    })
})



