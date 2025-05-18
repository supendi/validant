import { AsyncValidator, AsyncValidationRule, emailAddress, required, ValidationResult, } from "../../../../../../index"
import { UserRepository } from "../repositories/userRepository"

export type LoginRequest = {
    email: string
    password: string
}

function preventUnRegisteredEmailRule(userRepository: UserRepository) {
    return async function (email) {
        if (!email) { // lets skip this for now.
            return {
                isValid: true
            }
        }
        const existingUser = await userRepository.getUserAsync(email)
        if (!existingUser) {
            return {
                isValid: false,
                errorMessage: `${email} is not registered.`
            }
        }
        return {
            isValid: true
        }
    }
}

function buildLoginRule(userRepository: UserRepository) {
    const registrationRule: AsyncValidationRule<LoginRequest> = {
        email: [
            required(),
            emailAddress(),
            preventUnRegisteredEmailRule(userRepository)
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
        const validator = new AsyncValidator(registrationRule)
        return validator.validateAsync(request, {
            errorMessage: "error",
            okMessage: "ok"
        })
    }
    return {
        validateAsync
    }
}

describe("Just to make jest not complaining about it should have a test.", () => {
    it("A helper file for testing", () => {
    })
})
