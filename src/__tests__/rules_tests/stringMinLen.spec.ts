import { stringMinLen } from "../../rules/stringMinLen"
import { RuleViolation } from "../../types/ValidationRule"

describe(`Test ${stringMinLen.name}`, () => {
    it("should return false and have default error message", () => {
        const minLen = 10
        const defaultErrorMessage = `The minimum string is ${minLen}.`
        const validateFunc = stringMinLen(minLen, defaultErrorMessage)

        const input = "abcd"

        const actual = validateFunc(input, {})
        const expected: RuleViolation = {
            ruleName: stringMinLen.name,
            attemptedValue: input,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${stringMinLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const minLen = 10
        const customErrorMessage = `Hey we want a string with minimum length = 10.`
        const validateFunc = stringMinLen(minLen, customErrorMessage)

        const input = "abcd"

        const actual = validateFunc(input, {})
        const expected: RuleViolation = {
            ruleName: stringMinLen.name,
            attemptedValue: input,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${stringMinLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const minLen = 5
        const customErrorMessage = `Hey we want a string with minimum length = 10.`
        const validateFunc = stringMinLen(minLen, customErrorMessage)

        const input = "abcde"

        const actual = validateFunc(input, {})
        const expected = undefined
        expect(actual).toEqual(expected)
    })
})

describe(`Test ${stringMinLen.name}`, () => {
    it("should throw when given a non-number value", () => {
        const maxValue = 100;
        const validateFunc = stringMinLen(maxValue);
        const badInput = 10000000 as any as string;

        const actual = () => validateFunc(badInput, {});
        const expectedMessage = `${stringMinLen.name}: Expected a string but received ${typeof badInput}.`;

        expect(actual).toThrow(new Error(expectedMessage));
    });
});


describe(`Test ${stringMinLen.name}`, () => {
    it("should throw when given a non-number value", () => {
        const maxValue = -100;

        const actual = () => stringMinLen(maxValue);
        const expectedMessage = `${stringMinLen.name}: The minimum length argument must be a non-negative number.`;

        expect(actual).toThrow(new Error(expectedMessage));
    });
});
