import { Validator, ValidateFunc, ValidationRule, } from "../../../index"

interface Person {
    name: string
    age: 1
}

describe("Test Not Function Property Rule", () => {
    it("throw error", () => {
        const person: Person | undefined | null = {
            age: 1,
            name: ""
        }

        const rule: ValidationRule<Person> = {
            age: ["dev use any and dont know if this is not a func" as any as ValidateFunc<1, Person>]
        }

        const validator = new Validator()
        const actual = () => validator.validate(person, rule)

        const expected = new Error("propertyRuleFunc is not a function")

        expect(actual).toThrow(expected)
    })
})