import { AsyncValidator, AsyncValidationRule, ValidationResult, } from "../../../index"

interface Person {
    name: string
    age: 1
}

const rule: AsyncValidationRule<Person> = {
    name: [undefined],
    age: undefined
}

describe("Test Validate Against Undefined", () => {
    it("Doesnt throw error", async () => {
        const person: Person | undefined = undefined

        const validator = new AsyncValidator(rule)
        const actual = await validator.validateAsync(person)

        const expected: ValidationResult<Person> = {
            isValid: true,
            message: "Validation successful.",
        }

        expect(actual).toEqual(expected)
    })
})

describe("Test Validate Against null", () => {
    it("Doesnt throw error", async () => {
        const person: Person | undefined | null = null

        const validator = new AsyncValidator(rule)
        const actual = await validator.validateAsync(person)

        const expected: ValidationResult<Person> = {
            isValid: true,
            message: "Validation successful.",
        }

        expect(actual).toEqual(expected)
    })
})