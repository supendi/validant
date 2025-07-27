import { Validator, ValidationResult, arrayMinLen, required, ValidationRule } from "../../../index"

interface Person {
    name?: string
    children?: Person[]
}

const rule: ValidationRule<Person> = {
    name: [required()],
}

rule.children = {
    arrayRules: [arrayMinLen(2, "The minimum children is 2.")],
    arrayElementRule: rule
}

describe("Validator test with children array", () => {
    it("Children has to contain errors", () => {

        const person: Person = {
            name: "",
            children: [
                {
                    name: ""
                }
            ]
        }

        const validator = new Validator()
        const actual = validator.validate(person, rule)

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
                    arrayErrors: [
                        {
                            errorMessage: "The minimum children is 2.",
                            attemptedValue: person.children,
                            ruleName: arrayMinLen.name
                        }
                    ],
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
                                            errorMessage: "The minimum children is 2.",
                                            attemptedValue: undefined,
                                            ruleName: arrayMinLen.name
                                        }
                                    ]
                                }
                            },
                            attemptedValue: {
                                name: ""
                            }
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})