import { required } from "../../rules"
import { ValidationRule } from "../../types"
import saferval, { ValidationResult } from "../../saferval"

interface Product {
    expiredDate?: Date
}

const rule: ValidationRule<Product> = {
    expiredDate: [required()],
}

describe("Test", () => {
    it("return error empty Date", () => {
        const product: Product = {} // date undefined

        const actual = saferval.validate(product, rule)
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
        const actual2 = saferval.validate(product, rule)

        const expected2: ValidationResult<Product> = {
            message: "Good to go.",
            isValid: true,
            errors: undefined
        }

        expect(actual2).toEqual(expected2)
    })
})



