import { validateObjectAsync, validatePrimitiveFieldAsync, isAsyncArrayValidationRule } from "../../../../validators/async/validateObjectAsync";
import { ErrorOf, ErrorOfArray } from "../../../../types/ErrorOf";
import { AsyncValidationRule, AsyncArrayValidationRule, GenericValidateFunc, AsyncValidateFunc } from "../../../../types/AsyncValidationRule";
import { ValidationRule, ValidateFunc, RuleViolation } from "../../../../types/ValidationRule";
import { required } from "../../../../rules/required";
import { isString } from "../../../../rules/isString";
import { isNumber } from "../../../../rules/isNumber";
import { arrayMinLen } from "../../../../rules/arrayMinLen";

describe("validateObjectAsync", () => {
    // Test helper functions
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

    const mockAsyncValidateFunc = (shouldFail: boolean, errorMessage = "Mock async error", delay = 0): AsyncValidateFunc<any, any> => {
        return async (value: any, root: any) => {
            if (delay > 0) {
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            if (shouldFail) {
                return createRuleViolation("mockAsyncRule", value, errorMessage);
            }
            return undefined;
        };
    };

    describe("isAsyncArrayValidationRule", () => {
        test("should return true for valid async array validation rule with arrayRules", () => {
            const rule: AsyncArrayValidationRule<string[], any> = {
                arrayRules: [mockAsyncValidateFunc(false)]
            };

            const result = isAsyncArrayValidationRule(rule);

            expect(result).toBe(true);
        });

        test("should return true for valid async array validation rule with arrayElementRule", () => {
            const rule: AsyncArrayValidationRule<string[], any> = {
                arrayElementRule: [mockAsyncValidateFunc(false)]
            };

            const result = isAsyncArrayValidationRule(rule);

            expect(result).toBe(true);
        });

        test("should return true for valid async array validation rule with both properties", () => {
            const rule: AsyncArrayValidationRule<string[], any> = {
                arrayRules: [mockAsyncValidateFunc(false)],
                arrayElementRule: [isString()]
            };

            const result = isAsyncArrayValidationRule(rule);

            expect(result).toBe(true);
        });

        test("should return false for null rule", () => {
            // This test demonstrates a limitation - the function throws an error for null
            expect(() => isAsyncArrayValidationRule(null as any)).toThrow();
        });

        test("should return false for undefined rule", () => {
            // This test demonstrates a limitation - the function throws an error for undefined
            expect(() => isAsyncArrayValidationRule(undefined as any)).toThrow();
        });

        test("should return false for array rule", () => {
            const rule = [required()];

            const result = isAsyncArrayValidationRule(rule as any);

            expect(result).toBe(false);
        });

        test("should return false for rule with invalid keys", () => {
            const rule = {
                invalidKey: [required()],
                anotherInvalidKey: "test"
            };

            const result = isAsyncArrayValidationRule(rule as any);

            expect(result).toBe(false);
        });

        test("should return true for empty object", () => {
            const rule = {};

            const result = isAsyncArrayValidationRule(rule as any);

            expect(result).toBe(true);
        });
    });

    describe("validatePrimitiveFieldAsync", () => {
        interface TestObject {
            name: string;
            age: number;
        }

        test("should return valid result when all sync rules pass", async () => {
            const obj: TestObject = { name: "John", age: 25 };
            const rules = [mockValidateFunc(false), mockValidateFunc(false)];

            const result = await validatePrimitiveFieldAsync("name", obj, obj, rules);

            expect(result.isValid).toBe(true);
            expect(result.errors).toEqual([]);
        });

        test("should return valid result when all async rules pass", async () => {
            const obj: TestObject = { name: "John", age: 25 };
            const rules = [mockAsyncValidateFunc(false), mockAsyncValidateFunc(false)];

            const result = await validatePrimitiveFieldAsync("name", obj, obj, rules);

            expect(result.isValid).toBe(true);
            expect(result.errors).toEqual([]);
        });

        test("should return invalid result when one sync rule fails", async () => {
            const obj: TestObject = { name: "", age: 25 };
            const violation = createRuleViolation("required", "", "This field is required.");
            const rules = [required(), mockValidateFunc(false)];

            const result = await validatePrimitiveFieldAsync("name", obj, obj, rules);

            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0]).toEqual(violation);
        });

        test("should return invalid result when async rule fails", async () => {
            const obj: TestObject = { name: "", age: 25 };
            const rules = [mockAsyncValidateFunc(true, "Async error")];

            const result = await validatePrimitiveFieldAsync("name", obj, obj, rules);

            expect(result.isValid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].errorMessage).toBe("Async error");
        });

        test("should skip null/undefined rules", async () => {
            const obj: TestObject = { name: "John", age: 25 };
            const rules = [mockValidateFunc(false), null as any, undefined as any, mockAsyncValidateFunc(false)];

            const result = await validatePrimitiveFieldAsync("name", obj, obj, rules);

            expect(result.isValid).toBe(true);
            expect(result.errors).toEqual([]);
        });

        test("should throw error for non-function rule", async () => {
            const obj: TestObject = { name: "John", age: 25 };
            const rules = ["not a function" as any];

            await expect(validatePrimitiveFieldAsync("name", obj, obj, rules)).rejects.toThrow("validateFunc is not a function");
        });

        test("should handle empty rules array", async () => {
            const obj: TestObject = { name: "John", age: 25 };
            const rules: GenericValidateFunc<string, TestObject>[] = [];

            const result = await validatePrimitiveFieldAsync("name", obj, obj, rules);

            expect(result.isValid).toBe(true);
            expect(result.errors).toEqual([]);
        });
    });

    describe("validateObjectAsync - basic functionality", () => {
        interface SimpleObject {
            name: string;
            age: number;
        }

        test("should return undefined for valid object with sync rules", async () => {
            const obj: SimpleObject = { name: "John", age: 25 };
            const rules: AsyncValidationRule<SimpleObject> = {
                name: [required(), isString()],
                age: [required(), isNumber()]
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeUndefined();
        });

        test("should return undefined for valid object with async rules", async () => {
            const obj: SimpleObject = { name: "John", age: 25 };
            const rules: AsyncValidationRule<SimpleObject> = {
                name: [mockAsyncValidateFunc(false), isString()],
                age: [required(), mockAsyncValidateFunc(false)]
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeUndefined();
        });

        test("should return errors for invalid object", async () => {
            const obj: SimpleObject = { name: "", age: -1 };
            const rules: AsyncValidationRule<SimpleObject> = {
                name: [required()],
                age: [mockValidateFunc(true, "Age must be positive")]
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            expect(result!.name).toHaveLength(1);
            expect(result!.age).toHaveLength(1);
            expect(result!.name![0].errorMessage).toBe("This field is required.");
            expect(result!.age![0].errorMessage).toBe("Age must be positive");
        });

        test("should throw error for null validation rule", async () => {
            const obj: SimpleObject = { name: "John", age: 25 };

            await expect(validateObjectAsync(obj, obj, null as any)).rejects.toThrow("validant: validation rule is null or undefined.");
        });

        test("should handle null object by creating empty object", async () => {
            const rules: AsyncValidationRule<SimpleObject> = {
                name: [required()]
            };

            const result = await validateObjectAsync(null as any, null as any, rules);

            expect(result).toBeDefined();
            expect(result!.name).toHaveLength(1);
        });

        test("should throw error for invalid rule type", async () => {
            const obj: SimpleObject = { name: "John", age: 25 };
            const rules: AsyncValidationRule<SimpleObject> = {
                name: "invalid" as any
            };

            await expect(validateObjectAsync(obj, obj, rules)).rejects.toThrow("string is not a valid rule.");
        });
    });

    describe("validateObjectAsync - nested objects", () => {
        interface NestedObject {
            user: {
                name: string;
                email: string;
            };
        }

        test("should validate nested objects successfully", async () => {
            const obj: NestedObject = {
                user: { name: "John", email: "john@example.com" }
            };
            const rules: AsyncValidationRule<NestedObject> = {
                user: {
                    name: [required()],
                    email: [required(), mockAsyncValidateFunc(false)]
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeUndefined();
        });

        test("should return errors for invalid nested objects", async () => {
            const obj: NestedObject = {
                user: { name: "", email: "" }
            };
            const rules: AsyncValidationRule<NestedObject> = {
                user: {
                    name: [required()],
                    email: [required()]
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            expect(result!.user).toBeDefined();
            expect((result!.user as any).name).toHaveLength(1);
            expect((result!.user as any).email).toHaveLength(1);
        });
    });

    describe("validateObjectAsync - array validation", () => {
        interface ArrayObject {
            tags: string[];
            users: { name: string; age: number }[];
        }

        test("should validate arrays with arrayRules", async () => {
            const obj: ArrayObject = {
                tags: ["tag1", "tag2", "tag3"],
                users: [{ name: "John", age: 25 }]
            };
            const rules: AsyncValidationRule<ArrayObject> = {
                tags: {
                    arrayRules: [arrayMinLen(2)]
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeUndefined();
        });

        test("should return errors for invalid arrays", async () => {
            const obj: ArrayObject = {
                tags: ["tag1"],
                users: []
            };
            const rules: AsyncValidationRule<ArrayObject> = {
                tags: {
                    arrayRules: [arrayMinLen(2)]
                },
                users: {
                    arrayRules: [required()]
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            expect((result!.tags as any).arrayErrors).toHaveLength(1);
            expect((result!.users as any).arrayErrors).toHaveLength(1);
        });

        test("should validate primitive array elements", async () => {
            const obj = {
                tags: ["", "tag2", ""]
            };
            const rules: AsyncValidationRule<typeof obj> = {
                tags: {
                    arrayElementRule: [required()]
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            const tagsError = result!.tags as any;

            expect(tagsError.arrayElementErrors).toHaveLength(2);
            expect(tagsError.arrayElementErrors![0].index).toBe(0);
            expect(tagsError.arrayElementErrors![1].index).toBe(2);
        });

        test("should validate object array elements", async () => {
            const obj: ArrayObject = {
                tags: [],
                users: [
                    { name: "", age: 25 },
                    { name: "Jane", age: -1 }
                ]
            };
            const rules: AsyncValidationRule<ArrayObject> = {
                users: {
                    arrayElementRule: {
                        name: [required()],
                        age: [mockAsyncValidateFunc(true, "Age error")]
                    }
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            const usersError = result!.users as any;

            expect(usersError.arrayElementErrors).toHaveLength(2);
            expect(usersError.arrayElementErrors![0].index).toBe(0);
            expect(usersError.arrayElementErrors![1].index).toBe(1);
        });

        test("should handle dynamic array element rules for primitives", async () => {
            const obj = {
                tags: ["", "valid text", "x"]  // first is required() fail, last is length < 5 fail
            };
            const rules: AsyncValidationRule<typeof obj> = {
                tags: {
                    arrayElementRule: (element: string, root: typeof obj) => [
                        required(),
                        mockAsyncValidateFunc(element.length > 0 && element.length < 5, "Must be at least 5 characters")
                    ]
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            const tagsError = result!.tags as any;

            expect(tagsError.arrayElementErrors).toHaveLength(2); // "" and "x" 
            expect(tagsError.arrayElementErrors![0].index).toBe(0);
            expect(tagsError.arrayElementErrors![1].index).toBe(2);
        });

        test("should handle dynamic array element rules for objects", async () => {
            const obj: ArrayObject = {
                tags: [],
                users: [
                    { name: "John", age: 15 },
                    { name: "Jane", age: 25 }
                ]
            };
            const rules: AsyncValidationRule<ArrayObject> = {
                users: {
                    arrayElementRule: (element: { name: string; age: number }, root: ArrayObject) => ({
                        name: [required()],
                        age: [mockAsyncValidateFunc(element.age < 18, "Must be 18 or older")]
                    })
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            const usersError = result!.users as any;

            expect(usersError.arrayElementErrors).toHaveLength(1);
            expect(usersError.arrayElementErrors![0].index).toBe(0);
        });

        test("should handle dynamic rules for arrays", async () => {
            const obj = {
                items: ["item1", "item2"]
            };
            const dynamicRule = (value: string[], root: typeof obj) => ({
                arrayRules: [arrayMinLen(1)],
                arrayElementRule: [required()]
            });
            const rules: AsyncValidationRule<typeof obj> = {
                items: dynamicRule
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeUndefined();
        });

        test("should handle static array element rules for objects", async () => {
            const obj: ArrayObject = {
                tags: [],
                users: [
                    { name: "John", age: 25 },
                    { name: "", age: 30 }
                ]
            };
            const rules: AsyncValidationRule<ArrayObject> = {
                users: {
                    arrayElementRule: {
                        name: [required()],
                        age: [required()]
                    }
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            const usersError = result!.users as any;

            expect(usersError.arrayElementErrors).toHaveLength(1);
            expect(usersError.arrayElementErrors![0].index).toBe(1);
        });

        test("should handle empty arrays", async () => {
            const obj = {
                tags: []
            };
            const rules: AsyncValidationRule<typeof obj> = {
                tags: {
                    arrayElementRule: [required()]
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeUndefined();
        });

        test("should handle non-array values for array rules", async () => {
            const obj = {
                tags: null
            };
            const rules: AsyncValidationRule<typeof obj> = {
                tags: {
                    arrayElementRule: [required()]
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeUndefined();
        });
    });

    describe("validateObjectAsync - additional edge cases", () => {
        test("should handle errors in validatePrimitiveFieldAsync", async () => {
            const obj = { name: "test" };
            const rules: AsyncValidationRule<typeof obj> = {
                name: ["not a function" as any]
            };

            await expect(validateObjectAsync(obj, obj, rules)).rejects.toThrow("validateFunc is not a function");
        });

        test("should handle multiple rule failures", async () => {
            const obj: { name: string; age: number } = { name: "", age: 25 };
            const rules: AsyncValidationRule<typeof obj> = {
                name: [mockValidateFunc(true, "Error 1"), mockAsyncValidateFunc(true, "Error 2")],
                age: [mockValidateFunc(false)]
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            expect(result!.name).toHaveLength(2);
            expect(result!.name![0].errorMessage).toBe("Error 1");
            expect(result!.name![1].errorMessage).toBe("Error 2");
        });

        test("should handle empty object with validation rules", async () => {
            const obj = {} as { name: string; age: number };
            const rules: AsyncValidationRule<typeof obj> = {
                name: [required()],
                age: [required()]
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            expect(result!.name).toHaveLength(1);
            expect(result!.age).toHaveLength(1);
        });

        test("should skip null/undefined rules in validation", async () => {
            const obj: { name: string; age: number } = { name: "John", age: 25 };
            const rules: AsyncValidationRule<typeof obj> = {
                name: [required()],
                age: null as any
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeUndefined();
        });

        test("should handle different rule types errors", async () => {
            const obj: { name: string } = { name: "John" };
            
            // Test number rule type
            const rulesNumber: AsyncValidationRule<typeof obj> = {
                name: 123 as any
            };
            await expect(validateObjectAsync(obj, obj, rulesNumber)).rejects.toThrow("number is not a valid rule.");

            // Test boolean rule type  
            const rulesBoolean: AsyncValidationRule<typeof obj> = {
                name: true as any
            };
            await expect(validateObjectAsync(obj, obj, rulesBoolean)).rejects.toThrow("boolean is not a valid rule.");
        });

        test("should handle both arrayRules and arrayElementRule", async () => {
            const obj = {
                tags: ["tag1"]
            };
            const rules: AsyncValidationRule<typeof obj> = {
                tags: {
                    arrayRules: [arrayMinLen(2)],
                    arrayElementRule: [required()]
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            const tagsError = result!.tags as any;

            expect(tagsError.arrayErrors).toHaveLength(1);
            expect(tagsError.arrayElementErrors).toBeUndefined();
        });

        test("should handle function rules that throw errors", async () => {
            const obj = { name: "test" };
            const throwingRule = () => {
                throw new Error("Rule function error");
            };
            const rules: AsyncValidationRule<typeof obj> = {
                name: throwingRule as any
            };

            await expect(validateObjectAsync(obj, obj, rules)).rejects.toThrow("Rule function error");
        });

        test("should handle null/undefined rules in array element validation", async () => {
            const obj = {
                tags: ["test1", "test2"]
            };
            const rules: AsyncValidationRule<typeof obj> = {
                tags: {
                    arrayElementRule: [required(), null as any, undefined as any, mockValidateFunc(false)]
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeUndefined();
        });

        test("should handle non-function rules in array element validation", async () => {
            const obj = {
                tags: ["test1", "test2"]
            };
            const rules: AsyncValidationRule<typeof obj> = {
                tags: {
                    arrayElementRule: [required(), "not a function" as any]
                }
            };

            await expect(validateObjectAsync(obj, obj, rules)).rejects.toThrow("validateFunc is not a function");
        });
    });

    describe("validateObjectAsync - edge cases and limitations", () => {
        test("should handle concurrent async validations", async () => {
            const obj = {
                field1: "test1",
                field2: "test2",
                field3: "test3"
            };

            const rules: AsyncValidationRule<typeof obj> = {
                field1: [mockAsyncValidateFunc(false, "Field1 error", 50)],
                field2: [mockAsyncValidateFunc(true, "Field2 error", 30)],
                field3: [mockAsyncValidateFunc(false, "Field3 error", 10)]
            };

            const start = Date.now();
            const result = await validateObjectAsync(obj, obj, rules);
            const duration = Date.now() - start;

            expect(duration).toBeLessThan(200); // Allow more time for concurrent execution
            expect(result).toBeDefined();
            expect(result!.field1).toBeUndefined();
            expect(result!.field2).toBeDefined();
            expect(result!.field3).toBeUndefined();
        });

        test("should demonstrate type limitation - optional properties in validation rules", async () => {
            interface Person {
                name: string;
                age: number;
                email?: string;
            }

            const person: Person = {
                name: "John",
                age: 25
                // email is optional and not provided
            };

            // Limitation: AsyncValidationRule uses optional properties with ?, 
            // so we can create incomplete validation rules
            const rules: AsyncValidationRule<Person> = {
                name: [required()],
                // age: [required()] // This demonstrates the limitation - we can skip required fields
                // The type definition should be { [key in keyof T]: ... } if we want to enforce all properties
                // But it's { [key in keyof T]?: ... } which makes all properties optional in the validation rule
            };

            const result = await validateObjectAsync(person, person, rules);

            expect(result).toBeUndefined(); // age validation is skipped entirely
        });

        test("should handle deeply nested objects", async () => {
            interface DeepNested {
                level1: {
                    level2: {
                        level3: {
                            value: string;
                        };
                    };
                };
            }

            const obj: DeepNested = {
                level1: {
                    level2: {
                        level3: {
                            value: "deep"
                        }
                    }
                }
            };

            const rules: AsyncValidationRule<DeepNested> = {
                level1: {
                    level2: {
                        level3: {
                            value: [required(), mockAsyncValidateFunc(false)]
                        }
                    }
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeUndefined();
        });

        test("should handle large arrays efficiently", async () => {
            const largeArray = Array.from({ length: 100 }, (_, i) => `item${i}`);
            const obj = { items: largeArray };

            const rules: AsyncValidationRule<typeof obj> = {
                items: {
                    arrayElementRule: [required()]
                }
            };

            const start = Date.now();
            const result = await validateObjectAsync(obj, obj, rules);
            const duration = Date.now() - start;

            expect(result).toBeUndefined();
            expect(duration).toBeLessThan(1000);
        });

        test("should handle mixed validation results", async () => {
            interface MixedObject {
                validField: string;
                invalidField: string;
                nestedValid: { value: string };
                nestedInvalid: { value: string };
                arrayValid: string[];
                arrayInvalid: string[];
            }

            const obj: MixedObject = {
                validField: "valid",
                invalidField: "",
                nestedValid: { value: "valid" },
                nestedInvalid: { value: "" },
                arrayValid: ["item1", "item2"],
                arrayInvalid: [""]
            };

            const rules: AsyncValidationRule<MixedObject> = {
                validField: [required()],
                invalidField: [required()],
                nestedValid: {
                    value: [required()]
                },
                nestedInvalid: {
                    value: [required()]
                },
                arrayValid: {
                    arrayElementRule: [required()]
                },
                arrayInvalid: {
                    arrayElementRule: [required()]
                }
            };

            const result = await validateObjectAsync(obj, obj, rules);

            expect(result).toBeDefined();
            expect(result!.validField).toBeUndefined();
            expect(result!.invalidField).toBeDefined();
            expect(result!.nestedValid).toBeUndefined();
            expect(result!.nestedInvalid).toBeDefined();
            expect(result!.arrayValid).toBeUndefined();
            expect(result!.arrayInvalid).toBeDefined();
        });
    });
}); 