"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ensure all the code below compiled
 */
describe("PropertyValidator Test", () => {
    it("Should compile", () => {
        const validator = {
            description: "Required Validator",
            validate: function (value, objRef) {
                return true;
            },
            returningErrorMessage: "The value of :value is required"
        };
        expect(validator).not.toBeNull();
        expect(validator).toHaveProperty("description");
        expect(validator).toHaveProperty("validate");
        expect(validator).toHaveProperty("returningErrorMessage");
        expect(validator.description).toEqual("Required Validator");
        expect(validator.returningErrorMessage).toEqual("The value of :value is required");
        // Ensure ts compile this
        const validatorFunction = validator.validate;
        expect(validatorFunction).not.toBeNull();
        const isValid = validator.validate(1);
        expect(isValid).toBeTruthy();
    });
});
