import { Validator, ValidationRule, ValidationResult, } from "../../../index"

interface Person {
    name: string
    age: 1
}

const rule: ValidationRule<Person> = {
    name: [undefined],
    age: undefined
}

describe("Test Validate Against Undefined", () => {
    it("Doesnt throw error", () => {
        const person: Person | undefined = undefined

        const validator = new Validator(rule)
        const actual = validator.validate(person)

        const expected: ValidationResult<Person> = {
            isValid: true,
            message: "Validation successful.",
        }

        expect(actual).toEqual(expected)
    })
})

describe("Test Validate Against null", () => {
    it("Doesnt throw error", () => {
        const person: Person | undefined | null = null

        const validator = new Validator(rule)
        const actual = validator.validate(person)

        const expected: ValidationResult<Person> = {
            isValid: true,
            message: "Validation successful.",
        }

        expect(actual).toEqual(expected)
    })
})