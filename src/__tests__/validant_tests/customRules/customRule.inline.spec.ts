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
                    ruleName: "none",
                    attemptedValue: username,
                    errorMessage: "Please enter username."
                }
            }
        },
        function (username, loginRequest) {
            if (username.toLocaleLowerCase().includes("admin")) {
                return {
                    ruleName: "none",
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
                    ruleName: "none",
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
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                userName: ["Please enter username."],
                password: ["Please enter password."],
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
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                userName: ["Admin is not allowed to login."],
                password: ["Please enter password."],
            }
        }

        expect(actual).toEqual(expected)
    })
})

