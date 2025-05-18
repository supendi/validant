import { ValidationResult } from "../../Validator";


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


describe("ValidationResult Test", () => {
    it("Should compile", () => {
        interface Person {
            name: string,
            age: number
            children: Person[]
        }

        let validationResult: ValidationResult<Person> = {
            isValid: false,
            message: "It's bad",
            errors: {
                name: ["Your name is required."],
                age: ["Minimum is 17 years old."],
                children: {
                    arrayErrors: ["Children is required"],
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                age: ["Min 8 years old"],
                                name: ["Required"]
                            },
                            validatedObject: {
                                age: 1,
                                children: [],
                                name: ""
                            }
                        }
                    ]
                }
            }
        }

        expect(validationResult).not.toBeNull()
    })
})
