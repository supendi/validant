import { minNumber } from "../../rules/minNumber"
import { PropertyRuleValidationResult } from "../../types"

describe(`Test ${minNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const minValue = 10
        const ruleFunc = minNumber(minValue)
        const myNumber = 5
        const defaultErrorMessage = `The minimum value for this field is ${minValue}.`

        const actual = ruleFunc(myNumber, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${minNumber.name}`, () => {
    it("should return false and have custom error message", () => {
        const minValue = 2
        const customErrorMessage = "Minimum order for this item is 2"
        const ruleFunc = minNumber(minValue, customErrorMessage)
        const myNumber = 1

        const actual = ruleFunc(myNumber, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${minNumber.name}`, () => {
    it("should return true and empty error message", () => {
        const minValue = 2
        const customErrorMessage = "Minimum order for this item is 2"
        const ruleFunc = minNumber(minValue, customErrorMessage)
        const orderItems = 100

        const actual = ruleFunc(orderItems, {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${minNumber.name}`, () => {
    it("should throw when given a non-number value", () => {
        const maxValue = 100;
        const ruleFunc = minNumber(maxValue);
        const badInput = "1" as any as number;

        const actual = () => ruleFunc(badInput, {});
        const expectedMessage = `${minNumber.name}: Value is not a number. The value was: ${badInput} (type: '${typeof badInput}')`;

        expect(actual).toThrow(new Error(expectedMessage));
    });
});
