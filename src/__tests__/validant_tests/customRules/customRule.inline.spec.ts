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
                    isValid: false,
                    errorMessage: "Please enter username."
                }
            }
            return {
                isValid: true
            }
        },
        function (username, loginRequest) {
            if (username.toLocaleLowerCase().includes("admin")) {
                return {
                    isValid: false,
                    errorMessage: "Admin is not allowed to login."
                }
            }
            return {
                isValid: true
            }
        }
    ],
    password: [
        function (password, loginRequest) {
            if (!password) {
                return {
                    isValid: false,
                    errorMessage: "Please enter password."
                }
            }
            return {
                isValid: true
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

