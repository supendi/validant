import { validateObject, validatePrimitiveField, isArrayValidationRule, PropertyType, Violations, PrimitiveFieldValidationResult, ObjectFieldValidationResult } from "../../../../validators/sync/validateObject";
import { ErrorOf, ErrorOfArray } from "../../../../types/ErrorOf";
import { ValidationRule, ArrayValidationRule, ValidateFunc, RuleViolation } from "../../../../types/ValidationRule";
import { required } from "../../../../rules/required";
import { isString } from "../../../../rules/isString";
import { isNumber } from "../../../../rules/isNumber";
import { arrayMinLen } from "../../../../rules/arrayMinLen";

describe("validateObject", () => {
    // Helper functions for creating test data
    const createRuleViolation = (ruleName: string, attemptedValue: any, errorMessage: string): RuleViolation => ({
        ruleName,
        attemptedValue,
        errorMessage
    });

    const mockValidateFunc = (shouldFail: boolean, errorMessage = "Mock error"): ValidateFunc<any, any> => {
        return (value: any, root: any) => {
            if (shouldFail) {
                return createRuleViolation("mockRule", value, errorMessage);
            }
            return undefined;
        };
    };

    describe("isArrayValidationRule", () => {
        test("should return true for valid array validation rule with arrayRules", () => {
            const rule: ArrayValidationRule<string[], any> = {
                arrayRules: [required()]
            };

            const result = isArrayValidationRule(rule);

            expect(result).toBe(true);
        });

        test("should return true for valid array validation rule with arrayElementRule", () => {
            const rule: ArrayValidationRule<string[], any> = {
                arrayElementRule: [required()]
            };

            const result = isArrayValidationRule(rule);

            expect(result).toBe(true);
        });

        test("should return true for valid array validation rule with both arrayRules and arrayElementRule", () => {
            const rule: ArrayValidationRule<string[], any> = {
                arrayRules: [required()],
                arrayElementRule: [isString()]
            };

            const result = isArrayValidationRule(rule);

            expect(result).toBe(true);
        });

        test("should return false for null rule", () => {
            const result = isArrayValidationRule(null as any);

            expect(result).toBe(false);
        });

        test("should return false for undefined rule", () => {
            const result = isArrayValidationRule(undefined as any);

            expect(result).toBe(false);
        });

        test("should return false for array rule", () => {
            const rule = [required()];

            const result = isArrayValidationRule(rule as any);

            expect(result).toBe(false);
        });

        test("should return false for primitive rule", () => {
            const rule = "string";

            const result = isArrayValidationRule(rule as any);

            expect(result).toBe(false);
        });

        test("should return false for rule with invalid keys", () => {
            const rule = {
                invalidKey: [required()],
                anotherInvalidKey: "test"
            };

            const result = isArrayValidationRule(rule as any);

            expect(result).toBe(false);
        });

        test("should return false for rule with mix of valid and invalid keys", () => {
            const rule = {
                arrayRules: [required()],
                invalidKey: "test"
            };

            const result = isArrayValidationRule(rule as any);

            expect(result).toBe(false);
        });

        test("should return true for empty object (edge case)", () => {
            const rule = {};

            const result = isArrayValidationRule(rule as any);

            expect(result).toBe(true);
        });
    });

    describe("validatePrimitiveField", () => {
        interface TestObject {
            name: string;
            age: number;
        }

        test("should return valid result when all rules pass", () => {
            const obj: TestObject = { name: "John", age: 25 };
            const rules = [mockValidateFunc(false), mockValidateFunc(false)];

            const result = validatePrimitiveField("name", obj, obj, rules);

            expect(result.isValid).toBe(true);
            expect(result.errors).toEqual([]);
        });

        test("should return invalid result when one rule fails", () => {
            const obj: TestObject = { name: "", age: 25 };
            const violation = createRuleViolation("required", "", "This field is required.");
            const rules = [required(), mockValidateFunc(false)];

            const result = validatePrimitiveField("name", obj, obj, rules);

            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0]).toEqual(violation);
        });

        test("should return invalid result when multiple rules fail", () => {
            const obj: TestObject = { name: "", age: 25 };
            const rules = [mockValidateFunc(true, "Error 1"), mockValidateFunc(true, "Error 2")];

            const result = validatePrimitiveField("name", obj, obj, rules);

            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(2);
            expect(result.errors[0].errorMessage).toBe("Error 1");
            expect(result.errors[1].errorMessage).toBe("Error 2");
        });

        test("should skip null/undefined rules", () => {
            const obj: TestObject = { name: "John", age: 25 };
            const rules = [mockValidateFunc(false), null as any, undefined as any, mockValidateFunc(false)];

            const result = validatePrimitiveField("name", obj, obj, rules);

            expect(result.isValid).toBe(true);
            expect(result.errors).toEqual([]);
        });

        test("should throw error for non-function rule", () => {
            const obj: TestObject = { name: "John", age: 25 };
            const rules = ["not a function" as any];

            expect(() => {
                validatePrimitiveField("name", obj, obj, rules);
            }).toThrow("propertyRuleFunc is not a function");
        });

        test("should handle empty rules array", () => {
            const obj: TestObject = { name: "John", age: 25 };
            const rules: ValidateFunc<string, TestObject>[] = [];

            const result = validatePrimitiveField("name", obj, obj, rules);

            expect(result.isValid).toBe(true);
            expect(result.errors).toEqual([]);
        });
    });

    describe("validateObject", () => {
        interface SimpleObject {
            name: string;
            age: number;
        }

        interface ComplexObject {
            user: {
                name: string;
                email: string;
            };
            tags: string[];
            items: {
                id: number;
                title: string;
            }[];
        }

        test("should throw error for null validation rule", () => {
            const obj = { name: "John" };

            expect(() => {
                validateObject(obj, obj, null as any);
            }).toThrow("validant: validation rule is null or undefined.");
        });

        test("should throw error for undefined validation rule", () => {
            const obj = { name: "John" };

            expect(() => {
                validateObject(obj, obj, undefined as any);
            }).toThrow("validant: validation rule is null or undefined.");
        });

        test("should handle null object by creating empty object", () => {
            const rule: ValidationRule<SimpleObject> = {
                name: [required()]
            };

            const result = validateObject(null as any, null as any, rule);

            expect(result).toBeDefined();
            expect(result?.name).toBeDefined();
        });

        test("should handle undefined object by creating empty object", () => {
            const rule: ValidationRule<SimpleObject> = {
                name: [required()]
            };

            const result = validateObject(undefined as any, undefined as any, rule);

            expect(result).toBeDefined();
            expect(result?.name).toBeDefined();
        });

        test("should return undefined for valid object", () => {
            const obj: SimpleObject = { name: "John", age: 25 };
            const rule: ValidationRule<SimpleObject> = {
                name: [required(), isString()],
                age: [required(), isNumber()]
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeUndefined();
        });

        test("should return errors for invalid primitive fields", () => {
            const obj: SimpleObject = { name: "", age: 25 };
            const rule: ValidationRule<SimpleObject> = {
                name: [required()],
                age: [required()]
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            expect(result?.name).toHaveLength(1);
            expect(result?.name?.[0].errorMessage).toBe("This field is required.");
            expect(result?.age).toBeUndefined();
        });

        test("should handle nested object validation", () => {
            const obj = {
                user: {
                    name: "",
                    email: "invalid-email"
                }
            };
            const rule: ValidationRule<typeof obj> = {
                user: {
                    name: [required()],
                    email: [required()]
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            expect(result?.user).toBeDefined();
            expect((result?.user as any)?.name).toHaveLength(1);
        });

        test("should handle array validation with arrayRules", () => {
            const obj = {
                tags: []
            };
            const rule: ValidationRule<typeof obj> = {
                tags: {
                    arrayRules: [arrayMinLen(1)]
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            expect(result?.tags).toBeDefined();
            expect((result?.tags as ErrorOfArray<string[]>)?.arrayErrors).toHaveLength(1);
        });

        test("should handle array validation with primitive arrayElementRule", () => {
            const obj = {
                tags: ["", "valid"]
            };
            const rule: ValidationRule<typeof obj> = {
                tags: {
                    arrayElementRule: [required()]
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            expect(result?.tags).toBeDefined();
            const arrayErrors = result?.tags as ErrorOfArray<string[]>;
            expect(arrayErrors?.arrayElementErrors).toHaveLength(1);
            expect(arrayErrors?.arrayElementErrors?.[0].index).toBe(0);
        });

        test("should handle array validation with object arrayElementRule", () => {
            const obj = {
                items: [
                    { id: 1, title: "" },
                    { id: 2, title: "Valid" }
                ]
            };
            const rule: ValidationRule<typeof obj> = {
                items: {
                    arrayElementRule: {
                        id: [required()],
                        title: [required()]
                    }
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            expect(result?.items).toBeDefined();
            const arrayErrors = result?.items as ErrorOfArray<any[]>;
            expect(arrayErrors?.arrayElementErrors).toHaveLength(1);
            expect(arrayErrors?.arrayElementErrors?.[0].index).toBe(0);
        });

        test("should handle function rules (dynamic rules)", () => {
            const obj = {
                tags: ["short", "valid"]
            };
            const rule: ValidationRule<typeof obj> = {
                tags: (value, root) => ({
                    arrayElementRule: [required()]
                })
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeUndefined(); // Should be valid since both elements are not empty
        });

        test("should handle dynamic array element rules for primitives", () => {
            const obj = {
                tags: ["", "valid"]
            };
            const rule: ValidationRule<typeof obj> = {
                tags: {
                    arrayElementRule: (element, root) => [required()]
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            const arrayErrors = result?.tags as ErrorOfArray<string[]>;
            expect(arrayErrors?.arrayElementErrors).toHaveLength(1);
            expect(arrayErrors?.arrayElementErrors?.[0].index).toBe(0);
        });

        test("should handle dynamic array element rules for objects", () => {
            const obj = {
                items: [
                    { id: 0, title: "Item 1" },
                    { id: 2, title: "" }
                ]
            };
            const rule: ValidationRule<typeof obj> = {
                items: {
                    arrayElementRule: (element, root) => ({
                        id: element.id === 0 ? [required()] : [],
                        title: [required()]
                    })
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            const arrayErrors = result?.items as ErrorOfArray<any[]>;
            expect(arrayErrors?.arrayElementErrors).toHaveLength(1);
            expect(arrayErrors?.arrayElementErrors?.[0].index).toBe(1);
        });

        test("should skip null/undefined rules", () => {
            const obj: SimpleObject = { name: "John", age: 25 };
            const rule: ValidationRule<SimpleObject> = {
                name: [required()],
                age: undefined as any
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeUndefined();
        });

        test("should throw error for invalid rule type", () => {
            const obj = { name: "John" };
            const rule = {
                name: "invalid rule type" as any
            };

            expect(() => {
                validateObject(obj, obj, rule);
            }).toThrow("string is not a valid rule.");
        });

        test("should handle complex nested validation", () => {
            const obj: ComplexObject = {
                user: {
                    name: "",
                    email: "test@example.com"
                },
                tags: [],
                items: [
                    { id: 1, title: "" }
                ]
            };

            const rule: ValidationRule<ComplexObject> = {
                user: {
                    name: [required()],
                    email: [required()]
                },
                tags: {
                    arrayRules: [arrayMinLen(1)]
                },
                items: {
                    arrayElementRule: {
                        id: [required()],
                        title: [required()]
                    }
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            expect(result?.user).toBeDefined();
            expect(result?.tags).toBeDefined();
            expect(result?.items).toBeDefined();
        });

        test("should handle empty validation rule", () => {
            const obj = { name: "John", age: 25 };
            const rule = {};

            const result = validateObject(obj, obj, rule);

            expect(result).toBeUndefined();
        });

        test("should validate against validation rule properties only", () => {
            const obj = { name: "John", age: 25, extra: "field" };
            const rule = {
                name: [required()]
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeUndefined();
        });

        test("should handle non-array value with array validation rule", () => {
            const obj = {
                tags: "not an array" as any
            };
            const rule: ValidationRule<{ tags: string[] }> = {
                tags: {
                    arrayRules: [required()],
                    arrayElementRule: [required()]
                }
            };

            const result = validateObject(obj, obj, rule);

            // Since "not an array" is a valid string, it passes the required() check
            // And since it's not an array, arrayElementRule is not executed
            expect(result).toBeUndefined();
        });

        test("should handle non-array value with failing array validation rule", () => {
            const obj = {
                tags: "" as any // Empty string fails required()
            };
            const rule: ValidationRule<{ tags: string[] }> = {
                tags: {
                    arrayRules: [required()],
                    arrayElementRule: [required()]
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            // Should have arrayRules errors but no arrayElementErrors since value is not an array
            const arrayErrors = result?.tags as ErrorOfArray<string[]>;
            expect(arrayErrors?.arrayErrors).toBeDefined();
            expect(arrayErrors?.arrayElementErrors).toBeUndefined();
        });

        test("should handle object property with non-object value", () => {
            const obj = {
                user: "not an object" as any
            };
            const rule = {
                user: {
                    name: [required()]
                }
            };

            const result = validateObject(obj, obj, rule);

            // Since "not an object" doesn't match "typeof value === 'object'"
            // The validation is skipped and no errors are returned
            expect(result).toBeUndefined();
        });

        test("should handle object property with null value", () => {
            const obj = {
                user: null as any
            };
            const rule = {
                user: {
                    name: [required()]
                }
            };

            const result = validateObject(obj, obj, rule);

            // null is typeof "object" but not an object, so validation proceeds
            expect(result).toBeDefined();
            expect(result?.user).toBeDefined();
        });

        test("should handle object property with array value", () => {
            const obj = {
                user: [] as any
            };
            const rule = {
                user: {
                    name: [required()]
                }
            };

            const result = validateObject(obj, obj, rule);

            // Array is typeof "object", so validation proceeds
            expect(result).toBeDefined();
            expect(result?.user).toBeDefined();
        });

        test("should handle validateObject returning no errors for valid nested object", () => {
            const obj = {
                user: {
                    name: "John",
                    age: 25
                }
            };
            const rule = {
                user: {
                    name: [required()],
                    age: [required()]
                }
            };

            const result = validateObject(obj, obj, rule);

            // This should hit the lines where validateObject returns no errors (null/undefined)
            // but isValid is calculated correctly
            expect(result).toBeUndefined();
        });

        test("should handle object property validation with both valid and invalid cases", () => {
            const obj = {
                validUser: {
                    name: "John"
                },
                invalidUser: {
                    name: ""
                }
            };
            const rule = {
                validUser: {
                    name: [required()]
                },
                invalidUser: {
                    name: [required()]
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            expect(result?.validUser).toBeUndefined();
            expect(result?.invalidUser).toBeDefined();
        });
    });

    describe("validatePrimitiveElement edge cases", () => {
        test("should handle null/undefined rules in validatePrimitiveElement", () => {
            const obj = {
                tags: ["test"]
            };
            const rule = {
                tags: {
                    arrayElementRule: [mockValidateFunc(false), null as any, undefined as any]
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeUndefined();
        });

        test("should throw error for non-function rule in validatePrimitiveElement", () => {
            const obj = {
                tags: ["test"]
            };
            const rule = {
                tags: {
                    arrayElementRule: ["not a function" as any]
                }
            };

            expect(() => {
                validateObject(obj, obj, rule);
            }).toThrow("validateFunc is not a function");
        });
    });

    describe("edge cases and error handling", () => {
        test("should handle circular references in objects", () => {
            const obj: any = { name: "John" };
            obj.self = obj; // Circular reference

            const rule = {
                name: [required()]
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeUndefined();
        });

        test("should handle deep nested objects", () => {
            const obj = {
                level1: {
                    level2: {
                        level3: {
                            name: ""
                        }
                    }
                }
            };

            const rule = {
                level1: {
                    level2: {
                        level3: {
                            name: [required()]
                        }
                    }
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            expect(result?.level1).toBeDefined();
        });

        test("should handle array with mixed valid and invalid elements", () => {
            const obj = {
                items: [
                    { id: 1, title: "Valid" },
                    { id: 2, title: "" },
                    { id: 3, title: "Also Valid" },
                    { id: 4, title: "" }
                ]
            };

            const rule = {
                items: {
                    arrayElementRule: {
                        id: [required()],
                        title: [required()]
                    }
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            const arrayErrors = result?.items as ErrorOfArray<any[]>;
            expect(arrayErrors?.arrayElementErrors).toHaveLength(2);
            expect(arrayErrors?.arrayElementErrors?.[0].index).toBe(1);
            expect(arrayErrors?.arrayElementErrors?.[1].index).toBe(3);
        });

        test("should handle empty arrays with element rules", () => {
            const obj = {
                items: []
            };

            const rule = {
                items: {
                    arrayElementRule: {
                        id: [required()]
                    }
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeUndefined();
        });

        test("should handle arrays with null/undefined elements", () => {
            const obj = {
                items: [null, undefined, { id: 1 }]
            };

            const rule = {
                items: {
                    arrayElementRule: {
                        id: [required()]
                    }
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            const arrayErrors = result?.items as ErrorOfArray<any[]>;
            expect(arrayErrors?.arrayElementErrors).toHaveLength(2); // null and undefined elements
        });

        test("should handle validation rule with different root object", () => {
            const obj = { name: "John" };
            const root = { allowedNames: ["John", "Jane"] };

            const customRule: ValidateFunc<string, typeof root> = (value, rootObj) => {
                if (!rootObj.allowedNames.includes(value)) {
                    return createRuleViolation("customRule", value, "Name not allowed");
                }
                return undefined;
            };

            const rule = {
                name: [customRule]
            };

            const result = validateObject(obj, root, rule);

            expect(result).toBeUndefined();
        });

        test("should handle both arrayRules and arrayElementRule failing", () => {
            const obj = {
                tags: []
            };

            const rule = {
                tags: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required()]
                }
            };

            const result = validateObject(obj, obj, rule);

            expect(result).toBeDefined();
            const arrayErrors = result?.tags as ErrorOfArray<string[]>;
            expect(arrayErrors?.arrayErrors).toHaveLength(1);
            expect(arrayErrors?.arrayElementErrors).toBeUndefined(); // Empty array, no elements to validate
        });
    });

    describe("performance and stress tests", () => {
        test("should handle large arrays efficiently", () => {
            const largeArray = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }));
            const obj = { items: largeArray };

            const rule = {
                items: {
                    arrayElementRule: {
                        id: [required()],
                        name: [required()]
                    }
                }
            };

            const start = Date.now();
            const result = validateObject(obj, obj, rule);
            const end = Date.now();

            expect(result).toBeUndefined();
            expect(end - start).toBeLessThan(1000); // Should complete within 1 second
        });

        test("should handle deeply nested objects efficiently", () => {
            let nestedObj: any = { value: "deep" };
            let nestedRule: any = { value: [required()] };

            // Create 50 levels of nesting
            for (let i = 0; i < 50; i++) {
                nestedObj = { nested: nestedObj };
                nestedRule = { nested: nestedRule };
            }

            const start = Date.now();
            const result = validateObject(nestedObj, nestedObj, nestedRule);
            const end = Date.now();

            expect(result).toBeUndefined();
            expect(end - start).toBeLessThan(1000); // Should complete within 1 second
        });
    });
});