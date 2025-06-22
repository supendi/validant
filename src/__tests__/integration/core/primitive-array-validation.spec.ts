import { validateObject } from "../../../validators/sync/validateObject";
import { validateObjectAsync } from "../../../validators/async/validateObjectAsync";
import { ValidationRule } from "../../../types/ValidationRule";
import { AsyncValidationRule } from "../../../types/AsyncValidationRule";
import { required } from "../../../rules/required";
import { stringMinLen } from "../../../rules/stringMinLen";
import { minNumber } from "../../../rules/minNumber";
import { arrayMinLen } from "../../../rules/arrayMinLen";
import { arrayMaxLen } from "../../../rules/arrayMaxLen";

describe("Primitive Array Validation Integration", () => {
    interface UserWithPrimitiveArrays {
        id: number;
        name: string;
        tags: string[];
        scores: number[];
        flags: boolean[];
        orders: Array<{
            id: string;
            total: number;
        }>;
    }

    const sampleUser: UserWithPrimitiveArrays = {
        id: 1,
        name: "John Doe",
        tags: ["developer", "typescript", "react"],
        scores: [85, 92, 78, 95],
        flags: [true, false, true],
        orders: [
            { id: "order1", total: 100 },
            { id: "order2", total: 250 }
        ]
    };

    describe("Sync Validation", () => {
        test("should validate primitive string arrays successfully", () => {
            const rule: ValidationRule<UserWithPrimitiveArrays> = {
                tags: {
                    arrayRules: [arrayMinLen(1), arrayMaxLen(10)],
                    arrayElementRule: [required(), stringMinLen(3)]
                }
            };

            const errors = validateObject(sampleUser, sampleUser, rule);
            expect(errors).toBeUndefined();
        });

        test("should validate primitive number arrays successfully", () => {
            const rule: ValidationRule<UserWithPrimitiveArrays> = {
                scores: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), minNumber(0)]
                }
            };

            const errors = validateObject(sampleUser, sampleUser, rule);
            expect(errors).toBeUndefined();
        });

        test("should validate primitive boolean arrays successfully", () => {
            const rule: ValidationRule<UserWithPrimitiveArrays> = {
                flags: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required()]
                }
            };

            const errors = validateObject(sampleUser, sampleUser, rule);
            expect(errors).toBeUndefined();
        });

        test("should validate object arrays (existing functionality)", () => {
            const rule: ValidationRule<UserWithPrimitiveArrays> = {
                orders: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: {
                        id: [required()],
                        total: [minNumber(0)]
                    }
                }
            };

            const errors = validateObject(sampleUser, sampleUser, rule);
            expect(errors).toBeUndefined();
        });

        test("should detect primitive array element validation errors", () => {
            const invalidUser: UserWithPrimitiveArrays = {
                ...sampleUser,
                tags: ["valid", "a", ""] // "valid" passes, "a" and "" fail
            };

            const rule: ValidationRule<UserWithPrimitiveArrays> = {
                tags: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), stringMinLen(3)]
                }
            };

            const errors = validateObject(invalidUser, invalidUser, rule);
            expect(errors).toBeDefined();
            expect(errors?.tags?.arrayElementErrors).toBeDefined();
            expect(errors?.tags?.arrayElementErrors?.length).toBe(2); // Two invalid elements: "a" and ""
        });

        test("should handle dynamic primitive array validation", () => {
            const rule: ValidationRule<UserWithPrimitiveArrays> = {
                tags: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: (tag, root) => [
                        required(),
                        stringMinLen(root.name.length > 5 ? 2 : 4)
                    ]
                }
            };

            const errors = validateObject(sampleUser, sampleUser, rule);
            expect(errors).toBeUndefined(); // Should pass since John Doe > 5 chars, so min length is 2
        });

        test("should handle mixed array types in same object", () => {
            const rule: ValidationRule<UserWithPrimitiveArrays> = {
                tags: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), stringMinLen(2)]
                },
                scores: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), minNumber(0)]
                },
                orders: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: {
                        id: [required()],
                        total: [minNumber(0)]
                    }
                }
            };

            const errors = validateObject(sampleUser, sampleUser, rule);
            expect(errors).toBeUndefined();
        });
    });

    describe("Async Validation", () => {
        test("should validate primitive string arrays successfully (async)", async () => {
            const rule: AsyncValidationRule<UserWithPrimitiveArrays> = {
                tags: {
                    arrayRules: [arrayMinLen(1), arrayMaxLen(10)],
                    arrayElementRule: [required(), stringMinLen(3)]
                }
            };

            const errors = await validateObjectAsync(sampleUser, sampleUser, rule);
            expect(errors).toBeUndefined();
        });

        test("should validate primitive number arrays successfully (async)", async () => {
            const rule: AsyncValidationRule<UserWithPrimitiveArrays> = {
                scores: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), minNumber(0)]
                }
            };

            const errors = await validateObjectAsync(sampleUser, sampleUser, rule);
            expect(errors).toBeUndefined();
        });

        test("should detect primitive array element validation errors (async)", async () => {
            const invalidUser: UserWithPrimitiveArrays = {
                ...sampleUser,
                scores: [85, -5, 78] // Contains negative number
            };

            const rule: AsyncValidationRule<UserWithPrimitiveArrays> = {
                scores: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), minNumber(0)]
                }
            };

            const errors = await validateObjectAsync(invalidUser, invalidUser, rule);
            expect(errors).toBeDefined();
            expect(errors?.scores?.arrayElementErrors).toBeDefined();
            expect(errors?.scores?.arrayElementErrors?.length).toBe(1); // One invalid element
        });

        test("should handle dynamic primitive array validation (async)", async () => {
            const rule: AsyncValidationRule<UserWithPrimitiveArrays> = {
                tags: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: (tag, root) => [
                        required(),
                        stringMinLen(root.id > 0 ? 3 : 5)
                    ]
                }
            };

            const errors = await validateObjectAsync(sampleUser, sampleUser, rule);
            expect(errors).toBeUndefined(); // Should pass since id > 0, so min length is 3
        });
    });

    describe("Edge Cases", () => {
        test("should handle empty primitive arrays", () => {
            const emptyArrayUser: UserWithPrimitiveArrays = {
                ...sampleUser,
                tags: []
            };

            const rule: ValidationRule<UserWithPrimitiveArrays> = {
                tags: {
                    arrayRules: [arrayMinLen(0)], // Allow empty
                    arrayElementRule: [required(), stringMinLen(3)]
                }
            };

            const errors = validateObject(emptyArrayUser, emptyArrayUser, rule);
            expect(errors).toBeUndefined();
        });

        test("should handle null/undefined array elements", () => {
            const nullElementUser = {
                ...sampleUser,
                tags: ["valid", null as any, undefined as any, "also-valid"]
            };

            const rule: ValidationRule<UserWithPrimitiveArrays> = {
                tags: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required()]
                }
            };

            const errors = validateObject(nullElementUser, nullElementUser, rule);
            expect(errors).toBeDefined();
            expect(errors?.tags?.arrayElementErrors).toBeDefined();
            expect(errors?.tags?.arrayElementErrors?.length).toBe(2); // null and undefined elements
        });

        test("should work with only arrayRules (no element validation)", () => {
            const rule: ValidationRule<UserWithPrimitiveArrays> = {
                tags: {
                    arrayRules: [arrayMinLen(1), arrayMaxLen(5)]
                }
            };

            const errors = validateObject(sampleUser, sampleUser, rule);
            expect(errors).toBeUndefined();
        });

        test("should work with only arrayElementRule (no array validation)", () => {
            const rule: ValidationRule<UserWithPrimitiveArrays> = {
                tags: {
                    arrayElementRule: [required(), stringMinLen(3)]
                }
            };

            const errors = validateObject(sampleUser, sampleUser, rule);
            expect(errors).toBeUndefined();
        });
    });
}); 