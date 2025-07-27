import { AsyncValidator, AsyncValidationRule, required, ValidationResult, regularExpression, emailAddress, equalToPropertyValue, } from "../../../../../index"
import { UserRepository, UserType } from "../repositories/userRepository"

export const ALLOWED_USER_TYPES: UserType[] = ["customer", "tenant"]

export type RegistrationRequest = {
    email: string
    fullName: string
    password: string
    confirmPassword: string
    userType: UserType
}

function uniqueEmailRule(userRepository: UserRepository) {
    return async function (email: string) {
        const user = await userRepository.getUserAsync(email)
        if (user) {
            return {
                ruleName: uniqueEmailRule.name,
                attemptedValue: email,
                errorMessage: `The email ${email} has been registered.`
            }
        }
    }
}

function strongPasswordRule() {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])([A-Za-z\d]|[^a-zA-Z\d]){8,}$/
    return regularExpression(strongPasswordRegex, strongPasswordRule.name, "Should contain a number, capital letter, at least 8 chars min and special char.")
}

function validUserTypeRule() {
    return function (userType: UserType) {
        const isValidType = ALLOWED_USER_TYPES.includes(userType)
        if (!isValidType) {
            return {
                ruleName: validUserTypeRule.name,
                attemptedValue: userType,
                errorMessage: `Invalid user types ${userType}. Allowed types ${ALLOWED_USER_TYPES.join(" ")}.`
            }
        }
    }
}

function buildRegistrationRule(userRepository: UserRepository) {
    const registrationRule: AsyncValidationRule<RegistrationRequest> = {
        fullName: [required()],
        email: [
            required(),
            emailAddress(),
            uniqueEmailRule(userRepository)
        ],
        password: [
            required(),
            strongPasswordRule()
        ],
        confirmPassword: [equalToPropertyValue("password", "Password must match.")],
        userType: [
            validUserTypeRule()
        ]
    }
    return registrationRule
}

export interface UserValidationService {
    validateAsync(request: RegistrationRequest): Promise<ValidationResult<RegistrationRequest>>
}

export function createRegistrationValidationService(userRepository: UserRepository): UserValidationService {
    async function validateAsync(request: RegistrationRequest) {
        const registrationRule = buildRegistrationRule(userRepository)

        const validator = new AsyncValidator({
            validationMessage: {
                errorMessage: "error",
                successMessage: "ok"
            }
        })
        return validator.validateAsync(request, registrationRule)
    }
    return {
        validateAsync
    }
}

describe("Just to make jest not complaining about it should have a test.", () => {
    it("A helper file for testing", () => {
    })
})
