import { AsyncValidator, ValidationResult, AsyncValidationRule, } from "../../../index"

interface Person {
    name: string
    age: 1
    children?: Person
}

const rule: AsyncValidationRule<Person> = {
    name: [undefined],
    age: undefined,
    children: undefined
}
const person: Person = {
    name: "",
    age: 1,
}

describe("Test Validate Against Undefined", () => {
    it("throw error", async () => {

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

describe("Test Validate Against null", () => {
    it("throw error", async () => {

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