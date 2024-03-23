import { PropertyValidator, ValidationRule, ValidationRuleForArrayOf } from "../../types"

/**
 * Ensure all the code below compiled
 */

describe("ValidationRuleArrayOf Simple Person Test", () => {
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

        const arrayOfPersonRule: ValidationRuleForArrayOf<Person, Person[]> = {
            validatorOfArray: [requiredValidator],
            validationRuleOfArrayElement: personRule,
        }

        expect(arrayOfPersonRule).not.toBeUndefined()

        expect(arrayOfPersonRule.validatorOfArray).not.toBeUndefined()
        expect(Array.isArray(arrayOfPersonRule.validatorOfArray)).toBeTruthy()
        expect(arrayOfPersonRule.validatorOfArray.length).toEqual(1)
        expect(arrayOfPersonRule.validatorOfArray[0]).toEqual(requiredValidator)
    })
})
