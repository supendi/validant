import { Validator, emailAddress, minNumber, required, ValidationRule, ValidationResult, } from "../../../index"

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

        var expected: ValidationResult<typeof account> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: [
                    {
                        errorMessage: "Account name is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                age: [
                    {
                        errorMessage: "Should be at least 17 years old.",
                        attemptedValue: 0,
                        ruleName: minNumber.name
                    }
                ],
                email: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    },
                    {
                        errorMessage: "Invalid email address",
                        attemptedValue: "",
                        ruleName: emailAddress.name
                    }
                ],
            }
        }

        expect(actual).toEqual(expected)
    })
})
