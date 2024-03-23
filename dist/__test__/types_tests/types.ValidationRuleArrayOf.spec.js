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
            validatorOfArray: [requiredValidator],
            validationRuleOfArrayElement: personRule,
        };
        expect(arrayOfPersonRule).not.toBeUndefined();
        expect(arrayOfPersonRule.validatorOfArray).not.toBeUndefined();
        expect(Array.isArray(arrayOfPersonRule.validatorOfArray)).toBeTruthy();
        expect(arrayOfPersonRule.validatorOfArray.length).toEqual(1);
        expect(arrayOfPersonRule.validatorOfArray[0]).toEqual(requiredValidator);
    });
});
