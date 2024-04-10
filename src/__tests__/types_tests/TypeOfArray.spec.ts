import { TypeOfArray } from "../../types";


/**
 * Ensure all the code below are compiled
 */

describe("TypeOfArray Test", () => {
    it("Should compile", () => {
        interface Person {
            name: TypeOfArray<string[]>,
            age: TypeOfArray<number[]>
        }

        let person: Person = {
            name: "1",
            age: 1,
        }

        expect(person).not.toBeNull()
    })
})
