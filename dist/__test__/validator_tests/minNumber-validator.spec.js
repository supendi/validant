"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minNumber_validator_1 = require("../../validators/minNumber-validator");
describe(`Test ${minNumber_validator_1.minNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const minValue = 10;
        const validator = (0, minNumber_validator_1.minNumber)(minValue);
        const myNumber = 5;
        const defaultValidatorErrorMessage = `The minimum value for this field is ${minValue}.`;
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage);
        var isValid = validator.validate(myNumber);
        expect(isValid).toEqual(false);
    });
});
describe(`Test ${minNumber_validator_1.minNumber.name}`, () => {
    it("should return false and have custom error message", () => {
        const minValue = 2;
        const customErrorMessage = "Minimum order for this item is 2";
        const validator = (0, minNumber_validator_1.minNumber)(minValue, customErrorMessage);
        const myNumber = 1;
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customErrorMessage);
        var isValid = validator.validate(myNumber);
        expect(isValid).toEqual(false);
    });
});
describe(`Test ${minNumber_validator_1.minNumber.name}`, () => {
    it("should return true and have custom error message", () => {
        const minValue = 2;
        const customErrorMessage = "Minimum order for this item is 2";
        const validator = (0, minNumber_validator_1.minNumber)(minValue, customErrorMessage);
        const orderItems = 100;
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customErrorMessage);
        var isValid = validator.validate(orderItems);
        expect(isValid).toEqual(true);
    });
});
