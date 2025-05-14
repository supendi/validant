import { ValidationRule } from "../../types"
import valty from "../../valty"

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
        const actual = () => valty.validate(person, rule)

        const expected = new Error(`valty: validation rule is null or undefined.`)

        expect(actual).toThrow(expected)
    })
})