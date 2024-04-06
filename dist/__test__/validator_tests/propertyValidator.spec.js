"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const propertyValidator_1 = require("../../propertyValidators/propertyValidator");
describe(`Test ${propertyValidator_1.propertyValidator.name}`, () => {
    it("Test simple property validator", () => {
        function hoc() {
            const maximumNumberIsOneValidator = (value, object) => {
                if (value === undefined || value === null) {
                    return false;
                }
                const typeofValue = typeof (value);
                const valueIsNumber = typeofValue === "bigint" || typeofValue === "number";
                if (!valueIsNumber) {
                    return false;
                }
                return value <= 1;
            };
            return maximumNumberIsOneValidator;
        }
        const errorMessage = "There is error.";
        const propValidator = (0, propertyValidator_1.propertyValidator)(hoc(), errorMessage);
        expect(propValidator).not.toBeUndefined();
        expect(propValidator.validate).not.toBeUndefined();
        expect(propValidator.returningErrorMessage).toEqual(errorMessage);
        let input = undefined;
        let isValid = propValidator.validate(input);
        expect(isValid).toEqual(false);
        input = "undefined";
        isValid = propValidator.validate(input);
        expect(isValid).toEqual(false);
        input = "";
        isValid = propValidator.validate(input);
        expect(isValid).toEqual(false);
        input = "1";
        isValid = propValidator.validate(input);
        expect(isValid).toEqual(false);
        input = 2;
        isValid = propValidator.validate(input);
        expect(isValid).toEqual(false);
        input = false;
        isValid = propValidator.validate(input);
        expect(isValid).toEqual(false);
        input = function () { };
        isValid = propValidator.validate(input);
        expect(isValid).toEqual(false);
        input = 1;
        isValid = propValidator.validate(input);
        expect(isValid).toEqual(true);
        input = 0;
        isValid = propValidator.validate(input);
        expect(isValid).toEqual(true);
        input = 0;
        isValid = propValidator.validate(input);
        expect(isValid).toEqual(true);
    });
});
describe(`Test ${propertyValidator_1.propertyValidator.name}`, () => {
    it("Test property validator against complex type", () => {
        const order = {
            number: 1,
            orderItems: [
                {
                    qty: 1
                },
                {
                    qty: 2
                },
                {
                    qty: -1
                }
            ]
        };
        const positiveNumber = (value, object) => {
            if (!object) {
                return false;
            }
            for (let index = 0; index < object.orderItems.length; index++) {
                const orderItem = object.orderItems[index];
                if (orderItem.qty < 0) {
                    return false;
                }
            }
            return true;
        };
        const errorMessage = "There is error.";
        const propValidator = (0, propertyValidator_1.propertyValidator)(positiveNumber, errorMessage);
        expect(propValidator).not.toBeUndefined();
        expect(propValidator.validate).not.toBeUndefined();
        expect(propValidator.returningErrorMessage).toEqual(errorMessage);
        let inputValue = undefined;
        let isValid = propValidator.validate(inputValue);
        expect(isValid).toEqual(false);
        inputValue = undefined;
        isValid = propValidator.validate(inputValue);
        expect(isValid).toEqual(false);
        inputValue = undefined;
        isValid = propValidator.validate(inputValue, order);
        expect(isValid).toEqual(false);
    });
});
