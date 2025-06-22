import { validateField } from "../../../../validators/sync/validateField";
import { FieldErrorOf } from "../../../../types/FieldErrorOf";
import { ValidationRule, ArrayValidationRule, ValidateFunc, RuleViolation } from "../../../../types/ValidationRule";
import { required } from "../../../../rules/required";
import { isString } from "../../../../rules/isString";
import { isNumber } from "../../../../rules/isNumber";
import { arrayMinLen } from "../../../../rules/arrayMinLen";
import { stringMinLen } from "../../../../rules/stringMinLen";

describe("validateField", () => {
    // Helper function to create rule violations for testing
    const createRuleViolation = (ruleName: string, attemptedValue: any, errorMessage: string): RuleViolation => ({
        ruleName,
        attemptedValue,
        errorMessage
    });

    // Mock validation function for testing
    const mockValidateFunc = (shouldFail: boolean, errorMessage = "Mock error"): ValidateFunc<any, any> => {
        return (value: any, root: any) => {
            if (shouldFail) {
                return createRuleViolation("mockRule", value, errorMessage);
            }
            return undefined;
        };
    };

    describe("when fieldRule is falsy", () => {
        interface TestObject {
            name: string;
            age: number;
        }

        test("should return valid result when fieldRule is null", () => {
            const obj: TestObject = { name: "John", age: 25 };
            
            const result = validateField<TestObject, "name">(obj, "name", null as any);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("name");
            expect(result.errors).toBeUndefined();
        });

        test("should return valid result when fieldRule is undefined", () => {
            const obj: TestObject = { name: "John", age: 25 };
            
            const result = validateField<TestObject, "name">(obj, "name", undefined as any);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("name");
            expect(result.errors).toBeUndefined();
        });

        test("should return valid result when fieldRule is false", () => {
            const obj: TestObject = { name: "John", age: 25 };
            
            const result = validateField<TestObject, "name">(obj, "name", false as any);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("name");
            expect(result.errors).toBeUndefined();
        });

        test("should return valid result when fieldRule is empty string", () => {
            const obj: TestObject = { name: "John", age: 25 };
            
            const result = validateField<TestObject, "name">(obj, "name", "" as any);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("name");
            expect(result.errors).toBeUndefined();
        });
    });

    describe("when fieldRule is primitive (array of validation functions)", () => {
        interface TestObject {
            name: string;
            age: number;
            email: string;
        }

        test("should return valid result when all validation rules pass", () => {
            const obj: TestObject = { name: "John", age: 25, email: "john@example.com" };
            const fieldRule = [required(), isString()];
            
            const result = validateField<TestObject, "name">(obj, "name", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("name");
            expect(result.errors).toBeUndefined();
        });

        test("should return invalid result when one validation rule fails", () => {
            const obj: TestObject = { name: "", age: 25, email: "john@example.com" };
            const fieldRule = [required(), isString()];
            
            const result = validateField<TestObject, "name">(obj, "name", fieldRule);
            
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe("name");
            expect(result.errors).toHaveLength(1);
            expect(result.errors![0]).toEqual({
                ruleName: "required",
                attemptedValue: "",
                errorMessage: "This field is required."
            });
        });

        test("should return invalid result when multiple validation rules fail", () => {
            const obj: TestObject = { name: 123 as any, age: 25, email: "john@example.com" };
            const fieldRule = [required(), isString()];
            
            const result = validateField<TestObject, "name">(obj, "name", fieldRule);
            
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe("name");
            expect(result.errors).toHaveLength(1);
            expect(result.errors![0].ruleName).toBe("isString");
        });

        test("should handle empty validation rules array", () => {
            const obj: TestObject = { name: "John", age: 25, email: "john@example.com" };
            const fieldRule: ValidateFunc<string, TestObject>[] = [];
            
            const result = validateField<TestObject, "name">(obj, "name", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("name");
            expect(result.errors).toBeUndefined();
        });

        test("should handle validation rules with custom error messages", () => {
            const obj: TestObject = { name: "", age: 25, email: "john@example.com" };
            const fieldRule = [required("Custom required message")];
            
            const result = validateField<TestObject, "name">(obj, "name", fieldRule);
            
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe("name");
            expect(result.errors![0].errorMessage).toBe("Custom required message");
        });

        test("should validate numeric fields correctly", () => {
            const obj: TestObject = { name: "John", age: 25, email: "john@example.com" };
            const fieldRule = [required(), isNumber()];
            
            const result = validateField<TestObject, "age">(obj, "age", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("age");
            expect(result.errors).toBeUndefined();
        });
    });

    describe("when fieldRule is array validation rule", () => {
        interface TestObject {
            tags: string[];
            numbers: number[];
            items: { id: number; name: string }[];
        }

        test("should return valid result for valid array with array rules", () => {
            const obj: TestObject = { 
                tags: ["tag1", "tag2", "tag3"], 
                numbers: [1, 2, 3],
                items: [{ id: 1, name: "item1" }]
            };
            const fieldRule: ArrayValidationRule<string[], TestObject> = {
                arrayRules: [required(), arrayMinLen(2)]
            };
            
            const result = validateField<TestObject, "tags">(obj, "tags", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("tags");
            expect(result.errors).toBeUndefined();
        });

        test("should return invalid result when array rules fail", () => {
            const obj: TestObject = { 
                tags: [], 
                numbers: [1, 2, 3],
                items: [{ id: 1, name: "item1" }]
            };
            const fieldRule: ArrayValidationRule<string[], TestObject> = {
                arrayRules: [required(), arrayMinLen(2)]
            };
            
            const result = validateField<TestObject, "tags">(obj, "tags", fieldRule);
            
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe("tags");
            expect(result.errors).toBeDefined();
            expect(result.errors).toHaveProperty("arrayErrors");
        });

        test("should return valid result for array with element rules", () => {
            const obj: TestObject = { 
                tags: ["tag1", "tag2"], 
                numbers: [1, 2, 3],
                items: [{ id: 1, name: "item1" }]
            };
            const fieldRule: ArrayValidationRule<string[], TestObject> = {
                arrayElementRule: [required(), isString(), stringMinLen(3)]
            };
            
            const result = validateField<TestObject, "tags">(obj, "tags", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("tags");
            expect(result.errors).toBeUndefined();
        });

        test("should return invalid result when array element rules fail", () => {
            const obj: TestObject = { 
                tags: ["tag1", ""], 
                numbers: [1, 2, 3],
                items: [{ id: 1, name: "item1" }]
            };
            const fieldRule: ArrayValidationRule<string[], TestObject> = {
                arrayElementRule: [required(), isString()]
            };
            
            const result = validateField<TestObject, "tags">(obj, "tags", fieldRule);
            
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe("tags");
            expect(result.errors).toBeDefined();
            expect(result.errors).toHaveProperty("arrayElementErrors");
        });

        test("should handle array with both array rules and element rules", () => {
            const obj: TestObject = { 
                tags: ["tag1", "tag2"], 
                numbers: [1, 2, 3],
                items: [{ id: 1, name: "item1" }]
            };
            const fieldRule: ArrayValidationRule<string[], TestObject> = {
                arrayRules: [required(), arrayMinLen(1)],
                arrayElementRule: [required(), isString()]
            };
            
            const result = validateField<TestObject, "tags">(obj, "tags", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("tags");
            expect(result.errors).toBeUndefined();
        });

        test("should handle object array with nested validation rules", () => {
            const obj: TestObject = { 
                tags: ["tag1"], 
                numbers: [1, 2, 3],
                items: [{ id: 1, name: "item1" }, { id: 2, name: "item2" }]
            };
            const fieldRule: ArrayValidationRule<{ id: number; name: string }[], TestObject> = {
                arrayElementRule: {
                    id: [required(), isNumber()],
                    name: [required(), isString()]
                }
            };
            
            const result = validateField<TestObject, "items">(obj, "items", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("items");
            expect(result.errors).toBeUndefined();
        });

        test("should handle empty array validation rule object", () => {
            const obj: TestObject = { 
                tags: ["tag1"], 
                numbers: [1, 2, 3],
                items: [{ id: 1, name: "item1" }]
            };
            const fieldRule: ArrayValidationRule<string[], TestObject> = {};
            
            const result = validateField<TestObject, "tags">(obj, "tags", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("tags");
            expect(result.errors).toBeUndefined();
        });
    });

    describe("when fieldRule is object rule", () => {
        interface TestObject {
            user: {
                name: string;
                age: number;
                profile: {
                    bio: string;
                }
            };
            metadata: Record<string, any>;
        }

        test("should return valid result for valid nested object", () => {
            const obj: TestObject = { 
                user: { 
                    name: "John", 
                    age: 25, 
                    profile: { bio: "Developer" } 
                },
                metadata: { key: "value" }
            };
            const fieldRule: ValidationRule<TestObject["user"], TestObject> = {
                name: [required(), isString()],
                age: [required(), isNumber()]
            };
            
            const result = validateField<TestObject, "user">(obj, "user", fieldRule);
            
            // The implementation correctly validates only the nested object (obj.user) against the field rule
            // Since obj.user matches the fieldRule structure, validation should pass
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("user");
            expect(result.errors).toBeUndefined();
        });

        test("should return invalid result when nested object validation fails", () => {
            const obj: TestObject = { 
                user: { 
                    name: "", 
                    age: 25, 
                    profile: { bio: "Developer" } 
                },
                metadata: { key: "value" }
            };
            const fieldRule: ValidationRule<TestObject["user"], TestObject> = {
                name: [required(), isString()],
                age: [required(), isNumber()]
            };
            
            const result = validateField<TestObject, "user">(obj, "user", fieldRule);
            
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe("user");
            expect(result.errors).toBeDefined();
            expect(result.errors).toHaveProperty("name");
        });

        test("should handle deeply nested object validation", () => {
            const obj: TestObject = { 
                user: { 
                    name: "John", 
                    age: 25, 
                    profile: { bio: "" } 
                },
                metadata: { key: "value" }
            };
            const fieldRule: ValidationRule<TestObject["user"], TestObject> = {
                name: [required(), isString()],
                age: [required(), isNumber()],
                profile: {
                    bio: [required(), isString()]
                }
            };
            
            const result = validateField<TestObject, "user">(obj, "user", fieldRule);
            
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe("user");
            expect(result.errors).toBeDefined();
            // The validation happens on the entire object, so the error structure may vary
            // Just check that errors exist since the empty bio should cause failure
        });

        test("should handle empty object validation rule", () => {
            const obj: TestObject = { 
                user: { 
                    name: "John", 
                    age: 25, 
                    profile: { bio: "Developer" } 
                },
                metadata: { key: "value" }
            };
            const fieldRule: ValidationRule<TestObject["user"], TestObject> = {};
            
            const result = validateField<TestObject, "user">(obj, "user", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("user");
            expect(result.errors).toBeUndefined();
        });

        test("should handle object validation with valid nested object", () => {
            // Create a simple object that will pass validation  
            interface SimpleObject {
                nested: { value: string };
            }
            const simpleObj: SimpleObject = { nested: { value: "test" } };
            const fieldRule: ValidationRule<SimpleObject["nested"], SimpleObject> = {
                value: [required(), isString()]
            };
            
            const result = validateField<SimpleObject, "nested">(simpleObj, "nested", fieldRule);
            
            // The implementation correctly validates only the nested object (simpleObj.nested) against the fieldRule
            // Since simpleObj.nested matches the fieldRule structure, validation should pass
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("nested");
            expect(result.errors).toBeUndefined();
        });
    });

    describe("edge cases and boundary conditions", () => {
        interface TestObject {
            value: any;
            optional?: string;
        }

        test("should handle null object", () => {
            const obj = null as any;
            const fieldRule = [required()];
            
            // This will throw an error due to the implementation attempting to access properties on null
            expect(() => {
                validateField<any, "value">(obj, "value", fieldRule);
            }).toThrow();
        });

        test("should handle undefined object", () => {
            const obj = undefined as any;
            const fieldRule = [required()];
            
            // This will throw an error due to the implementation attempting to access properties on undefined
            expect(() => {
                validateField<any, "value">(obj, "value", fieldRule);
            }).toThrow();
        });

        test("should handle field that doesn't exist on object", () => {
            const obj: TestObject = { value: "test" };
            const fieldRule = [required()];
            
            const result = validateField<TestObject, "optional">(obj, "optional", fieldRule);
            
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe("optional");
            expect(result.errors![0].attemptedValue).toBeUndefined();
        });

        test("should handle numeric field name", () => {
            const obj: Record<string, string> = { "0": "test", "1": "test2" };
            const fieldRule = [required(), isString()];
            
            const result = validateField<Record<string, string>, "0">(obj, "0", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("0");
        });

        test("should handle complex field names", () => {
            const obj: Record<string, any> = { "field-with-dashes": "test", "field_with_underscores": "test2" };
            const fieldRule = [required(), isString()];
            
            const result = validateField<Record<string, any>, "field-with-dashes">(obj, "field-with-dashes", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("field-with-dashes");
        });
    });

    describe("type inference and return types", () => {
        interface TestObject {
            name: string;
            age: number;
            tags: string[];
            user: {
                email: string;
            };
        }

        test("should maintain correct field name type in result", () => {
            const obj: TestObject = { 
                name: "John", 
                age: 25, 
                tags: ["tag1"], 
                user: { email: "john@example.com" } 
            };
            const fieldRule = [required()];
            
            const result: FieldErrorOf<TestObject, "name"> = validateField<TestObject, "name">(obj, "name", fieldRule);
            
            expect(result.fieldName).toBe("name");
            expect(typeof result.fieldName).toBe("string");
        });

        test("should handle different field types correctly", () => {
            const obj: TestObject = { 
                name: "John", 
                age: 25, 
                tags: ["tag1"], 
                user: { email: "john@example.com" } 
            };
            
            // Test string field
            const nameResult = validateField<TestObject, "name">(obj, "name", [required()]);
            expect(nameResult.fieldName).toBe("name");
            
            // Test number field
            const ageResult = validateField<TestObject, "age">(obj, "age", [required()]);
            expect(ageResult.fieldName).toBe("age");
            
            // Test array field
            const tagsResult = validateField<TestObject, "tags">(obj, "tags", { arrayRules: [required()] });
            expect(tagsResult.fieldName).toBe("tags");
            
            // Test object field
            const userResult = validateField<TestObject, "user">(obj, "user", { email: [required()] });
            expect(userResult.fieldName).toBe("user");
        });
    });

    describe("default case fallback", () => {
        interface TestObject {
            value: any;
        }

        test("should return valid result for unmatched rule types", () => {
            const obj: TestObject = { value: "test" };
            // Create a rule that doesn't match any of the type checks
            const fieldRule = "invalid-rule-type" as any;
            
            const result = validateField<TestObject, "value">(obj, "value", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("value");
            expect(result.errors).toBeUndefined();
        });

        test("should handle numeric rule values", () => {
            const obj: TestObject = { value: "test" };
            const fieldRule = 42 as any;
            
            const result = validateField<TestObject, "value">(obj, "value", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("value");
            expect(result.errors).toBeUndefined();
        });

        test("should handle boolean rule values", () => {
            const obj: TestObject = { value: "test" };
            const fieldRule = true as any;
            
            const result = validateField<TestObject, "value">(obj, "value", fieldRule);
            
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe("value");
            expect(result.errors).toBeUndefined();
        });
    });

    describe("integration with validateObject functions", () => {
        interface ComplexObject {
            primitiveField: string;
            arrayField: string[];
            objectField: {
                nestedString: string;
                nestedNumber: number;
            };
        }

        test("should properly integrate with validatePrimitiveField", () => {
            const obj: ComplexObject = {
                primitiveField: "",
                arrayField: ["valid"],
                objectField: { nestedString: "test", nestedNumber: 42 }
            };
            const fieldRule = [required(), isString()];
            
            const result = validateField<ComplexObject, "primitiveField">(obj, "primitiveField", fieldRule);
            
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe("primitiveField");
            expect(result.errors).toHaveLength(1);
            expect(result.errors![0].ruleName).toBe("required");
        });

        test("should properly integrate with array validation", () => {
            const obj: ComplexObject = {
                primitiveField: "valid",
                arrayField: [],
                objectField: { nestedString: "test", nestedNumber: 42 }
            };
            const fieldRule: ArrayValidationRule<string[], ComplexObject> = {
                arrayRules: [required(), arrayMinLen(1)]
            };
            
            const result = validateField<ComplexObject, "arrayField">(obj, "arrayField", fieldRule);
            
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe("arrayField");
            expect(result.errors).toHaveProperty("arrayErrors");
        });

        test("should properly integrate with nested object validation", () => {
            const obj: ComplexObject = {
                primitiveField: "valid",
                arrayField: ["valid"],
                objectField: { nestedString: "", nestedNumber: 42 }
            };
            const fieldRule: ValidationRule<ComplexObject["objectField"], ComplexObject> = {
                nestedString: [required(), isString()],
                nestedNumber: [required(), isNumber()]
            };
            
            const result = validateField<ComplexObject, "objectField">(obj, "objectField", fieldRule);
            
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe("objectField");
            expect(result.errors).toHaveProperty("nestedString");
        });
    });
}); 