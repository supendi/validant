import { ValidationRule } from "../../types"
import saferval from "../../saferval"

interface Person {
    name: string
    age: 1
}

describe("Test Validate Against null validation rule", () => {
    it("throw error", () => {
        const person: Person | undefined | null = {
            age: 1,
            name: ""
        }

        const rule: ValidationRule<Person> = undefined
        const actual = () => saferval.validate(person, rule)

        const expected = new Error(`saferval: validation rule is null or undefined.`)

        expect(actual).toThrow(expected)
    })
})