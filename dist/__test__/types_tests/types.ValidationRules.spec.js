"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Ensure all the code below compiled
 */
describe("ValidationRules Simple Person Test", () => {
    it("Should compile", () => {
        const requiredValidator = {
            description: "Required Validator",
            returningErrorMessage: "This field is required",
            validate: (value, obj) => {
                return !!value;
            }
        };
        const minNumberValidator = {
            description: "Minimum Number Validator",
            returningErrorMessage: "Minimum number is",
            validate: (value, obj) => {
                return false;
            }
        };
        const rules = {
            name: [requiredValidator],
            age: [requiredValidator, minNumberValidator],
        };
        expect(rules).not.toBeUndefined();
        expect(rules.name).not.toBeUndefined();
        expect(rules.age).not.toBeUndefined();
        expect(Array.isArray(rules.name)).toBeTruthy();
        expect(Array.isArray(rules.age)).toBeTruthy();
        expect(rules.name.length).toEqual(1);
        expect(rules.age.length).toEqual(2);
        const nameValidators = rules.name;
        expect(nameValidators[0]).not.toBeUndefined();
        expect(nameValidators[0]).toEqual(requiredValidator);
        const ageValidators = rules.age;
        expect(ageValidators[0]).not.toBeUndefined();
        expect(ageValidators[0]).toEqual(requiredValidator);
        expect(ageValidators[1]).not.toBeUndefined();
        expect(ageValidators[1]).toEqual(minNumberValidator);
    });
});
describe("ValidationRules Complex Person Test", () => {
    it("Should compile", () => {
        const requiredValidator = {
            description: "Required Validator",
            returningErrorMessage: "This field is required",
            validate: (value, obj) => {
                return !!value;
            }
        };
        const minNumberValidator = {
            description: "Minimum Number Validator",
            returningErrorMessage: "Minimum number is",
            validate: (value, obj) => {
                return false;
            }
        };
        const maxNumberValidator = {
            description: "Max Number Validator",
            returningErrorMessage: "Maximum number is",
            validate: (value, obj) => {
                return false;
            }
        };
        const personRules = {
            name: [requiredValidator],
            age: [requiredValidator, minNumberValidator],
            father: {
                name: [requiredValidator],
                age: [maxNumberValidator],
            }
        };
        personRules.children = {
            validators: [requiredValidator],
            validationRule: {
                name: [requiredValidator],
                age: [requiredValidator, minNumberValidator],
                father: {
                    name: [requiredValidator],
                    age: [maxNumberValidator],
                }
            }
        };
        expect(personRules).not.toBeUndefined();
        expect(personRules.name).not.toBeUndefined();
        expect(personRules.age).not.toBeUndefined();
        expect(Array.isArray(personRules.name)).toBeTruthy();
        expect(Array.isArray(personRules.age)).toBeTruthy();
        expect(personRules.name.length).toEqual(1);
        expect(personRules.age.length).toEqual(2);
        const nameValidators = personRules.name;
        expect(nameValidators[0]).not.toBeUndefined();
        expect(nameValidators[0]).toEqual(requiredValidator);
        const ageValidators = personRules.age;
        expect(ageValidators[0]).not.toBeUndefined();
        expect(ageValidators[0]).toEqual(requiredValidator);
        expect(ageValidators[1]).not.toBeUndefined();
        expect(ageValidators[1]).toEqual(minNumberValidator);
        const fatherRules = personRules.father;
        expect(fatherRules).not.toBeUndefined();
        expect(fatherRules).toEqual({
            name: [requiredValidator],
            age: [maxNumberValidator],
        });
        expect(fatherRules.name.length).toEqual(1);
        expect(fatherRules.age.length).toEqual(1);
        const fatherNameValidators = fatherRules.name;
        expect(fatherNameValidators[0]).not.toBeUndefined();
        expect(fatherNameValidators[0]).toEqual(requiredValidator);
        const fatherAgeValidators = fatherRules.age;
        expect(fatherAgeValidators[0]).not.toBeUndefined();
        expect(fatherAgeValidators[0]).toEqual(maxNumberValidator);
        const childrenRules = personRules.children;
        expect(childrenRules).not.toBeUndefined();
        expect(childrenRules).toEqual({
            validators: [requiredValidator],
            validationRule: {
                name: [requiredValidator],
                age: [requiredValidator, minNumberValidator],
                father: {
                    name: [requiredValidator],
                    age: [maxNumberValidator],
                }
            }
        });
        expect(childrenRules.validators.length).toEqual(1);
        expect(childrenRules.validationRule).toEqual({
            name: [requiredValidator],
            age: [requiredValidator, minNumberValidator],
            father: {
                name: [requiredValidator],
                age: [maxNumberValidator],
            }
        });
        const childrenValidationRule = childrenRules.validationRule;
        expect(childrenValidationRule.name).not.toBeUndefined();
        expect(childrenValidationRule.name).toEqual([requiredValidator]);
        expect(childrenValidationRule.age).not.toBeUndefined();
        expect(childrenValidationRule.age).toEqual([requiredValidator, minNumberValidator]);
    });
});
