"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ensure all the code below compiled
 */
describe("ValidationRuleArrayOf Simple Person Test", () => {
    it("Should compile", () => {
        const requiredValidator = {
            description: "Required Validator",
            returningErrorMessage: "This field is required",
            validate: (value, obj) => {
                return !!value;
            }
        };
        const minNumberValidator = {
            description: "Minimum Number Validator",
            returningErrorMessage: "Minimum number is",
            validate: (value, obj) => {
                return false;
            }
        };
        const personRule = {
            name: [requiredValidator],
            age: [requiredValidator, minNumberValidator],
        };
        const arrayOfPersonRule = {
            propertyValidators: [requiredValidator],
            validationRule: personRule,
        };
        expect(arrayOfPersonRule).not.toBeUndefined();
        expect(arrayOfPersonRule.propertyValidators).not.toBeUndefined();
        expect(Array.isArray(arrayOfPersonRule.propertyValidators)).toBeTruthy();
        expect(arrayOfPersonRule.propertyValidators.length).toEqual(1);
        expect(arrayOfPersonRule.propertyValidators[0]).toEqual(requiredValidator);
    });
});
