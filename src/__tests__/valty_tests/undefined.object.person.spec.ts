import { ValidationRule } from "../../types"
import valty from "../../valty"

interface Person {
    name: string
    age: 1
}

const rule: ValidationRule<Person> = {
    name: [undefined],
    age: undefined
}

describe("Test Validate Against Undefined", () => {
    it("throw error", () => {
        const person: Person | undefined = undefined

        const actual = () => valty.validate(person, rule)

        const expected = new Error(`valty: object is null or undefined during validation.`)

        expect(actual).toThrow(expected)
    })
})

describe("Test Validate Against null", () => {
    it("throw error", () => {
        const person: Person | undefined | null = null

        const actual = () => valty.validate(person, rule)

        const expected = new Error(`valty: object is null or undefined during validation.`)

        expect(actual).toThrow(expected)
    })
})