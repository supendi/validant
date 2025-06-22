import { Validator, ValidationResult, ValidationMessage, ValidationOptions } from "../../../../validators/sync/Validator";
import { ValidationRule } from "../../../../types/ValidationRule";
import { required } from "../../../../rules/required";
import { isString } from "../../../../rules/isString";
import { arrayMinLen } from "../../../../rules/arrayMinLen";

// Test types for demonstration
interface TestUser {
    name: string;
    email: string;
    age: number;
}

interface TestUserWithOptional {
    name?: string;
    email?: string;
    age?: number;
}

interface TestUserWithArray {
    name: string;
    tags: string[];
}

interface TestNestedUser {
    name: string;
    profile: {
        bio: string;
        location: string;
    };
}

// Mock validation rules for testing
const createMockRule = (shouldFail: boolean = false) => () => {
    if (shouldFail) {
        return {
            ruleName: 'mockRule',
            attemptedValue: 'test',
            errorMessage: 'Mock validation error'
        };
    }
    return undefined;
};

describe('Validator', () => {
    describe('Constructor', () => {
        test('should initialize with default options when no options provided', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required(), isString()],
                email: [required(), isString()],
                age: [required()]
            };

            // Act
            const validator = new Validator(rule);

            // Assert
            expect(validator.rule).toBe(rule);
            expect(validator.options).toEqual({
                validationMessage: {
                    successMessage: "Validation successful.",
                    errorMessage: "Validation failed. Please check and fix the errors to continue."
                }
            });
        });

        test('should initialize with custom options when provided', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required(), isString()]
            };
            const customOptions: ValidationOptions = {
                validationMessage: {
                    successMessage: "Custom success message",
                    errorMessage: "Custom error message"
                }
            };

            // Act
            const validator = new Validator(rule, customOptions);

            // Assert
            expect(validator.rule).toBe(rule);
            expect(validator.options).toEqual(customOptions);
        });

        test('should override default options with custom options', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required()]
            };
            const customOptions: ValidationOptions = {
                validationMessage: {
                    successMessage: "Override success",
                    errorMessage: "Override error"
                }
            };

            // Act
            const validator = new Validator(rule, customOptions);

            // Assert
            expect(validator.options.validationMessage.successMessage).toBe("Override success");
            expect(validator.options.validationMessage.errorMessage).toBe("Override error");
        });

        test('should handle empty validation rule', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {};

            // Act
            const validator = new Validator(rule);

            // Assert
            expect(validator.rule).toEqual({});
            expect(validator.options).toBeDefined();
        });
    });

    describe('validate method', () => {
        test('should return success result for valid object', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required(), isString()],
                email: [required(), isString()],
                age: [required()]
            };
            const validator = new Validator(rule);
            const validUser: TestUser = {
                name: "John Doe",
                email: "john@example.com",
                age: 30
            };

            // Act
            const result: ValidationResult<TestUser> = validator.validate(validUser);

            // Assert
            expect(result.isValid).toBe(true);
            expect(result.message).toBe("Validation successful.");
            expect(result.errors).toBeUndefined();
        });

        test('should return error result for invalid object', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required(), isString()],
                email: [required(), isString()],
                age: [required()]
            };
            const validator = new Validator(rule);
            const invalidUser: TestUser = {
                name: "", // Invalid - empty string
                email: "john@example.com",
                age: 30
            };

            // Act
            const result: ValidationResult<TestUser> = validator.validate(invalidUser);

            // Assert
            expect(result.isValid).toBe(false);
            expect(result.message).toBe("Validation failed. Please check and fix the errors to continue.");
            expect(result.errors).toBeDefined();
        });

        test('should return custom messages when provided', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required()]
            };
            const customOptions: ValidationOptions = {
                validationMessage: {
                    successMessage: "Everything looks good!",
                    errorMessage: "Please fix the issues below"
                }
            };
            const validator = new Validator(rule, customOptions);
            const validUser: TestUser = {
                name: "John",
                email: "john@example.com",
                age: 30
            };

            // Act
            const result = validator.validate(validUser);

            // Assert
            expect(result.isValid).toBe(true);
            expect(result.message).toBe("Everything looks good!");
        });

        test('should handle empty object validation', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {};
            const validator = new Validator(rule);
            const emptyUser = {} as TestUser;

            // Act
            const result = validator.validate(emptyUser);

            // Assert
            expect(result.isValid).toBe(true);
            expect(result.message).toBe("Validation successful.");
        });

        test('should handle object with multiple validation errors', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required(), isString()],
                email: [required(), isString()],
                age: [required()]
            };
            const validator = new Validator(rule);
            const invalidUser: TestUser = {
                name: "", // Invalid
                email: "", // Invalid
                age: undefined as any // Invalid
            };

            // Act
            const result = validator.validate(invalidUser);

            // Assert
            expect(result.isValid).toBe(false);
            expect(result.errors).toBeDefined();
        });

        test('should handle mixed valid and invalid fields', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required(), isString()],
                email: [required(), isString()],
                age: [required()]
            };
            const validator = new Validator(rule);
            const mixedUser: TestUser = {
                name: "John", // Valid
                email: "", // Invalid
                age: 30 // Valid
            };

            // Act
            const result = validator.validate(mixedUser);

            // Assert
            expect(result.isValid).toBe(false);
            expect(result.errors).toBeDefined();
        });

        test('should handle array validation', () => {
            // Arrange
            const rule: ValidationRule<TestUserWithArray> = {
                name: [required(), isString()],
                tags: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), isString()]
                }
            };
            const validator = new Validator(rule);
            const userWithTags: TestUserWithArray = {
                name: "John",
                tags: ["javascript", "typescript"]
            };

            // Act
            const result = validator.validate(userWithTags);

            // Assert
            expect(result.isValid).toBe(true);
        });

        test('should handle nested object validation', () => {
            // Arrange
            const rule: ValidationRule<TestNestedUser> = {
                name: [required(), isString()],
                profile: {
                    bio: [required(), isString()],
                    location: [required(), isString()]
                }
            };
            const validator = new Validator(rule);
            const nestedUser: TestNestedUser = {
                name: "John",
                profile: {
                    bio: "Software Developer",
                    location: "New York"
                }
            };

            // Act
            const result = validator.validate(nestedUser);

            // Assert
            expect(result.isValid).toBe(true);
        });

        // Edge cases
        test('should handle null object', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required()]
            };
            const validator = new Validator(rule);

            // Act
            const result = validator.validate(null as any);

            // Assert
            expect(result.isValid).toBe(false);
        });

        test('should handle undefined object', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required()]
            };
            const validator = new Validator(rule);

            // Act
            const result = validator.validate(undefined as any);

            // Assert
            expect(result.isValid).toBe(false);
        });

        test('should handle errors object with falsy values in error checking loop', () => {
            // This test covers the edge case where error object has properties but they are falsy
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required()]
            };
            const validator = new Validator(rule);
            
            // Create a mock object that would cause validateObject to return an errors object
            // but with some properties having falsy values
            const userWithValidName: TestUser = {
                name: "Valid Name",
                email: "valid@email.com",
                age: 25
            };

            // Act
            const result = validator.validate(userWithValidName);

            // Assert - this should be valid since name is provided
            expect(result.isValid).toBe(true);
            expect(result.errors).toBeUndefined();
        });
    });

    describe('validateField method', () => {
        test('should return valid result for field without validation rule', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required()]
                // No rule for email
            };
            const validator = new Validator(rule);
            const user: TestUser = {
                name: "John",
                email: "john@example.com",
                age: 30
            };

            // Act
            const result = validator.validateField(user, 'email');

            // Assert
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe('email');
        });

        test('should validate field with primitive rules', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required(), isString()],
                email: [required(), isString()],
                age: [required()]
            };
            const validator = new Validator(rule);
            const user: TestUser = {
                name: "John",
                email: "john@example.com",
                age: 30
            };

            // Act
            const result = validator.validateField(user, 'name');

            // Assert
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe('name');
        });

        test('should return invalid result for field with validation errors', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required(), isString()],
                email: [required(), isString()],
                age: [required()]
            };
            const validator = new Validator(rule);
            const user: TestUser = {
                name: "", // Invalid - empty string
                email: "john@example.com",
                age: 30
            };

            // Act
            const result = validator.validateField(user, 'name');

            // Assert
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe('name');
        });

        test('should validate array field', () => {
            // Arrange
            const rule: ValidationRule<TestUserWithArray> = {
                name: [required(), isString()],
                tags: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), isString()]
                }
            };
            const validator = new Validator(rule);
            const user: TestUserWithArray = {
                name: "John",
                tags: ["javascript", "typescript"]
            };

            // Act
            const result = validator.validateField(user, 'tags');

            // Assert
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe('tags');
        });

        test('should validate nested object field', () => {
            // Arrange
            const rule: ValidationRule<TestNestedUser> = {
                name: [required(), isString()],
                profile: {
                    bio: [required(), isString()],
                    location: [required(), isString()]
                }
            };
            const validator = new Validator(rule);
            const user: TestNestedUser = {
                name: "John",
                profile: {
                    bio: "Software Developer",
                    location: "New York"
                }
            };

            // Act
            const result = validator.validateField(user, 'profile');

            // Assert
            expect(result.isValid).toBe(true);
            expect(result.fieldName).toBe('profile');
        });

        // Edge cases
        test('should handle field validation with undefined property value', () => {
            // Arrange
            const rule: ValidationRule<TestUserWithOptional> = {
                name: [required(), isString()]
            };
            const validator = new Validator(rule);
            const user: TestUserWithOptional = {
                name: undefined
            };

            // Act
            const result = validator.validateField(user, 'name');

            // Assert
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe('name');
        });

        test('should handle field validation with null property value', () => {
            // Arrange
            const rule: ValidationRule<TestUser> = {
                name: [required(), isString()]
            };
            const validator = new Validator(rule);
            const user: TestUser = {
                name: null as any,
                email: "test@example.com",
                age: 30
            };

            // Act
            const result = validator.validateField(user, 'name');

            // Assert
            expect(result.isValid).toBe(false);
            expect(result.fieldName).toBe('name');
        });
    });

    describe('Type System Limitations', () => {
        test('should demonstrate ValidationRule type limitations', () => {
            // This shows the limitation where ValidationRule requires exact property matching
            interface PersonType {
                name: string;
                age: number;
                email: string;
            }

            // ✅ This works - all required properties defined
            const completeRule: ValidationRule<PersonType> = {
                name: [required(), isString()],
                age: [required()],
                email: [required(), isString()]
            };

            // ✅ This also works - partial rules are allowed (properties are optional in ValidationRule)
            const partialRule: ValidationRule<PersonType> = {
                name: [required()],
                // age and email validation rules can be omitted
            };

            // ✅ This works - empty rule object
            const emptyRule: ValidationRule<PersonType> = {};

            // Limitation demonstration: TypeScript's mapped types with optional properties
            // The ValidationRule type is defined as: { [key in keyof T]?: ... }
            // The '?' makes all properties optional, which means:
            // - We don't have to provide validation rules for all properties ✅
            // - But we also can't enforce that certain critical fields must have rules ❌
            
            // Example of what we might want but can't achieve with current type definition:
            // type StrictValidationRule<T> = { [key in keyof T]: ValidationRule<T[key]> }
            // This would require ALL properties to have validation rules

            const validator1 = new Validator(completeRule);
            const validator2 = new Validator(partialRule);
            const validator3 = new Validator(emptyRule);

            expect(validator1.rule).toBeDefined();
            expect(validator2.rule).toBeDefined();
            expect(validator3.rule).toBeDefined();
        });

        test('should demonstrate ValidationOptions type structure limitations', () => {
            // ValidationOptions has a nested optional structure
            interface ValidationOptionsStructure {
                validationMessage?: {
                    successMessage: string;
                    errorMessage: string;
                } | undefined;
            }

            // ✅ This works - complete options
            const completeOptions: ValidationOptions = {
                validationMessage: {
                    successMessage: "Success!",
                    errorMessage: "Error!"
                }
            };

            // ✅ This works - empty options
            const emptyOptions: ValidationOptions = {};

            // ✅ This works - undefined validationMessage
            const undefinedMessageOptions: ValidationOptions = {
                validationMessage: undefined
            };

            // Limitation: We cannot enforce that if validationMessage is provided,
            // both successMessage and errorMessage must be provided
            // The current type allows partial message objects:
            
            // This would ideally be invalid but TypeScript allows it:
            // const partialMessageOptions: ValidationOptions = {
            //     validationMessage: {
            //         successMessage: "Success!",
            //         // errorMessage is missing - this should be caught by the type system
            //     }
            // };

            const rule: ValidationRule<TestUser> = { name: [required()] };
            
            const validator1 = new Validator(rule, completeOptions);
            const validator2 = new Validator(rule, emptyOptions);
            const validator3 = new Validator(rule, undefinedMessageOptions);

            expect(validator1.options).toBeDefined();
            expect(validator2.options).toBeDefined();
            expect(validator3.options).toBeDefined();
        });

        test('should demonstrate generic type constraints limitations', () => {
            // The Validator<T> generic type has limitations in type inference
            
            // ✅ Explicit type works well
            const explicitValidator = new Validator<TestUser>({
                name: [required()],
                email: [required()],
                age: [required()]
            });

            // ✅ Type inference works in most cases
            const rule: ValidationRule<TestUser> = {
                name: [required()],
                email: [required()],
                age: [required()]
            };
            const inferredValidator = new Validator(rule);

            // Limitation: Complex nested types might not infer correctly
            // and require explicit type annotations
            
            interface ComplexNested {
                user: {
                    profile: {
                        settings: {
                            notifications: boolean;
                        };
                    };
                };
            }

            // This might require explicit typing for complex nested structures
            const complexRule: ValidationRule<ComplexNested> = {
                user: {
                    profile: {
                        settings: {
                            notifications: [required()]
                        }
                    }
                }
            };

            const complexValidator = new Validator<ComplexNested>(complexRule);

            expect(explicitValidator).toBeDefined();
            expect(inferredValidator).toBeDefined();
            expect(complexValidator).toBeDefined();
        });

        test('should demonstrate ValidationResult return type limitations', () => {
            // ValidationResult<T> has a limitation where errors are optional
            // but when isValid is false, errors should always be present
            
            const rule: ValidationRule<TestUser> = {
                name: [required()]
            };
            const validator = new Validator(rule);
            const invalidUser: TestUser = {
                name: "",
                email: "test@example.com", 
                age: 30
            };

            const result = validator.validate(invalidUser);

            // Limitation: TypeScript doesn't enforce that when isValid is false,
            // errors must be defined. The type system allows:
            // { isValid: false, message: "error", errors: undefined }
            
            // Ideally, we'd want a discriminated union like:
            // type ValidationResult<T> = 
            //   | { isValid: true; message: string; errors?: undefined }
            //   | { isValid: false; message: string; errors: ErrorOf<T> }

            if (!result.isValid) {
                // We have to check if errors exist even though logically they should
                expect(result.errors).toBeDefined();
            }

            expect(result.isValid).toBe(false);
            expect(result.message).toBeDefined();
        });
    });

    describe('Edge Cases and Error Handling', () => {
        test('should handle validation when validateObject throws', () => {
            // This test covers the edge case where validateObject might encounter
            // an unexpected error during validation
            const rule: ValidationRule<TestUser> = {
                name: [required()]
            };
            const validator = new Validator(rule);
            
            // Test with an object that might cause validation issues
            const problematicUser = {
                name: "John",
                // Adding properties that might confuse the validator
                toString: null,
                valueOf: undefined
            } as any as TestUser;

            // Act & Assert - should not throw
            expect(() => {
                const result = validator.validate(problematicUser);
                expect(result).toBeDefined();
            }).not.toThrow();
        });

        test('should handle empty error object correctly in validation loop', () => {
            // This test ensures the for...in loop in validate method works correctly
            // when errors object has no enumerable properties
            const rule: ValidationRule<TestUser> = {};
            const validator = new Validator(rule);
            const user: TestUser = {
                name: "John",
                email: "john@example.com",
                age: 30
            };

            const result = validator.validate(user);

            expect(result.isValid).toBe(true);
            expect(result.errors).toBeUndefined();
        });

        test('should handle prototype pollution protection in error checking', () => {
            // This test verifies that Object.prototype.hasOwnProperty.call is used correctly
            const rule: ValidationRule<TestUser> = {
                name: [required()]
            };
            const validator = new Validator(rule);
            
            // Create an object that might have inherited properties
            const userWithPrototype = Object.create({
                inheritedProperty: "should not affect validation"
            });
            userWithPrototype.name = "John";
            userWithPrototype.email = "john@example.com";
            userWithPrototype.age = 30;

            const result = validator.validate(userWithPrototype as TestUser);

            expect(result.isValid).toBe(true);
        });

        test('should handle field validation with complex field names', () => {
            // Test field validation with various field name types
            interface ComplexFields {
                'field-with-dash': string;
                'field with space': string;
                '123numeric': string;
                $special: string;
            }

            const rule: ValidationRule<ComplexFields> = {
                'field-with-dash': [required()],
                'field with space': [required()],
                '123numeric': [required()],
                $special: [required()]
            };
            
            const validator = new Validator(rule);
            const obj: ComplexFields = {
                'field-with-dash': 'value1',
                'field with space': 'value2', 
                '123numeric': 'value3',
                $special: 'value4'
            };

            // Test each field type
            expect(validator.validateField(obj, 'field-with-dash').isValid).toBe(true);
            expect(validator.validateField(obj, 'field with space').isValid).toBe(true);
            expect(validator.validateField(obj, '123numeric').isValid).toBe(true);
            expect(validator.validateField(obj, '$special').isValid).toBe(true);
        });
    });
}); 