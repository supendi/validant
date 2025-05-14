import { required } from "../../rules"
import { ValidationRule } from "../../types"
import valty, { ValidationResult } from "../../valty"

interface Person {
    name?: string
    age?: 1
}

describe("Test Against undefined properties with undefined rules", () => {
    it("return true", () => {

        const rule: ValidationRule<Person> = {
            name: [undefined],
            age: undefined
        }

        const person: Person = {}

        const actual = valty.validate(person, rule)

        const expected: ValidationResult<Person> = {
            message: "Good to go.",
            isValid: true,
            errors: undefined
        }

        expect(actual).toEqual(expected)
    })
})

describe("Test Simple Object", () => {
    it("return true", () => {

        const rule: ValidationRule<Person> = {
            name: [required()],
            age: [required()]
        }
        const person: Person = {}
        const actual = valty.validate(person, rule)

        const expected: ValidationResult<Person> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["This field is required."],
                age: ["This field is required."],
            }
        }

        expect(actual).toEqual(expected)
    })
})