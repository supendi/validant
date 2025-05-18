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
    arrayItemRule: rule
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

        const validator = new Validator(rule)
        const actual = validator.validate(person)

        const expected: ValidationResult<Person> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["This field is required."],
                children: {
                    errors: ["The minimum children is 2."],
                    errorsEach: [
                        {
                            index: 0,
                            errors: {
                                name: ["This field is required."],
                                children: {
                                    errors: ["The minimum children is 2."]
                                }
                            },
                            validatedObject: {
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
