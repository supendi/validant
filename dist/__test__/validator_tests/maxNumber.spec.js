"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maxNumber_1 = require("../../propertyValidators/maxNumber");
describe(`Test ${maxNumber_1.maxNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const maxValue = 5;
        const validator = (0, maxNumber_1.maxNumber)(maxValue);
        const myNumber = 10;
        const defaultValidatorErrorMessage = `The maximum value for this field is ${maxValue}.`;
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(defaultValidatorErrorMessage);
        var isValid = validator.validate(myNumber);
        expect(isValid).toEqual(false);
    });
});
describe(`Test ${maxNumber_1.maxNumber.name}`, () => {
    it("should return false and have custom error message", () => {
        const maxValue = 1;
        const customErrorMessage = `Maximum order for this item is ${maxValue}.`;
        const validator = (0, maxNumber_1.maxNumber)(maxValue, customErrorMessage);
        const myNumber = 2;
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customErrorMessage);
        var isValid = validator.validate(myNumber);
        expect(isValid).toEqual(false);
    });
});
describe(`Test ${maxNumber_1.maxNumber.name}`, () => {
    it("should return true and have custom error message", () => {
        const maxValue = 100;
        const customErrorMessage = `Maximum order for this item is ${maxValue}.`;
        const validator = (0, maxNumber_1.maxNumber)(maxValue, customErrorMessage);
        const orderItems = 1;
        expect(validator).not.toBeUndefined();
        expect(validator.validate).not.toBeUndefined();
        expect(validator.returningErrorMessage).toEqual(customErrorMessage);
        var isValid = validator.validate(orderItems);
        expect(isValid).toEqual(true);
    });
});
