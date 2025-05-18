import { Validator, ValidationRule, } from "../../../index"

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
        
        const validator = new Validator(rule)
        const actual = () => validator.validate(person)

        const expected = new Error(`validant: validation rule is null or undefined.`)

        expect(actual).toThrow(expected)
    })
})