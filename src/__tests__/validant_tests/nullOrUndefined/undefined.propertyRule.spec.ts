import { ValidationRule } from "../../../types/ValidationRule"
import { ValidationResult, validant } from "../../../validant"

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

describe("Ignore or skip undefined rule", () => {
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