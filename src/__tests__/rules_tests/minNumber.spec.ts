import { minNumber } from "../../rules/minNumber"
import { RuleViolation } from "../../types/ValidationRule"

describe(`Test ${minNumber.name}`, () => {
    it("should return false and have default error message", () => {
        const minValue = 10
        const validateFunc = minNumber(minValue)
        const value = 5
        const defaultErrorMessage = `The minimum value for this field is ${minValue}.`

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: minNumber.name,
            attemptedValue: value,
            errorMessage: defaultErrorMessage
        }
        expect(actual).toEqual(expected)
    })
})

describe(`Test ${minNumber.name}`, () => {
    it("should return false and have custom error message", () => {
        const minValue = 2
        const customErrorMessage = "Minimum order for this item is 2"
        const validateFunc = minNumber(minValue, customErrorMessage)
        const value = 1

        const actual = validateFunc(value, {})
        const expected: RuleViolation = {
            ruleName: minNumber.name,
            attemptedValue: value,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${minNumber.name}`, () => {
    it("should return true and empty error message", () => {
        const minValue = 2
        const customErrorMessage = "Minimum order for this item is 2"
        const validateFunc = minNumber(minValue, customErrorMessage)
        const orderItems = 100

        const actual = validateFunc(orderItems, {})
        const expected = undefined

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${minNumber.name}`, () => {
    it("should throw when given a non-number value", () => {
        const maxValue = 100;
        const validateFunc = minNumber(maxValue);
        const badInput = "1" as any as number;

        const actual = () => validateFunc(badInput, {});
        const expectedMessage = `${minNumber.name}: Value is not a number. The value was: ${badInput} (type: '${typeof badInput}')`;

        expect(actual).toThrow(new Error(expectedMessage));
    });
});
