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

        const validator = new Validator(rule)
        const actual = validator.validate(product)
        const expected: ValidationResult<Product> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                expiredDate: ["This field is required."]
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
        const validator = new Validator(rule)
        const actual = validator.validate(product)

        const expected: ValidationResult<Product> = {
            message: "Good to go.",
            isValid: true,
            errors: undefined
        }

        expect(actual).toEqual(expected)
    })
})



