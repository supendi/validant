import { AsyncValidator, ValidationResult, AsyncValidationRule, } from "../../../index"

interface Person {
    name: string
    age: 1
}

const rule: AsyncValidationRule<Person> = {
    name: [undefined],
    age: undefined
}

const person: Person = {
    name: "",
    age: 1
}

describe("Ignore or skip undefined rule", () => {
    it("return true", async () => {
        const validator = new AsyncValidator()
        const actual = await validator.validateAsync(person, rule)

        const expected: ValidationResult<Person> = {
            message: "Validation successful.",
            isValid: true,
            errors: undefined
        }

        expect(actual).toEqual(expected)
    })
})