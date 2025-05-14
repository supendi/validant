import { required } from "../../rules"
import { ValidationRule } from "../../types"
import valty, { ValidationResult } from "../../valty"

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
        const actual = valty.validate(person, rule)

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