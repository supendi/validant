import { Validator, ValidationResult, ValidationRule } from "../../../index"

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

        const validator = new Validator(rule)
        const actual = validator.validate(person)

        const expected: ValidationResult<Person> = {
            message: "Validation successful.",
            isValid: true,
            errors: undefined
        }

        expect(actual).toEqual(expected)
    })
})