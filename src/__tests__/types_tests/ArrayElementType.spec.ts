
/**
 * Ensure all the code below are compiled
 */
import { ArrayElementType } from "../../types/ErrorOf"

describe("ArrayElementType Test", () => {
    it("Should compile", () => {
        interface Person {
            name: ArrayElementType<string[]>,
            age: ArrayElementType<number[]>
        }

        let person: Person = {
            name: "1",
            age: 1,
        }

        expect(person).not.toBeNull()
    })
})
