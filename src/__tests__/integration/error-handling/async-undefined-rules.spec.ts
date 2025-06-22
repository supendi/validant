import { AsyncValidator, AsyncValidationRule, } from "../../../index"

interface Person {
    name: string
    age: 1
}

describe("Test Validate Against null validation rule", () => {
    it("throw error", async () => {
        const person: Person | undefined | null = {
            age: 1,
            name: ""
        }

        const rule: AsyncValidationRule<Person> = undefined
        const validator = new AsyncValidator(rule)
        const actual = async () => await validator.validateAsync(person)

        const expected = new Error(`validant: validation rule is null or undefined.`)

        await expect(actual).rejects.toThrow(expected)
    })
})