"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailAddress_1 = require("../../validators/emailAddress");
describe(`Test ${emailAddress_1.emailAddress.name}`, () => {
    it("should return false and have default error message", () => {
        const testValue = "wrongemail@.com";
        const validator = (0, emailAddress_1.emailAddress)();
        const defaultValidatorErrorMessage = `Invalid email address. The valid email example: john.doe@example.com.`;
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage);
        var isValid = validator.validate(testValue);
        expect(isValid).toEqual(false);
    });
});
describe(`Test ${emailAddress_1.emailAddress.name}`, () => {
    it("should return false and have custom error message", () => {
        const testValue = "another@wrong@email.com";
        const customErrorMessage = `Invalid email address '${testValue}'`;
        const validator = (0, emailAddress_1.emailAddress)(customErrorMessage);
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customErrorMessage);
        var isValid = validator.validate(testValue);
        expect(isValid).toEqual(false);
    });
});
describe(`Test ${emailAddress_1.emailAddress.name}`, () => {
    it("should return true and have custom error message", () => {
        const testValue = 'john@doe.com';
        const customErrorMessage = `Invalid email.`;
        const validator = (0, emailAddress_1.emailAddress)(customErrorMessage);
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customErrorMessage);
        var isValid = validator.validate(testValue);
        expect(isValid).toEqual(true);
    });
});
describe(`Test ${emailAddress_1.emailAddress.name}`, () => {
    it("should return false and have custom error message", () => {
        const testValue = 'john@';
        const customErrorMessage = `Invalid email :value`;
        const validator = (0, emailAddress_1.emailAddress)(customErrorMessage);
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customErrorMessage);
        var isValid = validator.validate(testValue);
        expect(isValid).toEqual(false);
    });
});
