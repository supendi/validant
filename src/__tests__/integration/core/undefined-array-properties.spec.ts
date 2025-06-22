import { Validator, ValidationResult, required, ValidationRule } from "../../../index"


interface Person {
    name?: string
    children?: Person[]
}

const personRule: ValidationRule<Person> = {
    name: [required()],
}

personRule.children = {
    arrayRules: [required()],
    arrayElementRule: personRule // <= notes that children use existing rule: person rule
}

describe("Test undefined array properties", () => {
    it("All properties should return errors", () => {
        const person: Person = {} // empty object

        const validator = new Validator(personRule)
        const actual = validator.validate(person)

        const expected: ValidationResult<Person> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                name: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: undefined,
                        ruleName: required.name
                    }
                ],
                children: {
                    arrayErrors: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: undefined,
                            ruleName: required.name
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})


describe("Test undefined array properties", () => {
    it("Should return errors including children item properties", () => {
        const person: Person = {
            name: "",
            children: [
                {
                    name: "",
                },
            ]
        }
        const validator = new Validator(personRule)
        const actual = validator.validate(person)

        const expected: ValidationResult<Person> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                name: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                children: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                name: [
                                    {
                                        errorMessage: "This field is required.",
                                        attemptedValue: "",
                                        ruleName: required.name
                                    }
                                ],
                                children: {
                                    arrayErrors: [
                                        {
                                            errorMessage: "This field is required.",
                                            attemptedValue: undefined,
                                            ruleName: required.name
                                        }
                                    ]
                                },
                            },
                            attemptedValue: person.children ? person.children[0] : undefined
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})