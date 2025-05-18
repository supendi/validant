import { ValidationRule, Validator, } from "../../../index"

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

        const validator = new Validator(rule)
        const actual = () => validator.validate(person)

        const expected = new Error(`string is not a valid rule.`)

        expect(actual).toThrow(expected)
    })
})