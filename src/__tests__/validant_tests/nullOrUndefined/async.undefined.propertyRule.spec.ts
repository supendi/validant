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
        const validator = new AsyncValidator(rule)
        const actual = await validator.validateAsync(person)

        const expected: ValidationResult<Person> = {
            message: "Good to go.",
            isValid: true,
            errors: undefined
        }

        expect(actual).toEqual(expected)
    })
})