import { Validator, required, ValidationRule, ValidationResult } from "../../../index"

interface Person {
    name: string
}

const rule: ValidationRule<Person> = {
    name: [required()]
}

const person: Person = {
    name: "",
}

describe("Test Simple Object", () => {
    it("Person name should return errors", () => {

        const validator = new Validator(rule)
        const actual = validator.validate(person)

        const expected: ValidationResult<Person> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["This field is required."]
            }
        }

        expect(actual).toEqual(expected)
    })
})