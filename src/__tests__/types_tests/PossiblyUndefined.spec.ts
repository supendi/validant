import { PossiblyUndefined } from "../../valty/types";


/**
 * Ensure all the code below are compiled
 */

describe("PossiblyUndefined Test", () => {
    it("Should compile", () => {
        interface Person {
            name: PossiblyUndefined<string>,
            age: PossiblyUndefined<number>
        }

        let person: Person = {
            name: undefined, 
            age: undefined,
        }

        person = {
            name: "John",
            age: 1,
        }

        expect(person).not.toBeNull()
    })
})
