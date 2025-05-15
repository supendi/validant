
/**
 * Ensure all the code below are compiled
 */

import { PossiblyUndefined } from "../../types/ErrorOf"

describe(`PossiblyUndefined Test`, () => {
    it("Should compile", () => {
        interface Person {
            name: PossiblyUndefined<string>,
            age: PossiblyUndefined<number>
        }

        let person: Person = {
            name: undefined,
            age: undefined,
        }

        expect(person).not.toBeNull()
    })
})
