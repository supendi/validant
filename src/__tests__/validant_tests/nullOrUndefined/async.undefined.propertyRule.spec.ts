import { AsyncValidationRule } from "../../../types/AsyncValidationRule" 
import { ValidationResult, validant } from "../../../validant"

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
        const actual = await validant.validateAsync(person, rule)

        const expected: ValidationResult<Person> = {
            message: "Good to go.",
            isValid: true,
            errors: undefined
        }

        expect(actual).toEqual(expected)
    })
})