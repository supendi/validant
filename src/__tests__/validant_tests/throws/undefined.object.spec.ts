import { Validator, ValidationRule, } from "../../../index"

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

        const validator = new Validator(rule)
        const actual = () => validator.validate(person)

        const expected = new Error(`validant: object is null or undefined during validation.`)

        expect(actual).toThrow(expected)
    })
})

describe("Test Validate Against null", () => {
    it("throw error", () => {
        const person: Person | undefined | null = null

        const validator = new Validator(rule)
        const actual = () => validator.validate(person)

        const expected = new Error(`validant: object is null or undefined during validation.`)

        expect(actual).toThrow(expected)
    })
})