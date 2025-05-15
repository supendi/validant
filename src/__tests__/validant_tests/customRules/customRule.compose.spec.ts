import { validant, } from "../../../index"
import { PropertyRuleFunc } from "../../../types/ValidationRule"
import { ValidationRule } from "../../../types/ValidationRule"
import { ValidationResult } from "../../../validant"

const defaultMessage = { okMessage: "Good to go.", errorMessage: "One or more validation errors occurred." }

interface LoginRequest {
    userName: string
    password: string
}

function requiredUserNameRule(): PropertyRuleFunc<string, LoginRequest> {
    return function (username, loginRequest) {
        if (!username) {
            return {
                isValid: false,
                errorMessage: "Please enter username."
            }
        }
        return {
            isValid: true
        }
    }
}

function requiredAdminRule(): PropertyRuleFunc<string, LoginRequest> {
    return function (username, loginRequest) {
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
}

function requiredPasswordRule(): PropertyRuleFunc<string, LoginRequest> {
    return function (password, loginRequest) {
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
}

const loginRule: ValidationRule<LoginRequest> = {
    userName: [
        requiredUserNameRule(),
        requiredAdminRule()
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

        const actual = validant.validate(loginRequest, loginRule)

        const expected: ValidationResult<LoginRequest> = {
            message: defaultMessage.errorMessage,
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

        const actual = validant.validate(loginRequest, loginRule)

        const expected: ValidationResult<LoginRequest> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                userName: ["Admin is not allowed to login."],
                password: ["Please enter password."],
            }
        }

        expect(actual).toEqual(expected)
    })
})

