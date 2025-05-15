import { maxNumber } from "../../rules/maxNumber"
import { PropertyRuleValidationResult } from "../../types/ValidationRule"

describe(`Test ${maxNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const maxValue = 5
        const ruleFunc = maxNumber(maxValue)
        const myNumber = 10
        const defaultErrorMessage = `The maximum value for this field is ${maxValue}.`

        const actual = ruleFunc(myNumber, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${maxNumber.name}`, () => {
    it("should return false and have custom error message", () => {
        const maxValue = 1
        const customErrorMessage = `Maximum order for this item is ${maxValue}.`
        const ruleFunc = maxNumber(maxValue, customErrorMessage)
        const myNumber = 2

        const actual = ruleFunc(myNumber, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${maxNumber.name}`, () => {
    it("should return true and empty error", () => {
        const maxValue = 100
        const customErrorMessage = `Maximum order for this item is ${maxValue}.`
        const ruleFunc = maxNumber(maxValue, customErrorMessage)
        const orderItems = 1

        const actual = ruleFunc(orderItems, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${maxNumber.name}`, () => {
    it("should throw when given a non-number value", () => {
        const maxValue = 100;
        const ruleFunc = maxNumber(maxValue);
        const badInput = "1" as any as number;

        const actual = () => ruleFunc(badInput, {});
        const expectedMessage = `${maxNumber.name}: Value is not a number. The value was: ${badInput} (type: '${typeof badInput}')`;

        expect(actual).toThrow(new Error(expectedMessage));
    });
});
