import { Validator, ValidationRule, ValidationResult, required, } from "../../../index"

interface Person {
    name: string
    age: 1
}

const rule: ValidationRule<Person> = {
    name: [required()],
    age: [required()],
}

describe("Test Validate Against Undefined", () => {
    it("Doesnt throw error", () => {
        const person: Person | undefined = undefined

        const validator = new Validator(rule)
        const actual = validator.validate(person)

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

describe("Test Validate Against null", () => {
    it("Doesnt throw error", () => {
        const person: Person | undefined | null = null

        const validator = new Validator(rule)
        const actual = validator.validate(person)

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