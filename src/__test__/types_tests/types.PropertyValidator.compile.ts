import { PropertyValidator, ValidatorFunc } from "../../types"

/**
 * Ensure all the code below compiled
 */

describe("PropertyValidator Test", () => {
    it("Should compile", () => {

        const validator: PropertyValidator<any, any> = {
            description: "Required Validator",
            validate: function (value: any, objRef: any) {
                return true
            },
            returningErrorMessage: "The value of :value is required"
        }

        expect(validator).not.toBeNull()

        expect(validator).toHaveProperty("description")
        expect(validator).toHaveProperty("validate")
        expect(validator).toHaveProperty("returningErrorMessage")

        expect(validator.description).toEqual("Required Validator")
        expect(validator.returningErrorMessage).toEqual("The value of :value is required")

        // Ensure ts compile this
        const validatorFunction: ValidatorFunc<any, any> = validator.validate
        expect(validatorFunction).not.toBeNull()

        const isValid = validator.validate(1)
        expect(isValid).toBeTruthy()
    })
})
