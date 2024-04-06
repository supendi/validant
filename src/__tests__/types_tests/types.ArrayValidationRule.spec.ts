import { PropertyValidator, ValidationRule, ArrayValidationRule } from "../../types"

/**
 * Ensure all the code below compiled
 */

describe("ArrayValidationRule Simple Person Test", () => {
    it("Should compile", () => {
        interface Person {
            name: string
            age: number
        }
        const requiredValidator: PropertyValidator<any, any> = {
            description: "Required Validator",
            returningErrorMessage: "This field is required",
            validate: (value: any, obj?: any) => {
                return !!value
            }
        }
        const minNumberValidator: PropertyValidator<any, any> = {
            description: "Minimum Number Validator",
            returningErrorMessage: "Minimum number is",
            validate: (value: any, obj?: any) => {
                return false
            }
        }
        const personRule: ValidationRule<Person> = {
            name: [requiredValidator],
            age: [requiredValidator, minNumberValidator],
        }

        const arrayOfPersonRule: ArrayValidationRule<Person, Person[]> = {
            validators: [requiredValidator],
            validationRule: personRule,
        }

        expect(arrayOfPersonRule).not.toBeUndefined()

        expect(arrayOfPersonRule.validators).not.toBeUndefined()
        expect(Array.isArray(arrayOfPersonRule.validators)).toBeTruthy()
        expect(arrayOfPersonRule.validators.length).toEqual(1)
        expect(arrayOfPersonRule.validators[0]).toEqual(requiredValidator)
    })
})
