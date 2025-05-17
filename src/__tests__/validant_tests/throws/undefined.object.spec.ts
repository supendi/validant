import { ValidationRule } from "../../../types/ValidationRule"
import { validant } from "../../../validant"

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

        const actual = () => validant.validate(person, rule)

        const expected = new Error(`validant: object is null or undefined during validation.`)

        expect(actual).toThrow(expected)
    })
})

describe("Test Validate Against null", () => {
    it("throw error", () => {
        const person: Person | undefined | null = null

        const actual = () => validant.validate(person, rule)

        const expected = new Error(`validant: object is null or undefined during validation.`)

        expect(actual).toThrow(expected)
    })
})