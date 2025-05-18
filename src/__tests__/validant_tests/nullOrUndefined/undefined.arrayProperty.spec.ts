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
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["This field is required."],
                children: {
                    arrayErrors: ["This field is required."]
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
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["This field is required."],
                children: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                name: ["This field is required."],
                                children: {
                                    arrayErrors: ["This field is required."] // note that person.children[0].children above is undefined, and its required.
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
