import { AsyncValidationRule } from "../../../types/AsyncValidationRule"
import { ValidationResult, validant } from "../../../validant"

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
        const actual = await validant.validateAsync(person, rule)

        const expected: ValidationResult<Person> = {
            message: "Good to go.",
            isValid: true,
            errors: undefined
        }

        expect(actual).toEqual(expected)
    })
})

describe("Test Validate Against null", () => {
    it("throw error", async () => {
        const actual = await validant.validateAsync(person, rule)

        const expected: ValidationResult<Person> = {
            message: "Good to go.",
            isValid: true,
            errors: undefined
        }

        expect(actual).toEqual(expected)
    })
})