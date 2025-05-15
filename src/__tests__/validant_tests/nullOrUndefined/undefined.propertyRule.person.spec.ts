import { required } from "../../../rules"
import { ValidationRule } from "../../../types/ValidationRule"
import validant, { ValidationResult } from "../../../validant"

interface Person {
    name: string
    age: 1
}

const rule: ValidationRule<Person> = {
    name: [undefined],
    age: undefined
}

const person: Person = {
    name: "",
    age: 1
}

describe("Test Simple Object", () => {
    it("return true", () => {
        const actual = validant.validate(person, rule)

        const expected: ValidationResult<Person> = {
            message: "Good to go.",
            isValid: true,
            errors: undefined
        }

        expect(actual).toEqual(expected)
    })
})