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
                name: [
                    {
                        errorMessage: "Your name is required.",
                        attemptedValue: "",
                        ruleName: "required"
                    }
                ],
                age: [
                    {
                        errorMessage: "Minimum is 17 years old.",
                        attemptedValue: 10,
                        ruleName: "min"
                    }
                ]
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
                name: [
                    {
                        errorMessage: "Your name is required.",
                        attemptedValue: "",
                        ruleName: "required"
                    }
                ],
                age: [
                    {
                        errorMessage: "Minimum is 17 years old.",
                        attemptedValue: 10,
                        ruleName: "min"
                    }
                ],
                children: {
                    arrayErrors: [
                        {
                            errorMessage: "Children is required",
                            attemptedValue: undefined,
                            ruleName: "required"
                        }
                    ],
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                age: [
                                    {
                                        errorMessage: "Min 8 years old",
                                        attemptedValue: 1,
                                        ruleName: "min"
                                    }
                                ],
                                name: [
                                    {
                                        errorMessage: "Required",
                                        attemptedValue: "",
                                        ruleName: "required"
                                    }
                                ]
                            },
                            attemptedValue: {
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