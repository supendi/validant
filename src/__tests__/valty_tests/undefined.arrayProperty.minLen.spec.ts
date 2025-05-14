import { valty, } from "../../index"
import { ValidationRule } from "../../types"
import { ValidationResult } from "../../valty"
import { arrayMinLen, required } from "../../rules"

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

        const actual = valty.validate(person, rule)

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
