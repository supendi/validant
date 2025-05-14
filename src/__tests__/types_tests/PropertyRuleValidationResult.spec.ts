import { PropertyRuleValidationResult } from "../../types"


describe("PropertyRuleValidationResult Test", () => {
    it("Should compile", () => {
        let validationResult: PropertyRuleValidationResult = {
            isValid: true,
            errorMessage: "No error"
        }

        expect(validationResult).not.toBeNull()
    })
})
