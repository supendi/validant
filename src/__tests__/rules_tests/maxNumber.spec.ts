import { maxNumber } from "../../rules/maxNumber"
import { RuleViolation } from "../../types/ValidationRule"

describe(`Test ${maxNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const maxValue = 5
        const validateFunc = maxNumber(maxValue)
        const value = 10
        const defaultErrorMessage = `The maximum value for this field is ${maxValue}.`

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: maxNumber.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${maxNumber.name}`, () => {
    it("should return false and have custom error message", () => {
        const maxValue = 1
        const customErrorMessage = `Maximum order for this item is ${maxValue}.`
        const validateFunc = maxNumber(maxValue, customErrorMessage)
        const value = 2

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: maxNumber.name,
            attemptedValue: value,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${maxNumber.name}`, () => {
    it("should return true and empty error", () => {
        const maxValue = 100
        const customErrorMessage = `Maximum order for this item is ${maxValue}.`
        const validateFunc = maxNumber(maxValue, customErrorMessage)
        const orderItems = 1

        const actual = validateFunc(orderItems, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${maxNumber.name}`, () => {
    it("should throw when given a non-number value", () => {
        const maxValue = 100;
        const validateFunc = maxNumber(maxValue);
        const badInput = "1" as any as number;

        const actual = () => validateFunc(badInput, {});
        const expectedMessage = `${maxNumber.name}: Value is not a number. The value was: ${badInput} (type: '${typeof badInput}')`;

        expect(actual).toThrow(new Error(expectedMessage));
    });
});
