import { saferval, } from "../../index"
import { ValidationRule } from "../../types"
import { emailAddress, required, minNumber } from "../../rules"

type Account = {
    name: string
    age: number
    email: string
}

const account: Account = {
    name: "",
    age: 0,
    email: ""
}

const validationRule: ValidationRule<typeof account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [required(), emailAddress("Invalid email address")]
}

describe("Simple Object Test", () => {
    it("Should return errors", () => {
        const actual = saferval.validate(account, validationRule)

        var expected = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["Account name is required."],
                age: ["Should be at least 17 years old."],
                email: ["This field is required.", "Invalid email address"],
            }
        }

        expect(actual).toEqual(expected)
    })
})
