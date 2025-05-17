import { AsyncValidationRule } from "../../../types/AsyncValidationRule"
import { validant } from "../../../validant"

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

        await expect(validant.validateAsync(person, rule))
            .rejects
            .toThrow(expected)
    })
})

describe("Test Validate Against null", () => {
    it("throw error", async () => {
        const person: Person | undefined | null = null

        const expected = new Error(`validant: object is null or undefined during validation.`)

        await expect(validant.validateAsync(person, rule))
            .rejects
            .toThrow(expected)
    })
})