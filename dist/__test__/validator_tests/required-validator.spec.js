"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const required_validator_1 = require("../../validators/required-validator");
describe("RequiredValidator Test", () => {
    it("RequiredValidator should return false and have default error message", () => {
        const validator = (0, required_validator_1.required)();
        const myName = "";
        const defaultValidatorErrorMessage = "This field is required.";
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage);
        var isValid = validator.validate(myName);
        expect(isValid).toEqual(false);
    });
});
describe("RequiredValidator Test", () => {
    it("RequiredValidator should return false and have custom error message", () => {
        const customErrorMessage = "Please fill this field";
        const validator = (0, required_validator_1.required)(customErrorMessage);
        const myName = "";
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customErrorMessage);
        var isValid = validator.validate(myName);
        expect(isValid).toEqual(false);
    });
});
describe("RequiredValidator Test", () => {
    it("RequiredValidator should return true and have custom error message", () => {
        const customErrorMessage = "Please fill this field";
        const validator = (0, required_validator_1.required)(customErrorMessage);
        const myName = "Is Not empty";
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customErrorMessage);
        var isValid = validator.validate(myName);
        expect(isValid).toEqual(true);
    });
});
