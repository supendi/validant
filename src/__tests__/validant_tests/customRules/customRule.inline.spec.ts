import { Validator, ValidationRule, ValidationResult } from "../../../index"

interface LoginRequest {
    userName: string
    password: string
}

const loginRule: ValidationRule<LoginRequest> = {
    userName: [
        function (username, loginRequest) {
            if (!username) {
                return {
                    ruleName: "requiredUserName",
                    attemptedValue: username,
                    errorMessage: "Please enter username."
                }
            }
        },
        function (username, loginRequest) {
            if (username.toLocaleLowerCase().includes("admin")) {
                return {
                    ruleName: "adminShouldBeBlocked",
                    attemptedValue: username,
                    errorMessage: "Admin is not allowed to login."
                }
            }
        }
    ],
    password: [
        function (password, loginRequest) {
            if (!password) {
                return {
                    ruleName: "requiredPassword",
                    attemptedValue: password,
                    errorMessage: "Please enter password."
                }
            }
        }
    ]
}

describe("validate login request", () => {
    it("returns errors when username and password are empty", () => {

        const loginRequest: LoginRequest = {
            userName: "",
            password: ""
        }

        const validator = new Validator(loginRule)
        const actual = validator.validate(loginRequest)

        const expected: ValidationResult<LoginRequest> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                userName: [
                    {
                        errorMessage: "Please enter username.",
                        attemptedValue: "",
                        ruleName: "requiredUserName"
                    }
                ],
                password: [
                    {
                        errorMessage: "Please enter password.",
                        attemptedValue: "",
                        ruleName: "requiredPassword"
                    }
                ],
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("validate login request", () => {
    it("returns errors when username admin and password are empty", () => {

        const loginRequest: LoginRequest = {
            userName: "admin",
            password: ""
        }

        const validator = new Validator(loginRule)
        const actual = validator.validate(loginRequest)

        const expected: ValidationResult<LoginRequest> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                userName: [
                    {
                        errorMessage: "Admin is not allowed to login.",
                        attemptedValue: "admin",
                        ruleName: "adminShouldBeBlocked"
                    }
                ],
                password: [
                    {
                        errorMessage: "Please enter password.",
                        attemptedValue: "",
                        ruleName: "requiredPassword"
                    }
                ],
            }
        }

        expect(actual).toEqual(expected)
    })
})