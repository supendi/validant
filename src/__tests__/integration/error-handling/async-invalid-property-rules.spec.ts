import { AsyncValidator, AsyncValidationRule, } from "../../../index"

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

        const rule: AsyncValidationRule<Person> = {
            children: "123123" as any
        }

        const validator = new AsyncValidator()
        const actual = () => validator.validateAsync(person, rule)

        const expected = new Error(`string is not a valid rule.`)

        expect(actual)
            .rejects
            .toThrow(expected)
    })
})