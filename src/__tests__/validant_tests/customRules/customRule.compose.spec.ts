import { Validator, ValidationRule, ValidationResult, ValidateFunc } from "../../../index"

const defaultMessage = { okMessage: "Good to go.", errorMessage: "One or more validation errors occurred." }

interface LoginRequest {
    userName: string
    password: string
}

function requiredUserNameRule(): ValidateFunc<string, LoginRequest> {
    return function (username, loginRequest) {
        if (!username) {
            return {
                ruleName: requiredUserNameRule.name,
                attemptedValue: username,
                errorMessage: "Please enter username."
            }
        }
    }
}

function adminShouldBeBlocked(): ValidateFunc<string, LoginRequest> {
    return function (username, loginRequest) {
        if (username.toLocaleLowerCase().includes("admin")) {
            return {
                ruleName: adminShouldBeBlocked.name,
                attemptedValue: username,
                errorMessage: "Admin is not allowed to login."
            }
        }
    }
}

function requiredPasswordRule(): ValidateFunc<string, LoginRequest> {
    return function (password, loginRequest) {
        if (!password) {
            return {
                ruleName: requiredPasswordRule.name,
                attemptedValue: password,
                errorMessage: "Please enter password."
            }
        }
    }
}

const loginRule: ValidationRule<LoginRequest> = {
    userName: [
        requiredUserNameRule(),
        adminShouldBeBlocked()
    ],
    password: [
        requiredPasswordRule()
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
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                userName: [
                    {
                        errorMessage: "Please enter username.",
                        attemptedValue: "",
                        ruleName: requiredUserNameRule.name
                    }
                ],
                password: [
                    {
                        errorMessage: "Please enter password.",
                        attemptedValue: "",
                        ruleName: requiredPasswordRule.name
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
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                userName: [
                    {
                        errorMessage: "Admin is not allowed to login.",
                        attemptedValue: "admin",
                        ruleName: adminShouldBeBlocked.name
                    }
                ],
                password: [
                    {
                        errorMessage: "Please enter password.",
                        attemptedValue: "",
                        ruleName: requiredPasswordRule.name
                    }
                ],
            }
        }

        expect(actual).toEqual(expected)
    })
})