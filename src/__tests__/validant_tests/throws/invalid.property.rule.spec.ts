import { ValidationRule } from "../../../types/ValidationRule"
import validant from "../../../validant"

interface Person {
    name: string
    age: 1
    children?: Person[]
}

describe("Test Invalid Rule", () => {
    it("throw error", () => {
        const person: Person | undefined | null = {
            age: 1,
            name: ""
        }

        const rule: ValidationRule<Person> = {
            children: "123123" as any
        }

        const actual = () => validant.validate(person, rule)

        const expected = new Error(`string is not a valid rule.`)

        expect(actual).toThrow(expected)
    })
})