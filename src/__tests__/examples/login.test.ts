import { required, ValidationResult, ValidationRule, Validator } from "../../index"

const defaultMessage = { okMessage: "Validation successful.", errorMessage: "Validation failed. Please check and fix the errors to continue." }

describe("validate login request", () => {
    it("returns errors when username and password are empty", () => {
        interface LoginRequest {
            userName: string
            password: string
        }

        const loginRule: ValidationRule<LoginRequest> = {
            userName: [required("Please enter user name.")],
            password: [required("Please enter password.")]
        }

        const loginRequest: LoginRequest = {
            userName: "",
            password: ""
        }

        const validator = new Validator()
        const actual = validator.validate(loginRequest, loginRule)

        const expected: ValidationResult<LoginRequest> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                userName: [
                    {
                        errorMessage: "Please enter user name.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                password: [
                    {
                        errorMessage: "Please enter password.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
            }
        }

        expect(actual).toEqual(expected)
    })
})
