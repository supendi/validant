import { saferval, } from "../../index"
import { ValidationRule } from "../../types"
import { ValidationResult } from "../../saferval"
import { required } from "../../rules"

interface Person {
    name?: string
    children?: Person[]
}

const personRule: ValidationRule<Person> = {
    name: [required()],
}

personRule.children = {
    arrayRules: [required()],
    arrayItemRule: personRule // <= notes that children use existing rule: person rule
}

describe("Test undefined array properties", () => {
    it("All properties should return errors", () => {
        const person: Person = {} // empty object

        const actual = saferval.validate(person, personRule)

        const expected: ValidationResult<Person> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["This field is required."],
                children: {
                    errors: ["This field is required."]
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

        const actual = saferval.validate(person, personRule)

        const expected: ValidationResult<Person> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["This field is required."],
                children: {
                    errorsEach: [
                        {
                            index: 0,
                            errors: {
                                name: ["This field is required."],
                                children: {
                                    errors: ["This field is required."] // note that person.children[0].children above is undefined, and its required.
                                },
                            },
                            validatedObject: person.children ? person.children[0] : undefined
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})
