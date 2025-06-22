import { AsyncValidationRule, AsyncValidateFunc, GenericValidateFunc, AsyncArrayValidationRule } from "../../../types/AsyncValidationRule"
import { ValidateFunc, RuleViolation } from "../../../types/ValidationRule"
import { required, minNumber, maxNumber, arrayMinLen, emailAddress } from "../../../rules"

describe("AsyncValidationRule Types", () => {
    
    // Test interfaces for comprehensive testing
    interface SimpleUser {
        id: number
        name: string
        email: string
        age?: number
    }

    interface ComplexUser extends SimpleUser {
        profile: UserProfile
        orders: Order[]
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

    describe("AsyncValidateFunc Type", () => {
        test("should accept async function that returns Promise<RuleViolation | undefined>", async () => {
            const asyncValidator: AsyncValidateFunc<string, SimpleUser> = async (value: string, root: SimpleUser) => {
                await new Promise(resolve => setTimeout(resolve, 1))
                if (!value) {
                    return {
                        ruleName: "asyncRequired",
                        attemptedValue: value,
                        errorMessage: "Async validation failed"
                    }
                }
                return undefined
            }

            const user = { id: 1, name: "John", email: "john@test.com" }
            const result = await asyncValidator("test", user)
            expect(result).toBeUndefined()

            const errorResult = await asyncValidator("", user)
            expect(errorResult).toEqual({
                ruleName: "asyncRequired",
                attemptedValue: "",
                errorMessage: "Async validation failed"
            })
        })

        test("should handle async database validation scenario", async () => {
            const checkEmailExists: AsyncValidateFunc<string, SimpleUser> = async (email: string, root: SimpleUser) => {
                // Simulate database check
                await new Promise(resolve => setTimeout(resolve, 10))
                const existingEmails = ["existing@test.com", "taken@test.com"]
                
                if (existingEmails.includes(email)) {
                    return {
                        ruleName: "emailExists",
                        attemptedValue: email,
                        errorMessage: `Email ${email} is already taken`
                    }
                }
                return undefined
            }

            const user = { id: 1, name: "John", email: "john@test.com" }
            const validResult = await checkEmailExists("new@test.com", user)
            expect(validResult).toBeUndefined()

            const invalidResult = await checkEmailExists("existing@test.com", user)
            expect(invalidResult).toEqual({
                ruleName: "emailExists",
                attemptedValue: "existing@test.com",
                errorMessage: "Email existing@test.com is already taken"
            })
        })

        test("should handle async validation with complex root object", async () => {
            const validateWithContext: AsyncValidateFunc<number, ComplexUser> = async (value: number, root: ComplexUser) => {
                await new Promise(resolve => setTimeout(resolve, 1))
                
                // Complex validation logic using root context
                if (root.orders.length > 0 && value < 18) {
                    return {
                        ruleName: "ageWithOrders",
                        attemptedValue: value,
                        errorMessage: "Users with orders must be at least 18 years old"
                    }
                }
                return undefined
            }

            const userWithOrders: ComplexUser = {
                id: 1,
                name: "John",
                email: "john@test.com",
                age: 17,
                profile: { bio: "Bio", preferences: { theme: "dark", notifications: true, languages: ["en"] } },
                orders: [{ id: "1", total: 100, items: [], status: "completed" }],
                createdAt: new Date()
            }

            const result = await validateWithContext(17, userWithOrders)
            expect(result).toEqual({
                ruleName: "ageWithOrders",
                attemptedValue: 17,
                errorMessage: "Users with orders must be at least 18 years old"
            })
        })
    })

    describe("GenericValidateFunc Type", () => {
        test("should accept synchronous ValidateFunc", () => {
            const syncValidator: GenericValidateFunc<string, SimpleUser> = (value: string, root: SimpleUser) => {
                if (!value) {
                    return {
                        ruleName: "syncRequired",
                        attemptedValue: value,
                        errorMessage: "Sync validation failed"
                    }
                }
                return undefined
            }

            const user = { id: 1, name: "John", email: "john@test.com" }
            const result = syncValidator("test", user)
            expect(result).toBeUndefined()

            const errorResult = syncValidator("", user)
            expect(errorResult).toEqual({
                ruleName: "syncRequired",
                attemptedValue: "",
                errorMessage: "Sync validation failed"
            })
        })

        test("should accept asynchronous AsyncValidateFunc", async () => {
            const asyncValidator: GenericValidateFunc<string, SimpleUser> = async (value: string, root: SimpleUser) => {
                await new Promise(resolve => setTimeout(resolve, 1))
                if (!value) {
                    return {
                        ruleName: "asyncGeneric",
                        attemptedValue: value,
                        errorMessage: "Async generic validation failed"
                    }
                }
                return undefined
            }

            const user = { id: 1, name: "John", email: "john@test.com" }
            const result = await asyncValidator("test", user)
            expect(result).toBeUndefined()
        })

        test("should work with built-in validation rules", () => {
            const mixedValidators: GenericValidateFunc<string, SimpleUser>[] = [
                required(), // sync
                emailAddress() // sync
            ]

            mixedValidators.forEach(validator => {
                expect(typeof validator).toBe("function")
            })
        })
    })

    describe("AsyncValidationRule Type", () => {
        test("should handle simple object validation rules", () => {
            const simpleAsyncRule: AsyncValidationRule<SimpleUser> = {
                name: [required()],
                email: [required(), emailAddress()],
                age: [minNumber(0)]
            }

            expect(simpleAsyncRule.name).toBeDefined()
            expect(simpleAsyncRule.email).toBeDefined()
            expect(simpleAsyncRule.age).toBeDefined()
            expect(Array.isArray(simpleAsyncRule.name)).toBe(true)
            expect(Array.isArray(simpleAsyncRule.email)).toBe(true)
            expect(Array.isArray(simpleAsyncRule.age)).toBe(true)
        })

        test("should handle Date properties correctly", () => {
            const dateRule: AsyncValidationRule<ComplexUser> = {
                createdAt: [required()]
            }

            expect(dateRule.createdAt).toBeDefined()
            expect(Array.isArray(dateRule.createdAt)).toBe(true)
        })

        test("should handle nested object validation", () => {
            const nestedRule: AsyncValidationRule<ComplexUser> = {
                profile: {
                    bio: [required()],
                    preferences: {
                        theme: [required()],
                        notifications: [required()],
                        languages: {
                            arrayRules: [arrayMinLen(1)]
                        }
                    }
                }
            }

            expect(nestedRule.profile).toBeDefined()
            expect(typeof nestedRule.profile).toBe("object")
        })

        test("should handle array properties with AsyncArrayValidationRule", () => {
            const arrayRule: AsyncValidationRule<ComplexUser> = {
                orders: {
                    arrayRules: [arrayMinLen(1)],
                    arrayElementRule: {
                        id: [required()],
                        total: [minNumber(0)],
                        status: [required()]
                    }
                }
            }

            expect(arrayRule.orders).toBeDefined()
            expect(typeof arrayRule.orders).toBe("object")
            expect("arrayRules" in arrayRule.orders!).toBe(true)
            expect("arrayElementRule" in arrayRule.orders!).toBe(true)
        })

        test("should handle optional properties", () => {
            const optionalRule: AsyncValidationRule<SimpleUser> = {
                age: [minNumber(0), maxNumber(120)]
            }

            expect(optionalRule.age).toBeDefined()
        })

        test("should handle mixed sync and async validators", async () => {
            const checkUniqueEmail: AsyncValidateFunc<string, SimpleUser> = async (email, root) => {
                await new Promise(resolve => setTimeout(resolve, 1))
                if (email === "duplicate@test.com") {
                    return {
                        ruleName: "uniqueEmail",
                        attemptedValue: email,
                        errorMessage: "Email must be unique"
                    }
                }
                return undefined
            }

            const mixedRule: AsyncValidationRule<SimpleUser> = {
                email: [required(), emailAddress(), checkUniqueEmail]
            }

            expect(mixedRule.email).toBeDefined()
            expect(Array.isArray(mixedRule.email)).toBe(true)
            expect(mixedRule.email?.length).toBe(3)
        })

        test("should handle function-based array validation rules", () => {
            const dynamicArrayRule: AsyncValidationRule<ComplexUser> = {
                orders: (value, root) => ({
                    arrayRules: [arrayMinLen(root.age && root.age >= 18 ? 1 : 0)],
                    arrayElementRule: {
                        total: [minNumber(1)]
                    }
                })
            }

            expect(dynamicArrayRule.orders).toBeDefined()
            expect(typeof dynamicArrayRule.orders).toBe("function")
        })
    })

    describe("AsyncArrayValidationRule Type", () => {
        test("should handle array-level validation rules", () => {
            const arrayRule: AsyncArrayValidationRule<Order[], ComplexUser> = {
                arrayRules: [arrayMinLen(1)],
                arrayElementRule: {
                    id: [required()],
                    total: [minNumber(0)]
                }
            }

            expect(arrayRule.arrayRules).toBeDefined()
            expect(arrayRule.arrayElementRule).toBeDefined()
            expect(Array.isArray(arrayRule.arrayRules)).toBe(true)
        })

        test("should handle nested array validation", () => {
            const nestedArrayRule: AsyncArrayValidationRule<Order[], ComplexUser> = {
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

        test("should handle function-based array element rules", () => {
            const functionalArrayRule: AsyncArrayValidationRule<Order[], ComplexUser> = {
                arrayElementRule: (arrayItem, root) => ({
                    total: [minNumber(root.age && root.age >= 18 ? 10 : 5)]
                })
            }

            expect(functionalArrayRule.arrayElementRule).toBeDefined()
            expect(typeof functionalArrayRule.arrayElementRule).toBe("function")
        })

        test("should handle async array validators", async () => {
            const asyncArrayValidator: AsyncValidateFunc<Order[], ComplexUser> = async (orders, root) => {
                await new Promise(resolve => setTimeout(resolve, 1))
                if (orders.length === 0 && root.age && root.age >= 18) {
                    return {
                        ruleName: "adultOrderRequired",
                        attemptedValue: orders,
                        errorMessage: "Adults must have at least one order"
                    }
                }
                return undefined
            }

            const asyncArrayRule: AsyncArrayValidationRule<Order[], ComplexUser> = {
                arrayRules: [asyncArrayValidator],
                arrayElementRule: {
                    id: [required()]
                }
            }

            expect(asyncArrayRule.arrayRules).toBeDefined()
            expect(Array.isArray(asyncArrayRule.arrayRules)).toBe(true)
        })

        test("should handle optional arrayRules and arrayElementRule", () => {
            const minimalArrayRule: AsyncArrayValidationRule<Order[], ComplexUser> = {}
            
            expect(minimalArrayRule.arrayRules).toBeUndefined()
            expect(minimalArrayRule.arrayElementRule).toBeUndefined()
            
            const onlyArrayRules: AsyncArrayValidationRule<Order[], ComplexUser> = {
                arrayRules: [arrayMinLen(1)]
            }
            
            expect(onlyArrayRules.arrayRules).toBeDefined()
            expect(onlyArrayRules.arrayElementRule).toBeUndefined()
            
            const onlyElementRules: AsyncArrayValidationRule<Order[], ComplexUser> = {
                arrayElementRule: {
                    id: [required()]
                }
            }
            
            expect(onlyElementRules.arrayRules).toBeUndefined()
            expect(onlyElementRules.arrayElementRule).toBeDefined()
        })
    })

    describe("Type Compatibility and Edge Cases", () => {
        test("should handle undefined properties correctly", () => {
            interface OptionalProps {
                required: string
                optional?: string
                nullableArray?: string[]
                nullableObject?: { prop: string }
            }

            const optionalRule: AsyncValidationRule<OptionalProps> = {
                required: [required()],
                optional: [required()],
                nullableArray: {
                    arrayRules: [arrayMinLen(1)]
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
                            items: Array<{
                                id: string
                                nested: {
                                    prop: number
                                }
                            }>
                        }
                    }
                }
            }

            const deepRule: AsyncValidationRule<DeepNested> = {
                level1: {
                    level2: {
                        level3: {
                            value: [required()],
                            items: {
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
            const emptyRule: AsyncValidationRule<SimpleUser> = {}
            expect(Object.keys(emptyRule).length).toBe(0)

            const emptyArrayRule: AsyncArrayValidationRule<string[], SimpleUser> = {}
            expect(emptyArrayRule.arrayRules).toBeUndefined()
            expect(emptyArrayRule.arrayElementRule).toBeUndefined()
        })

        test("should handle rules with no validators", () => {
            const noValidatorsRule: AsyncValidationRule<SimpleUser> = {
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

            const complexArrayRule: AsyncValidationRule<ComplexArrayScenario> = {
                primitiveArray: {
                    arrayRules: [arrayMinLen(1)]
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
                            arrayRules: [arrayMinLen(1)]
                        }
                    }
                },
                optionalArray: {
                    arrayRules: [arrayMinLen(0)]
                }
            }

            expect(complexArrayRule.primitiveArray).toBeDefined()
            expect(complexArrayRule.objectArray).toBeDefined()
            expect(complexArrayRule.nestedArrays).toBeDefined()
            expect(complexArrayRule.optionalArray).toBeDefined()
        })

        test("should maintain type safety with constraints", () => {
            // Test basic type safety without complex generics
            const simpleRule: AsyncValidationRule<SimpleUser> = {
                name: [required()],
                email: [required(), emailAddress()],
                age: [minNumber(0)]
            }

            expect(simpleRule.name).toBeDefined()
            expect(simpleRule.email).toBeDefined()
            expect(simpleRule.age).toBeDefined()

            const complexRule: AsyncValidationRule<ComplexUser> = {
                name: [required()],
                email: [required(), emailAddress()],
                orders: {
                    arrayRules: [arrayMinLen(0)]
                }
            }
            
            expect(complexRule.name).toBeDefined()
            expect(complexRule.email).toBeDefined()
            expect(complexRule.orders).toBeDefined()
        })
    })

    describe("Runtime Behavior Tests", () => {
        test("should execute async validation functions correctly", async () => {
            const asyncEmailCheck: AsyncValidateFunc<string, SimpleUser> = async (email, root) => {
                await new Promise(resolve => setTimeout(resolve, 5))
                const takenEmails = ["admin@test.com", "user@test.com"]
                
                if (takenEmails.includes(email)) {
                    return {
                        ruleName: "emailTaken",
                        attemptedValue: email,
                        errorMessage: `Email ${email} is already taken`
                    }
                }
                return undefined
            }

            const user = { id: 1, name: "John", email: "john@test.com" }
            
            // Test valid email
            const validResult = await asyncEmailCheck("new@test.com", user)
            expect(validResult).toBeUndefined()
            
            // Test taken email
            const invalidResult = await asyncEmailCheck("admin@test.com", user)
            expect(invalidResult).toEqual({
                ruleName: "emailTaken",
                attemptedValue: "admin@test.com",
                errorMessage: "Email admin@test.com is already taken"
            })
        })

        test("should handle async validation with timeout", async () => {
            const slowValidator: AsyncValidateFunc<string, SimpleUser> = async (value, root) => {
                await new Promise(resolve => setTimeout(resolve, 100))
                if (!value) {
                    return {
                        ruleName: "slowValidation",
                        attemptedValue: value,
                        errorMessage: "Slow validation failed"
                    }
                }
                return undefined
            }

            const user = { id: 1, name: "John", email: "john@test.com" }
            const startTime = Date.now()
            const result = await slowValidator("test", user)
            const endTime = Date.now()
            
            expect(result).toBeUndefined()
            expect(endTime - startTime).toBeGreaterThanOrEqual(95) // Allow for some timing variance
        })

        test("should handle validation errors correctly", async () => {
            const errorThrowingValidator: AsyncValidateFunc<string, SimpleUser> = async (value, root) => {
                // This simulates a validator that might throw an error
                if (value === "THROW_ERROR") {
                    throw new Error("Validation error occurred")
                }
                return undefined
            }

            const user = { id: 1, name: "John", email: "john@test.com" }
            
            // Test normal case
            const normalResult = await errorThrowingValidator("normal", user)
            expect(normalResult).toBeUndefined()
            
            // Test error case
            await expect(errorThrowingValidator("THROW_ERROR", user)).rejects.toThrow("Validation error occurred")
        })
    })
}) 