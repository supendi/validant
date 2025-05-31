/**
 * Ensure all the code below are compiled
 */

import { IndexedErrorOf } from "../../types/ErrorOf"

describe("IndexedErrorOf Test", () => {
    it("Should compile", () => {
        interface Person {
            name: string
            age: number
        }

        let error: IndexedErrorOf<Person> = {
            index: 0,
            errors: {
                age: [
                    {
                        errorMessage: "Required",
                        attemptedValue: 0,
                        ruleName: "required"
                    }
                ],
                name: [
                    {
                        errorMessage: "Required",
                        attemptedValue: "",
                        ruleName: "required"
                    }
                ]
            },
            attemptedValue: {
                name: "",
                age: 0
            }
        }

        expect(error).not.toBeNull()
    })
})