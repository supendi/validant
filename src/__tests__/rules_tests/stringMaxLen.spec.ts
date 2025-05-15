import { stringMaxLen } from "../../rules/stringMaxLen"
import { PropertyRuleValidationResult } from "../../types/ValidationRule"

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return false and have default error message", () => {
        const maxLength = 3
        const defaultErrorMessage = `The maximum length allowed is ${maxLength} characters.`
        const ruleFunc = stringMaxLen(maxLength, defaultErrorMessage)
        const input = "abcd"

        const actual = ruleFunc(input, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: defaultErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return false and have custom error message", () => {
        const maxLength = 5
        const customErrorMessage = `Hey we want a string with max length = 5.`
        const ruleFunc = stringMaxLen(maxLength, customErrorMessage)

        const input = "12345601"

        const actual = ruleFunc(input, {})
        const expected: PropertyRuleValidationResult = {
            isValid: false,
            errorMessage: customErrorMessage
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${stringMaxLen.name}`, () => {
    it("should return true and have custom error message", () => {
        const maxLength = 1000
        const defaultValidatorErrorMessage = `The max length string is ${maxLength}.`
        const ruleFunc = stringMaxLen(maxLength, defaultValidatorErrorMessage)

        const actual = ruleFunc("input", {})
        const expected: PropertyRuleValidationResult = {
            isValid: true
        }

        expect(actual).toEqual(expected)
    })
})

describe(`Test ${stringMaxLen.name}`, () => {
    it("should throw when given a non-number value", () => {
        const maxValue = 100;
        const ruleFunc = stringMaxLen(maxValue);
        const badInput = 10000000 as any as string;

        const actual = () => ruleFunc(badInput, {});
        const expectedMessage = `${stringMaxLen.name}: Expected a string but received ${typeof badInput}.`;

        expect(actual).toThrow(new Error(expectedMessage));
    });
});


describe(`Test ${stringMaxLen.name}`, () => {
    it("should throw when given a non-number value", () => {
        const maxValue = -100; 

        const actual = () => stringMaxLen(maxValue); 
        const expectedMessage = `${stringMaxLen.name}: The maximum length argument must be a non-negative number.`;

        expect(actual).toThrow(new Error(expectedMessage));
    });
});
