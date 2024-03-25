"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alphabetOnly_1 = require("../../validators/alphabetOnly");
describe(`Test ${alphabetOnly_1.alphabetOnly.name}`, () => {
    it("should return false and have default error message", () => {
        const defaultValidatorErrorMessage = "This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces.";
        const validator = (0, alphabetOnly_1.alphabetOnly)(defaultValidatorErrorMessage);
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage);
        const testValue = "abcdD1unseenA number";
        var isValid = validator.validate(testValue);
        expect(isValid).toEqual(false);
    });
});
describe(`Test ${alphabetOnly_1.alphabetOnly.name}`, () => {
    it("should return false and have custom error message", () => {
        const customeMessage = "Hey be good bro.";
        const validator = (0, alphabetOnly_1.alphabetOnly)(customeMessage);
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customeMessage);
        const testValue = "abcd*,.asdf|'asd!@#$%^&*()";
        var isValid = validator.validate(testValue);
        expect(isValid).toEqual(false);
    });
});
describe(`Test ${alphabetOnly_1.alphabetOnly.name}`, () => {
    it("should return true and have custom error message", () => {
        const customeMessage = "Hey be good bro.";
        const validator = (0, alphabetOnly_1.alphabetOnly)(customeMessage);
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customeMessage);
        const testValue = "Here I am having space but not dot or comma";
        var isValid = validator.validate(testValue);
        expect(isValid).toEqual(true);
    });
});
