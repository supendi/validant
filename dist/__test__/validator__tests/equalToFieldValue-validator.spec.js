"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equalToFieldValue_validator_1 = require("../../validators/equalToFieldValue-validator");
describe("EqualToFieldValueValidator Test", () => {
    it("should return false and have default error message", () => {
        const testValue = 'email';
        const validator = (0, equalToFieldValue_validator_1.equalToFieldValue)(testValue);
        const defaultValidatorErrorMessage = `The value should be equal to the value of '${testValue}'`;
        const inputValue = "test12333@gmail.com";
        const object = {
            email: "test123@gmail.com"
        };
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage);
        var isValid = validator.validate(inputValue, object);
        expect(isValid).toEqual(false);
    });
});
describe("EqualToFieldValueValidator Test", () => {
    it("should return false and have custom error message", () => {
        const testValue = 'email';
        const customErrorMessage = `Hey the email and re-enter email is must be equal`;
        const validator = (0, equalToFieldValue_validator_1.equalToFieldValue)(testValue, customErrorMessage);
        const inputValue = "test123@gmail.com";
        const object = {
            email: "test@gmail.com"
        };
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customErrorMessage);
        var isValid = validator.validate(inputValue, object);
        expect(isValid).toEqual(false);
    });
});
describe("EqualToFieldValueValidator Test", () => {
    it("should return true and have custom error message", () => {
        const testValue = 'email';
        const customErrorMessage = `Hey the email and re-enter email is must be equal`;
        const validator = (0, equalToFieldValue_validator_1.equalToFieldValue)(testValue, customErrorMessage);
        const inputValue = "test@gmail.com";
        const object = {
            email: "test@gmail.com"
        };
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customErrorMessage);
        var isValid = validator.validate(inputValue, object);
        expect(isValid).toEqual(true);
    });
});
