import { ValidationRule, ArrayValidationRule, ValidateFunc, RuleViolation } from "../../../types/ValidationRule"
import { required } from "../../../rules/required"
import { minNumber } from "../../../rules/minNumber"
import { stringMinLen } from "../../../rules/stringMinLen"
import { arrayMinLen } from "../../../rules/arrayMinLen"
import { arrayMaxLen } from "../../../rules/arrayMaxLen"
import { emailAddress } from "../../../rules/emailAddress"

describe("ValidationRule Type", () => {
    // Test interfaces
    interface SimpleUser {
        id: number
        name: string
        email: string
        age?: number
    }

    interface ComplexUser extends SimpleUser {
        profile: UserProfile
        orders: Order[]
        tags: string[]
        scores: number[]
        isActive: boolean
        createdAt: Date
        metadata?: Record<string, any>
    }

    interface UserProfile {
        bio: string
        avatar?: string
        preferences: UserPreferences
    }

    interface UserPreferences {
        theme: string
        notifications: boolean
        languages: string[]
    }

    interface Order {
        id: string
        total: number
        items: OrderItem[]
        status: string
    }

    interface OrderItem {
        productId: string
        quantity: number
        price: number
    }

    describe("Basic ValidationRule Type", () => {
        test("should handle primitive fields with ValidateFunc arrays", () => {
            const rule: ValidationRule<SimpleUser> = {
                id: [required()],
                name: [required(), stringMinLen(2)],
                email: [required(), emailAddress()],
                age: [minNumber(0)]
            }

            expect(rule.id).toBeDefined()
            expect(Array.isArray(rule.id)).toBe(true)
            expect(rule.name).toBeDefined()
            expect(Array.isArray(rule.name)).toBe(true)
            expect(rule.email).toBeDefined()
            expect(Array.isArray(rule.email)).toBe(true)
            expect(rule.age).toBeDefined()
            expect(Array.isArray(rule.age)).toBe(true)
        })

        test("should handle Date fields with ValidateFunc arrays", () => {
            const rule: ValidationRule<ComplexUser> = {
                createdAt: [required()]
            }

            expect(rule.createdAt).toBeDefined()
            expect(Array.isArray(rule.createdAt)).toBe(true)
        })

        test("should handle object fields with nested ValidationRule", () => {
            const rule: ValidationRule<ComplexUser> = {
                profile: {
                    bio: [required(), stringMinLen(10)],
                    avatar: [stringMinLen(5)],
                    preferences: {
                        theme: [required()],
                        notifications: [required()],
                        languages: {
                            arrayRules: [arrayMinLen(1)]
                        }
                    }
                }
            }

            expect(rule.profile).toBeDefined()
            expect(typeof rule.profile).toBe("object")
            expect(rule.profile.bio).toBeDefined()
            expect(Array.isArray(rule.profile.bio)).toBe(true)
        })

        test("should handle optional properties", () => {
            const rule: ValidationRule<SimpleUser> = {
                id: [required()],
                name: [required()],
                email: [required()],
                age: [minNumber(0)] // Optional property
            }

            expect(rule.age).toBeDefined()
            expect(Array.isArray(rule.age)).toBe(true)
        })
    })

    describe("ArrayValidationRule Type", () => {
        describe("Object Arrays", () => {
            test("should handle object arrays with ValidationRule", () => {
                const arrayRule: ArrayValidationRule<Order[], ComplexUser> = {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: {
                        id: [required()],
                        total: [minNumber(0)],
                        status: [required()]
                    }
                }

                expect(arrayRule.arrayRules).toBeDefined()
                expect(Array.isArray(arrayRule.arrayRules)).toBe(true)
                expect(arrayRule.arrayElementRule).toBeDefined()
                expect(typeof arrayRule.arrayElementRule).toBe("object")
            })

            test("should handle nested object arrays", () => {
                const nestedArrayRule: ArrayValidationRule<Order[], ComplexUser> = {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: {
                        items: {
                            arrayRules: [arrayMinLen(1)],
                            arrayElementRule: {
                                productId: [required()],
                                quantity: [minNumber(1)],
                                price: [minNumber(0)]
                            }
                        }
                    }
                }

                expect(nestedArrayRule.arrayElementRule).toBeDefined()
                expect(typeof nestedArrayRule.arrayElementRule).toBe("object")
            })

            test("should handle function-based object array element rules", () => {
                const functionalArrayRule: ArrayValidationRule<Order[], ComplexUser> = {
                    arrayElementRule: (order, root) => ({
                        total: [minNumber(root.age && root.age >= 18 ? 10 : 5)]
                    })
                }

                expect(functionalArrayRule.arrayElementRule).toBeDefined()
                expect(typeof functionalArrayRule.arrayElementRule).toBe("function")

                // Test function execution
                const mockOrder: Order = { id: "1", total: 15, items: [], status: "pending" }
                const mockRoot: ComplexUser = { 
                    id: 1, name: "John", email: "john@example.com", age: 25,
                    profile: { bio: "Test", preferences: { theme: "dark", notifications: true, languages: [] } },
                    orders: [], tags: [], scores: [], isActive: true, createdAt: new Date()
                }

                if (typeof functionalArrayRule.arrayElementRule === "function") {
                    const result = functionalArrayRule.arrayElementRule(mockOrder, mockRoot)
                    expect(result).toBeDefined()
                    expect(result.total).toBeDefined()
                    expect(Array.isArray(result.total)).toBe(true)
                }
            })
        })

        describe("Primitive Arrays", () => {
            test("should handle string arrays with ValidateFunc arrays", () => {
                const stringArrayRule: ArrayValidationRule<string[], ComplexUser> = {
                    arrayRules: [arrayMinLen(1), arrayMaxLen(10)],
                    arrayElementRule: [required(), stringMinLen(3)]
                }

                expect(stringArrayRule.arrayRules).toBeDefined()
                expect(Array.isArray(stringArrayRule.arrayRules)).toBe(true)
                expect(stringArrayRule.arrayElementRule).toBeDefined()
                expect(Array.isArray(stringArrayRule.arrayElementRule)).toBe(true)
            })

            test("should handle number arrays with ValidateFunc arrays", () => {
                const numberArrayRule: ArrayValidationRule<number[], ComplexUser> = {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), minNumber(0)]
                }

                expect(numberArrayRule.arrayRules).toBeDefined()
                expect(Array.isArray(numberArrayRule.arrayRules)).toBe(true)
                expect(numberArrayRule.arrayElementRule).toBeDefined()
                expect(Array.isArray(numberArrayRule.arrayElementRule)).toBe(true)
            })

            test("should handle boolean arrays with ValidateFunc arrays", () => {
                const booleanArrayRule: ArrayValidationRule<boolean[], ComplexUser> = {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required()]
                }

                expect(booleanArrayRule.arrayRules).toBeDefined()
                expect(Array.isArray(booleanArrayRule.arrayRules)).toBe(true)
                expect(booleanArrayRule.arrayElementRule).toBeDefined()
                expect(Array.isArray(booleanArrayRule.arrayElementRule)).toBe(true)
            })

            test("should handle function-based primitive array element rules", () => {
                const functionalPrimitiveRule: ArrayValidationRule<string[], ComplexUser> = {
                    arrayElementRule: (tag, root) => [
                        required(),
                        stringMinLen(root.age && root.age >= 18 ? 1 : 3)
                    ]
                }

                expect(functionalPrimitiveRule.arrayElementRule).toBeDefined()
                expect(typeof functionalPrimitiveRule.arrayElementRule).toBe("function")

                // Test function execution
                const mockRoot: ComplexUser = { 
                    id: 1, name: "John", email: "john@example.com", age: 25,
                    profile: { bio: "Test", preferences: { theme: "dark", notifications: true, languages: [] } },
                    orders: [], tags: [], scores: [], isActive: true, createdAt: new Date()
                }

                if (typeof functionalPrimitiveRule.arrayElementRule === "function") {
                    const result = functionalPrimitiveRule.arrayElementRule("test-tag", mockRoot)
                    expect(result).toBeDefined()
                    expect(Array.isArray(result)).toBe(true)
                    expect(result.length).toBe(2)
                }
            })

            test("should handle mixed primitive array scenarios", () => {
                interface MixedArrayUser {
                    tags: string[]
                    scores: number[]
                    flags: boolean[]
                }

                const mixedArrayRule: ValidationRule<MixedArrayUser> = {
                    tags: {
                        arrayRules: [arrayMinLen(1)],
                        arrayElementRule: [required(), stringMinLen(2)]
                    },
                    scores: {
                        arrayRules: [arrayMinLen(1), arrayMaxLen(100)],
                        arrayElementRule: [required(), minNumber(0)]
                    },
                    flags: {
                        arrayRules: [arrayMinLen(1)],
                        arrayElementRule: [required()]
                    }
                }

                expect(mixedArrayRule.tags).toBeDefined()
                expect(mixedArrayRule.scores).toBeDefined()
                expect(mixedArrayRule.flags).toBeDefined()
            })
        })

        describe("Optional Array Rules", () => {
            test("should handle optional arrayRules and arrayElementRule", () => {
                const minimalArrayRule: ArrayValidationRule<Order[], ComplexUser> = {}
                
                expect(minimalArrayRule.arrayRules).toBeUndefined()
                expect(minimalArrayRule.arrayElementRule).toBeUndefined()
            })

            test("should handle only arrayRules", () => {
                const onlyArrayRules: ArrayValidationRule<string[], ComplexUser> = {
                    arrayRules: [arrayMinLen(1)]
                }
                
                expect(onlyArrayRules.arrayRules).toBeDefined()
                expect(onlyArrayRules.arrayElementRule).toBeUndefined()
            })

            test("should handle only arrayElementRule for objects", () => {
                const onlyElementRules: ArrayValidationRule<Order[], ComplexUser> = {
                    arrayElementRule: {
                        id: [required()]
                    }
                }
                
                expect(onlyElementRules.arrayRules).toBeUndefined()
                expect(onlyElementRules.arrayElementRule).toBeDefined()
            })

            test("should handle only arrayElementRule for primitives", () => {
                const onlyPrimitiveRules: ArrayValidationRule<string[], ComplexUser> = {
                    arrayElementRule: [required(), stringMinLen(3)]
                }
                
                expect(onlyPrimitiveRules.arrayRules).toBeUndefined()
                expect(onlyPrimitiveRules.arrayElementRule).toBeDefined()
                expect(Array.isArray(onlyPrimitiveRules.arrayElementRule)).toBe(true)
            })
        })

        describe("Dynamic Array Rules", () => {
            test("should handle dynamic array rules with functions", () => {
                const dynamicArrayRule: ValidationRule<ComplexUser> = {
                    orders: (orders, root) => ({
                        arrayRules: [arrayMinLen(root.age && root.age >= 18 ? 1 : 0)],
                        arrayElementRule: {
                            total: [minNumber(root.age && root.age >= 18 ? 10 : 5)]
                        }
                    })
                }

                expect(dynamicArrayRule.orders).toBeDefined()
                expect(typeof dynamicArrayRule.orders).toBe("function")
            })

            test("should handle dynamic primitive array rules", () => {
                const dynamicPrimitiveRule: ValidationRule<ComplexUser> = {
                    tags: (tags, root) => ({
                        arrayRules: [arrayMinLen(1)],
                        arrayElementRule: [required(), stringMinLen(root.age && root.age >= 18 ? 1 : 3)]
                    })
                }

                expect(dynamicPrimitiveRule.tags).toBeDefined()
                expect(typeof dynamicPrimitiveRule.tags).toBe("function")
            })
        })
    })

    describe("Type Safety and Edge Cases", () => {
        test("should handle undefined properties correctly", () => {
            interface OptionalProps {
                required: string
                optional?: string
                nullableArray?: string[]
                nullableObject?: { prop: string }
            }

            const optionalRule: ValidationRule<OptionalProps> = {
                required: [required()],
                optional: [required()],
                nullableArray: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required()]
                },
                nullableObject: {
                    prop: [required()]
                }
            }

            expect(optionalRule.required).toBeDefined()
            expect(optionalRule.optional).toBeDefined()
            expect(optionalRule.nullableArray).toBeDefined()
            expect(optionalRule.nullableObject).toBeDefined()
        })

        test("should handle deeply nested structures", () => {
            interface DeepNested {
                level1: {
                    level2: {
                        level3: {
                            value: string
                            primitiveItems: string[]
                            objectItems: Array<{
                                id: string
                                nested: {
                                    prop: number
                                }
                            }>
                        }
                    }
                }
            }

            const deepRule: ValidationRule<DeepNested> = {
                level1: {
                    level2: {
                        level3: {
                            value: [required()],
                            primitiveItems: {
                                arrayRules: [arrayMinLen(1)],
                                arrayElementRule: [required(), stringMinLen(2)]
                            },
                            objectItems: {
                                arrayRules: [arrayMinLen(1)],
                                arrayElementRule: {
                                    id: [required()],
                                    nested: {
                                        prop: [minNumber(0)]
                                    }
                                }
                            }
                        }
                    }
                }
            }

            expect(deepRule.level1).toBeDefined()
            expect(typeof deepRule.level1).toBe("object")
        })

        test("should handle empty validation rules", () => {
            const emptyRule: ValidationRule<SimpleUser> = {}
            expect(Object.keys(emptyRule).length).toBe(0)

            const emptyArrayRule: ArrayValidationRule<string[], SimpleUser> = {}
            expect(emptyArrayRule.arrayRules).toBeUndefined()
            expect(emptyArrayRule.arrayElementRule).toBeUndefined()
        })

        test("should handle rules with no validators", () => {
            const noValidatorsRule: ValidationRule<SimpleUser> = {
                name: [],
                email: []
            }

            expect(Array.isArray(noValidatorsRule.name)).toBe(true)
            expect(noValidatorsRule.name?.length).toBe(0)
            expect(Array.isArray(noValidatorsRule.email)).toBe(true)
            expect(noValidatorsRule.email?.length).toBe(0)
        })

        test("should handle complex array scenarios", () => {
            interface ComplexArrayScenario {
                primitiveArray: string[]
                objectArray: Array<{ id: string; value: number }>
                nestedArrays: Array<{ items: string[] }>
                optionalArray?: number[]
            }

            const complexArrayRule: ValidationRule<ComplexArrayScenario> = {
                primitiveArray: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), stringMinLen(1)]
                },
                objectArray: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: {
                        id: [required()],
                        value: [minNumber(0)]
                    }
                },
                nestedArrays: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: {
                        items: {
                            arrayRules: [arrayMinLen(1)],
                            arrayElementRule: [required(), stringMinLen(1)]
                        }
                    }
                },
                optionalArray: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), minNumber(0)]
                }
            }

            expect(complexArrayRule.primitiveArray).toBeDefined()
            expect(complexArrayRule.objectArray).toBeDefined()
            expect(complexArrayRule.nestedArrays).toBeDefined()
            expect(complexArrayRule.optionalArray).toBeDefined()
        })
    })

    describe("Custom ValidateFunc", () => {
        test("should handle custom validation functions", () => {
            const customStringValidator: ValidateFunc<string, SimpleUser> = (value, root) => {
                if (value.includes("admin") && root.age && root.age < 18) {
                    return {
                        ruleName: "adminAgeRestriction",
                        attemptedValue: value,
                        errorMessage: "Admin access requires age 18+"
                    }
                }
                return undefined
            }

            const customNumberValidator: ValidateFunc<number, SimpleUser> = (value, root) => {
                if (value > 100 && root.name.length < 5) {
                    return {
                        ruleName: "highValueNameLength",
                        attemptedValue: value,
                        errorMessage: "High values require longer names"
                    }
                }
                return undefined
            }

            const ruleWithCustomValidators: ValidationRule<SimpleUser> = {
                name: [required(), customStringValidator],
                id: [required(), customNumberValidator]
            }

            expect(ruleWithCustomValidators.name).toBeDefined()
            expect(Array.isArray(ruleWithCustomValidators.name)).toBe(true)
            expect(ruleWithCustomValidators.name.length).toBe(2)
            expect(ruleWithCustomValidators.id).toBeDefined()
            expect(Array.isArray(ruleWithCustomValidators.id)).toBe(true)
            expect(ruleWithCustomValidators.id.length).toBe(2)
        })

        test("should handle custom validators in primitive arrays", () => {
            const customTagValidator: ValidateFunc<string, ComplexUser> = (tag, root) => {
                if (tag.startsWith("private-") && !root.isActive) {
                    return {
                        ruleName: "privateTagActiveUser",
                        attemptedValue: tag,
                        errorMessage: "Private tags require active user"
                    }
                }
                return undefined
            }

            const customScoreValidator: ValidateFunc<number, ComplexUser> = (score, root) => {
                if (score > 90 && root.orders.length === 0) {
                    return {
                        ruleName: "highScoreRequiresOrders",
                        attemptedValue: score,
                        errorMessage: "High scores require at least one order"
                    }
                }
                return undefined
            }

            const ruleWithCustomArrayValidators: ValidationRule<ComplexUser> = {
                tags: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), stringMinLen(1), customTagValidator]
                },
                scores: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: [required(), minNumber(0), customScoreValidator]
                }
            }

            expect(ruleWithCustomArrayValidators.tags).toBeDefined()
            expect(ruleWithCustomArrayValidators.scores).toBeDefined()
        })
    })
}); 