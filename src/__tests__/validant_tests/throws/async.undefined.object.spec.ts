import { AsyncValidator, AsyncValidationRule, } from "../../../index"

interface Person {
    name: string
    age: 1
}

const rule: AsyncValidationRule<Person> = {
    name: [undefined],
    age: undefined
}

describe("Test Validate Against Undefined", () => {
    it("throw error", async () => {
        const person: Person | undefined = undefined

        const expected = new Error(`validant: object is null or undefined during validation.`)

        const validator = new AsyncValidator(rule)
        await expect(validator.validateAsync(person))
            .rejects
            .toThrow(expected)
    })
})

describe("Test Validate Against null", () => {
    it("throw error", async () => {
        const person: Person | undefined | null = null

        const expected = new Error(`validant: object is null or undefined during validation.`)

        const validator = new AsyncValidator(rule)
        await expect(validator.validateAsync(person))
            .rejects
            .toThrow(expected)
    })
})