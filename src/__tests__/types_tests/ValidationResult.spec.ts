import { ValidationResult } from "../../types";


/**
 * Ensure all the code below are compiled
 */

describe("ValidationResult Test", () => {
    it("Should compile", () => {
        interface Person {
            name: string,
            age: number
        }

        let validationResult: ValidationResult<Person> = {
            isValid: false,
            message: "It's bad",
            errors: {
                name: ["Your name is required."],
                age: ["Minimum is 17 years old."]
            }
        }

        expect(validationResult).not.toBeNull()
    })
})
