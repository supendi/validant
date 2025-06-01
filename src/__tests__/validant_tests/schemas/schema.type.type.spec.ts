import { Validator, emailAddress, minNumber, required, ValidationRule, ValidationResult, } from "../../../index"

type Account = {
    name: string
    age: number
    email: string
}

const validationRule: ValidationRule<Account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [required(), emailAddress("Invalid email address")]
}

describe("Simple Object Test", () => {
    it("Should return errors", () => {

        const account: Account = {
            name: "",
            age: 0,
            email: ""
        }

        const validator = new Validator(validationRule)
        const actual = validator.validate(account)

        var expected: ValidationResult<Account> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                name: [
                    {
                        attemptedValue: "",
                        errorMessage: "Account name is required.",
                        ruleName: required.name
                    }
                ],
                age: [
                    {
                        attemptedValue: 0,
                        errorMessage: "Should be at least 17 years old.",
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
