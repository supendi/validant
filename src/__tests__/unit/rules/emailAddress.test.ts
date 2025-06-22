import { emailAddress } from "../../../rules/emailAddress"
import { RuleViolation } from "../../../types/ValidationRule"

describe("emailAddress", () => {
    describe("with default error message", () => {
        test("should return violation for invalid email format", () => {
            const invalidEmails = [
                "wrongemail@.com",
                "another@wrong@email.com",
                "john@",
                "@example.com",
                "john.doe@",
                "john.doe@example",
                "john.doe@.com",
                "john..doe@example.com",
                "john.doe@example..com",
                "john.doe@example.com.",
                ".john.doe@example.com",
                "john doe@example.com",
                "john@doe@example.com",
                "john@doe@example.com",
                "john@doe@example.com",
                "john@doe@example.com",
                "john@doe@example.com",
                "john@doe@example.com",
                "john@doe@example.com",
                "john@doe@example.com"
            ]

            const defaultErrorMessage = "Invalid email address. The valid email example: john.doe@example.com."
            const validateFunc = emailAddress()

            invalidEmails.forEach(email => {
                const actual = validateFunc(email, {})
                const expected: RuleViolation = {
                    ruleName: emailAddress.name,
                    attemptedValue: email,
                    errorMessage: defaultErrorMessage
                }
                expect(actual).toEqual(expected)
            })
        })

        test("should return undefined for valid email format", () => {
            const validEmails = [
                "john@doe.com",
                "john.doe@example.com",
                "jane.smith@company.co.uk",
                "user123@domain.org",
                "test+tag@example.com",
                "user.name@subdomain.example.com",
                "user@example-domain.com",
                "user@example.com",
                "user@example.co.uk",
                "user@example.org",
                "user@example.net",
                "user@example.edu",
                "user@example.gov",
                "user@example.mil",
                "user@example.int",
                "user@example.biz",
                "user@example.info",
                "user@example.name",
                "user@example.pro",
                "user@example.museum"
            ]

            const validateFunc = emailAddress()

            validEmails.forEach(email => {
                const actual = validateFunc(email, {})
                expect(actual).toBeUndefined()
            })
        })
    })

    describe("with custom error message", () => {
        test("should return violation with custom error message for invalid email", () => {
            const invalidEmail = "wrong@email@format.com"
            const customErrorMessage = "Invalid email address format"
            const validateFunc = emailAddress(customErrorMessage)

            const actual = validateFunc(invalidEmail, {})
            const expected: RuleViolation = {
                ruleName: emailAddress.name,
                attemptedValue: invalidEmail,
                errorMessage: customErrorMessage
            }

            expect(actual).toEqual(expected)
        })

        test("should return undefined for valid email with custom error message", () => {
            const validEmail = "john.doe@example.com"
            const customErrorMessage = "Invalid email format"
            const validateFunc = emailAddress(customErrorMessage)

            const actual = validateFunc(validEmail, {})
            expect(actual).toBeUndefined()
        })

        test("should handle custom error message with placeholder", () => {
            const invalidEmail = "invalid@email"
            const customErrorMessage = "Invalid email: :value"
            const validateFunc = emailAddress(customErrorMessage)

            const actual = validateFunc(invalidEmail, {})
            const expected: RuleViolation = {
                ruleName: emailAddress.name,
                attemptedValue: invalidEmail,
                errorMessage: customErrorMessage
            }

            expect(actual).toEqual(expected)
        })
    })

    describe("edge cases", () => {
        test("should handle empty string", () => {
            const validateFunc = emailAddress()
            const actual = validateFunc("", {})
            
            expect(actual).toBeDefined()
            expect(actual?.ruleName).toBe(emailAddress.name)
            expect(actual?.attemptedValue).toBe("")
        })

        test("should handle null value", () => {
            const validateFunc = emailAddress()
            const actual = validateFunc(null as any, {})
            
            expect(actual).toBeDefined()
            expect(actual?.ruleName).toBe(emailAddress.name)
            expect(actual?.attemptedValue).toBe(null)
        })

        test("should handle undefined value", () => {
            const validateFunc = emailAddress()
            const actual = validateFunc(undefined as any, {})
            
            expect(actual).toBeDefined()
            expect(actual?.ruleName).toBe(emailAddress.name)
            expect(actual?.attemptedValue).toBe(undefined)
        })

        test("should handle non-string values", () => {
            const validateFunc = emailAddress()
            const nonStringValues = [123, true, false, {}, [], () => {}]

            nonStringValues.forEach(value => {
                const actual = validateFunc(value as any, {})
                expect(actual).toBeDefined()
                expect(actual?.ruleName).toBe(emailAddress.name)
                expect(actual?.attemptedValue).toBe(value)
            })
        })
    })

    describe("function behavior", () => {
        test("should return a function when called", () => {
            const validateFunc = emailAddress()
            expect(typeof validateFunc).toBe("function")
        })

        test("should accept root object parameter", () => {
            const validateFunc = emailAddress()
            const rootObject = { someProperty: "value" }
            
            const actual = validateFunc("test@example.com", rootObject)
            expect(actual).toBeUndefined()
        })

        test("should work with different root objects", () => {
            const validateFunc = emailAddress()
            const root1 = { user: "john" }
            const root2 = { user: "jane" }
            
            expect(validateFunc("test@example.com", root1)).toBeUndefined()
            expect(validateFunc("test@example.com", root2)).toBeUndefined()
        })
    })
}) 