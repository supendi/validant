import { alphabetOnly } from "../../../rules"
import { RuleViolation } from "../../../types/ValidationRule"

describe("alphabetOnly", () => {
    describe("validation success cases", () => {
        test("should return undefined for valid alphabet-only string", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello World"

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for empty string", () => {
            const validateFunc = alphabetOnly()
            const testValue = ""

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for string with only spaces", () => {
            const validateFunc = alphabetOnly()
            const testValue = "   "

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for uppercase letters only", () => {
            const validateFunc = alphabetOnly()
            const testValue = "HELLO"

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for lowercase letters only", () => {
            const validateFunc = alphabetOnly()
            const testValue = "hello"

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for mixed case with spaces", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello World Test"

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for single uppercase letter", () => {
            const validateFunc = alphabetOnly()
            const testValue = "A"

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for single lowercase letter", () => {
            const validateFunc = alphabetOnly()
            const testValue = "a"

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for string with leading spaces", () => {
            const validateFunc = alphabetOnly()
            const testValue = "  Hello"

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for string with trailing spaces", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello  "

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should return undefined for string with multiple consecutive spaces", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello   World"

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })
    })

    describe("validation failure cases", () => {
        test("should return violation with default error message for string containing numbers", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello123"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation with default error message for string containing special characters", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello@World"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation with default error message for string containing punctuation", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello, World!"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation with default error message for string containing mixed invalid characters", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello123@#$"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for single number character", () => {
            const validateFunc = alphabetOnly()
            const testValue = "1"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for single special character", () => {
            const validateFunc = alphabetOnly()
            const testValue = "@"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string starting with number", () => {
            const validateFunc = alphabetOnly()
            const testValue = "123Hello"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string ending with number", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello123"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string with numbers in middle", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello123World"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string with only numbers", () => {
            const validateFunc = alphabetOnly()
            const testValue = "12345"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string with only special characters", () => {
            const validateFunc = alphabetOnly()
            const testValue = "@#$%^"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string with only punctuation", () => {
            const validateFunc = alphabetOnly()
            const testValue = ".,!?"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string with Unicode letters (accented characters)", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Héllo"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string with Cyrillic letters", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Привет"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string with emojis", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello😀"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string with tabs", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello\tWorld"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string with newlines", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello\nWorld"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation for string with carriage returns", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello\rWorld"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })
    })

    describe("custom error message", () => {
        test("should return violation with custom error message when validation fails", () => {
            const customErrorMessage = "Only letters and spaces are allowed"
            const validateFunc = alphabetOnly(customErrorMessage)
            const testValue = "Hello123"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: customErrorMessage
            })
        })

        test("should return undefined with custom error message when validation passes", () => {
            const customErrorMessage = "Only letters and spaces are allowed"
            const validateFunc = alphabetOnly(customErrorMessage)
            const testValue = "Hello World"

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should return violation with custom error message for empty custom message", () => {
            const validateFunc = alphabetOnly("")
            const testValue = "Hello123"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should return violation with custom error message for whitespace-only custom message", () => {
            const validateFunc = alphabetOnly("   ")
            const testValue = "Hello123"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "   "
            })
        })
    })

    describe("edge cases and boundary conditions", () => {
        test("should handle very long valid string", () => {
            const validateFunc = alphabetOnly()
            const testValue = "A".repeat(1000)

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should handle very long invalid string", () => {
            const validateFunc = alphabetOnly()
            const testValue = "A".repeat(999) + "1"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should handle string with only one space", () => {
            const validateFunc = alphabetOnly()
            const testValue = " "

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with only multiple spaces", () => {
            const validateFunc = alphabetOnly()
            const testValue = "     "

            const result = validateFunc(testValue, {})

            expect(result).toBeUndefined()
        })

        test("should handle string with mixed valid and invalid characters", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello World 123 Test"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should handle string with all ASCII printable characters", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello World!@#$%^&*()_+-=[]{}|;':\",./<>?`~"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should handle string with control characters", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello\x00World"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })

        test("should handle string with null bytes", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello\0World"

            const result = validateFunc(testValue, {})

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })
    })

    describe("function behavior and properties", () => {
        test("should return a function when called without parameters", () => {
            const validateFunc = alphabetOnly()

            expect(typeof validateFunc).toBe("function")
        })

        test("should return a function when called with custom error message", () => {
            const validateFunc = alphabetOnly("Custom message")

            expect(typeof validateFunc).toBe("function")
        })

        test("should have correct function name", () => {
            expect(alphabetOnly.name).toBe("alphabetOnly")
        })

        test("should handle root object parameter correctly", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello"
            const rootObject = { name: "test", value: 123 }

            const result = validateFunc(testValue, rootObject)

            expect(result).toBeUndefined()
        })

        test("should handle root object parameter correctly for invalid input", () => {
            const validateFunc = alphabetOnly()
            const testValue = "Hello123"
            const rootObject = { name: "test", value: 123 }

            const result = validateFunc(testValue, rootObject)

            expect(result).toEqual({
                ruleName: alphabetOnly.name,
                attemptedValue: testValue,
                errorMessage: "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces."
            })
        })
    })
}) 