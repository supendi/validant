import { ValidationRule } from "../../types"
import saferval from "../../saferval"

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

        const actual = () => saferval.validate(person, rule)

        const expected = new Error(`saferval: object is null or undefined during validation.`)

        expect(actual).toThrow(expected)
    })
})

describe("Test Validate Against null", () => {
    it("throw error", () => {
        const person: Person | undefined | null = null

        const actual = () => saferval.validate(person, rule)

        const expected = new Error(`saferval: object is null or undefined during validation.`)

        expect(actual).toThrow(expected)
    })
})