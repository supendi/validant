import { Validator, minNumber, required, ValidationRule, emailAddress, ValidationResult } from "../../../index"

interface Account {
    name: string,
    age: number,
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

        const validator = new Validator()
        const actual = validator.validate(account, validationRule)

        var expected: ValidationResult<Account> = {
            message: "Validation failed. Please check and fix the errors to continue.",
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
                        attemptedValue: 0,
                        errorMessage: "Should be at least 17 years old.",
                        ruleName: minNumber.name
                    }
                ],
                email: [
                    {
                        attemptedValue: "",
                        errorMessage: "This field is required.",
                        ruleName: required.name
                    },
                    {
                        attemptedValue: "",
                        errorMessage: "Invalid email address",
                        ruleName: emailAddress.name
                    }
                ],
            }
        }

        expect(actual).toEqual(expected)
    })
})