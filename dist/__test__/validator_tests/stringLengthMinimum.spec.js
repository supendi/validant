"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringLengthMinimum_1 = require("../../validators/stringLengthMinimum");
describe(`Test ${stringLengthMinimum_1.stringLengthMinimum.name}`, () => {
    it("should return false and have default error message", () => {
        const minLen = 10;
        const defaultValidatorErrorMessage = `The minimum string is ${minLen}.`;
        const validator = (0, stringLengthMinimum_1.stringLengthMinimum)(minLen, defaultValidatorErrorMessage);
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage);
        var isValid = validator.validate("abcd");
        expect(isValid).toEqual(false);
    });
});
describe(`Test ${stringLengthMinimum_1.stringLengthMinimum.name}`, () => {
    it("should return false and have custom error message", () => {
        const minLen = 10;
        const defaultValidatorErrorMessage = `Hey we want a string with minimum length = 10.`;
        const validator = (0, stringLengthMinimum_1.stringLengthMinimum)(minLen, defaultValidatorErrorMessage);
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage);
        var isValid = validator.validate("12345601");
        expect(isValid).toEqual(false);
    });
});
describe(`Test ${stringLengthMinimum_1.stringLengthMinimum.name}`, () => {
    it("should return true and have custom error message", () => {
        const minLen = 5;
        const defaultValidatorErrorMessage = `The minimum string is ${minLen}.`;
        const validator = (0, stringLengthMinimum_1.stringLengthMinimum)(1, defaultValidatorErrorMessage);
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage);
        var isValid = validator.validate("abcde");
        expect(isValid).toEqual(true);
    });
});
describe(`Test ${stringLengthMinimum_1.stringLengthMinimum.name}`, () => {
    it("should return true and have custom error message", () => {
        const minLen = 5;
        const defaultValidatorErrorMessage = `The minimum string is ${minLen}.`;
        const validator = (0, stringLengthMinimum_1.stringLengthMinimum)(1, defaultValidatorErrorMessage);
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage);
        var isValid = validator.validate("asdfasdfasdf");
        expect(isValid).toEqual(true);
    });
});
describe(`Test ${stringLengthMinimum_1.stringLengthMinimum.name}`, () => {
    it("should return true and have custom error message", () => {
        const minLen = 5;
        const defaultValidatorErrorMessage = `The minimum string is ${minLen}.`;
        const validator = (0, stringLengthMinimum_1.stringLengthMinimum)(1, defaultValidatorErrorMessage);
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage);
        var isValid = validator.validate(12345);
        expect(isValid).toEqual(true);
    });
});
