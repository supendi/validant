import { FieldValidator, ValidationRule, ValidationRuleForArrayOf } from "../../types"

/**
 * Ensure all the code below compiled
 */

describe("ValidationRuleArrayOf Simple Person Test", () => {
    it("Should compile", () => {
        interface Person {
            name: string
            age: number
        }
        const requiredValidator: FieldValidator = {
            description: "Required Validator",
            returningErrorMessage: "This field is required",
            validate: (value: any, obj?: any) => {
                return !!value
            }
        }
        const minNumberValidator: FieldValidator = {
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

        const arrayOfPersonRule: ValidationRuleForArrayOf<Person> = {
            fieldValidators: [requiredValidator],
            validationRule: personRule,
        }

        expect(arrayOfPersonRule).not.toBeUndefined()

        expect(arrayOfPersonRule.fieldValidators).not.toBeUndefined()
        expect(Array.isArray(arrayOfPersonRule.fieldValidators)).toBeTruthy()
        expect(arrayOfPersonRule.fieldValidators.length).toEqual(1)
        expect(arrayOfPersonRule.fieldValidators[0]).toEqual(requiredValidator)
    })
})
