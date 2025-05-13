import { PropertyValidationResult } from "../../valty/validators/validateField";


/**
 * Ensure all the code below are compiled
 */

describe("PropertyValidationResult Test", () => {
    it("Should compile", () => {
        interface Person {
            name: string,
            age: number
        }

        let person: PropertyValidationResult<Person> = {
            errorMessage: "Not good",
            isValid: false,
            object: {
                name: "Tatang",
                age: 1,
            },
            propertyName: "name",
            propertyValue: "Tatang"
        }

        expect(person).not.toBeNull()
    })
})
