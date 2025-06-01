import { AsyncValidator, AsyncValidationRule, emailAddress, required, ValidationResult, } from "../../../../../../index"
import { UserRepository } from "../repositories/userRepository"

export type LoginRequest = {
    email: string
    password: string
}

function preventUnregisteredEmailRule(userRepository: UserRepository) {
    return async function (email) {
        if (!email) { // lets skip this for now.
            return
        }
        const existingUser = await userRepository.getUserAsync(email)
        if (!existingUser) {
            return {
                ruleName: preventUnregisteredEmailRule.name,
                attemptedValue: email,
                errorMessage: `${email} is not registered.`
            }
        }
    }
}

function buildLoginRule(userRepository: UserRepository) {
    const registrationRule: AsyncValidationRule<LoginRequest> = {
        email: [
            required(),
            emailAddress(),
            preventUnregisteredEmailRule(userRepository)
        ],
        password: [
            required(),
        ],
    }
    return registrationRule
}

export interface LoginValidationService {
    validateAsync(request: LoginRequest): Promise<ValidationResult<LoginRequest>>
}

export function createLoginValidationService(userRepository: UserRepository): LoginValidationService {
    async function validateAsync(request: LoginRequest) {
        const registrationRule = buildLoginRule(userRepository)
        const validator = new AsyncValidator(registrationRule, {
            validationMessage: {
                errorMessage: "error",
                successMessage: "ok"
            }
        })
        return validator.validateAsync(request)
    }
    return {
        validateAsync
    }
}

describe("Just to make jest not complaining about it should have a test.", () => {
    it("A helper file for testing", () => {
    })
})
