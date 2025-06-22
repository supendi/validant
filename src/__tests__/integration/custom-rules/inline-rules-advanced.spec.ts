import { Validator, ValidationRule, ValidationResult } from "../../../index"

interface Account {
    name: string,
}

const validationRule: ValidationRule<Account> = {
    name: [
        (value, object) => {
            const isValid = value.length >= 5
            if (isValid) {
                return
            }
            return {
                ruleName: "minLength",
                attemptedValue: value,
                errorMessage: "Name length minimum is 5 chars."
            }
        },
        (value, object) => {
            // Must contain A letter 
            const isValid = value.toLocaleLowerCase().includes("a")
            if (isValid) {
                return
            }

            return {
                ruleName: "containsA",
                attemptedValue: value,
                errorMessage: "Name must contain 'A' letter."
            }
        }
    ]
}

describe("Test Inline Custom Rule", () => {
    it("Should return errors", () => {
        const account: Account = {
            name: "John",
        }

        const validator = new Validator(validationRule)
        const validationResult = validator.validate(account)

        const expected: ValidationResult<Account> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                name: [
                    {
                        errorMessage: "Name length minimum is 5 chars.",
                        attemptedValue: "John",
                        ruleName: "minLength"
                    },
                    {
                        errorMessage: "Name must contain 'A' letter.",
                        attemptedValue: "John",
                        ruleName: "containsA"
                    }
                ]
            }
        }

        expect(validationResult).toEqual(expected)
    })
})