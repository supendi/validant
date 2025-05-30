import { RuleViolation } from "../../types/ValidationRule"


describe("RuleViolation Test", () => {
    it("Should compile", () => {
        let validationResult: RuleViolation = {
            ruleName: "as long as it is a string",
            attemptedValue: "anything",
            errorMessage: "No error"
        }

        expect(validationResult).not.toBeNull()
    })
})
