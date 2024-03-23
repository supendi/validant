"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_validator_1 = require("../../validators/custom-validator");
describe("CustomValidator Test", () => {
    it("Test simple custom validator", () => {
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
        const customValidator = (0, custom_validator_1.custom)(hoc(), errorMessage);
        expect(customValidator).not.toBeUndefined();
        expect(customValidator.validate).not.toBeUndefined();
        expect(customValidator.returningErrorMessage).toEqual(errorMessage);
        let input = undefined;
        let isValid = customValidator.validate(input);
        expect(isValid).toEqual(false);
        input = "undefined";
        isValid = customValidator.validate(input);
        expect(isValid).toEqual(false);
        input = "";
        isValid = customValidator.validate(input);
        expect(isValid).toEqual(false);
        input = "1";
        isValid = customValidator.validate(input);
        expect(isValid).toEqual(false);
        input = 2;
        isValid = customValidator.validate(input);
        expect(isValid).toEqual(false);
        input = false;
        isValid = customValidator.validate(input);
        expect(isValid).toEqual(false);
        input = function () { };
        isValid = customValidator.validate(input);
        expect(isValid).toEqual(false);
        input = 1;
        isValid = customValidator.validate(input);
        expect(isValid).toEqual(true);
        input = 0;
        isValid = customValidator.validate(input);
        expect(isValid).toEqual(true);
        input = 0;
        isValid = customValidator.validate(input);
        expect(isValid).toEqual(true);
    });
});
describe("CustomValidator Test", () => {
    it("Test custom validator against complex type", () => {
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
        const guardAgainstMinusQuantityValidator = (value, object) => {
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
        const customValidator = (0, custom_validator_1.custom)(guardAgainstMinusQuantityValidator, errorMessage);
        expect(customValidator).not.toBeUndefined();
        expect(customValidator.validate).not.toBeUndefined();
        expect(customValidator.returningErrorMessage).toEqual(errorMessage);
        let inputValue = undefined;
        let isValid = customValidator.validate(inputValue);
        expect(isValid).toEqual(false);
        inputValue = undefined;
        isValid = customValidator.validate(inputValue);
        expect(isValid).toEqual(false);
        inputValue = undefined;
        isValid = customValidator.validate(inputValue, order);
        expect(isValid).toEqual(false);
    });
});
