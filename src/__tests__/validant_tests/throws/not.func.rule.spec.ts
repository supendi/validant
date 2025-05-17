import { PropertyRuleFunc, ValidationRule } from "../../../types/ValidationRule"
import { validant } from "../../../validant"

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
            age: ["dev use any and dont know if this is not a func" as any as PropertyRuleFunc<1, Person>]
        }
        const actual = () => validant.validate(person, rule)

        const expected = new Error("propertyRuleFunc is not a function")

        expect(actual).toThrow(expected)
    })
})