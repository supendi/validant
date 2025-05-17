import { required } from "../../../rules"
import { ValidationRule } from "../../../types/ValidationRule"
import { ValidationResult, validant } from "../../../validant"

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
        const actual = validant.validate(person, rule)

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