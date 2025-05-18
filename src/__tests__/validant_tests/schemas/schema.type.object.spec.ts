import { Validator, emailAddress, minNumber, required, ValidationRule, } from "../../../index"

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
        const validator = new Validator(validationRule)
        const actual = validator.validate(account)

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
