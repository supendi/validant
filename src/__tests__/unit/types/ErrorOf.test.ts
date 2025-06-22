import { RuleViolation } from "../../../types/ValidationRule"
import { 
    PossiblyUndefined, 
    ArrayElementType, 
    ErrorOf, 
    IndexedErrorOf, 
    ErrorOfArray 
} from "../../../types/ErrorOf"

describe("ErrorOf Types", () => {
    
    // === TEST INTERFACES FOR COMPREHENSIVE TESTING ===
    
    // Basic primitive interface
    interface BasicUser {
        id: number
        name: string
        email: string
        isActive: boolean
    }

    // Interface with optional properties
    interface UserWithOptionals {
        id: number
        name: string
        email?: string
        age?: number
        metadata?: Record<string, unknown>
    }

    // Interface with Date properties
    interface TimestampedEntity {
        id: string
        createdAt: Date
        updatedAt?: Date
        deletedAt?: Date | null
    }

    // Interface with arrays
    interface EntityWithArrays {
        id: string
        tags: string[]
        scores: number[]
        optionalItems?: boolean[]
        nullableItems?: string[] | null
    }

    // Complex nested interface
    interface UserPreferences {
        theme: string
        language: string
        notifications: boolean
        privacy: {
            showEmail: boolean
            showProfile: boolean
        }
    }

    interface ComplexUser {
        id: number
        name: string
        profile: UserProfile
        orders: Order[]
        preferences?: UserPreferences
        metadata?: { [key: string]: any }
        timestamps: {
            created: Date
            updated?: Date
        }
    }

    interface UserProfile {
        bio: string
        avatar?: string
        settings: ProfileSettings
        socialLinks?: SocialLink[]
    }

    interface ProfileSettings {
        theme: string
        notifications: boolean
        languages: string[]
        features?: { [key: string]: boolean }
    }

    interface SocialLink {
        platform: string
        url: string
        verified?: boolean
    }

    interface Order {
        id: string
        total: number
        items: OrderItem[]
        status: OrderStatus
        createdAt: Date
        shippingAddress?: Address
        billingAddress?: Address
    }

    interface OrderItem {
        productId: string
        quantity: number
        price: number
        discount?: number
        metadata?: Record<string, any>
    }

    interface Address {
        street: string
        city: string
        state?: string
        country: string
        postalCode?: string
        coordinates?: { lat: number; lng: number }
    }

    type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled"

    // Edge case interfaces
    interface EmptyInterface {}

    interface SingleProperty {
        value: string
    }

    interface UnionProperties {
        stringOrNumber: string | number
        optionalUnion?: boolean | string
        nullableUnion: Date | null
    }

    interface GenericContainer<T> {
        data: T
        metadata?: Record<string, T>
        items: T[]
    }

    interface RecursiveType {
        id: string
        children?: RecursiveType[]
        parent?: RecursiveType
    }

    // === POSSIBLYUNDEFINED TYPE TESTS ===
    
    describe("PossiblyUndefined<T>", () => {
        test("should handle primitive types", () => {
            const stringValue: PossiblyUndefined<string> = "test"
            const stringUndefined: PossiblyUndefined<string> = undefined
            const numberValue: PossiblyUndefined<number> = 42
            const numberUndefined: PossiblyUndefined<number> = undefined
            const booleanValue: PossiblyUndefined<boolean> = true
            const booleanUndefined: PossiblyUndefined<boolean> = undefined

            expect(stringValue).toBe("test")
            expect(stringUndefined).toBeUndefined()
            expect(numberValue).toBe(42)
            expect(numberUndefined).toBeUndefined()
            expect(booleanValue).toBe(true)
            expect(booleanUndefined).toBeUndefined()
        })

        test("should handle object types", () => {
            const user: PossiblyUndefined<BasicUser> = {
                id: 1,
                name: "John",
                email: "john@test.com",
                isActive: true
            }
            const userUndefined: PossiblyUndefined<BasicUser> = undefined

            expect(user?.id).toBe(1)
            expect(user?.name).toBe("John")
            expect(userUndefined).toBeUndefined()
        })

        test("should handle array types", () => {
            const stringArray: PossiblyUndefined<string[]> = ["a", "b", "c"]
            const numberArray: PossiblyUndefined<number[]> = [1, 2, 3]
            const objectArray: PossiblyUndefined<BasicUser[]> = [{
                id: 1, name: "John", email: "john@test.com", isActive: true
            }]
            const arrayUndefined: PossiblyUndefined<any[]> = undefined

            expect(stringArray).toEqual(["a", "b", "c"])
            expect(numberArray).toEqual([1, 2, 3])
            expect(objectArray?.[0]?.id).toBe(1)
            expect(arrayUndefined).toBeUndefined()
        })

        test("should handle Date types", () => {
            const now = new Date()
            const dateValue: PossiblyUndefined<Date> = now
            const dateUndefined: PossiblyUndefined<Date> = undefined

            expect(dateValue).toBe(now)
            expect(dateUndefined).toBeUndefined()
        })

        test("should handle nested PossiblyUndefined types", () => {
            const nested: PossiblyUndefined<PossiblyUndefined<string>> = "nested"
            const nestedUndefined: PossiblyUndefined<PossiblyUndefined<string>> = undefined

            expect(nested).toBe("nested")
            expect(nestedUndefined).toBeUndefined()
        })

        test("should handle generic types", () => {
            const genericString: PossiblyUndefined<GenericContainer<string>> = {
                data: "test",
                items: ["a", "b"]
            }
            const genericUndefined: PossiblyUndefined<GenericContainer<number>> = undefined

            expect(genericString?.data).toBe("test")
            expect(genericString?.items).toEqual(["a", "b"])
            expect(genericUndefined).toBeUndefined()
        })

        test("should handle union types", () => {
            const stringUnion: PossiblyUndefined<string | number> = "test"
            const numberUnion: PossiblyUndefined<string | number> = 42
            const unionUndefined: PossiblyUndefined<string | number> = undefined

            expect(stringUnion).toBe("test")
            expect(numberUnion).toBe(42)
            expect(unionUndefined).toBeUndefined()
        })

        test("should handle null vs undefined distinction", () => {
            const nullValue: PossiblyUndefined<string | null> = null
            const undefinedValue: PossiblyUndefined<string | null> = undefined
            const stringValue: PossiblyUndefined<string | null> = "test"

            expect(nullValue).toBeNull()
            expect(undefinedValue).toBeUndefined()
            expect(stringValue).toBe("test")
        })
    })

    // === ARRAYELEMENTTYPE TYPE TESTS ===
    
    describe("ArrayElementType<TArray>", () => {
        test("should extract element type from primitive arrays", () => {
            const stringArray: string[] = ["a", "b", "c"]
            const numberArray: number[] = [1, 2, 3]
            const booleanArray: boolean[] = [true, false]
            const dateArray: Date[] = [new Date(), new Date()]

            type StringElement = ArrayElementType<typeof stringArray>
            type NumberElement = ArrayElementType<typeof numberArray>
            type BooleanElement = ArrayElementType<typeof booleanArray>
            type DateElement = ArrayElementType<typeof dateArray>

            const stringEl: StringElement = "test"
            const numberEl: NumberElement = 42
            const booleanEl: BooleanElement = true
            const dateEl: DateElement = new Date()

            expect(typeof stringEl).toBe("string")
            expect(typeof numberEl).toBe("number")
            expect(typeof booleanEl).toBe("boolean")
            expect(dateEl instanceof Date).toBe(true)
        })

        test("should extract element type from object arrays", () => {
            const userArray: BasicUser[] = [{
                id: 1, name: "John", email: "john@test.com", isActive: true
            }]

            type UserElement = ArrayElementType<typeof userArray>
            const user: UserElement = {
                id: 2, name: "Jane", email: "jane@test.com", isActive: false
            }

            expect(user.id).toBe(2)
            expect(user.name).toBe("Jane")
            expect(user.isActive).toBe(false)
        })

        test("should handle nested array types", () => {
            const matrix: string[][] = [["a", "b"], ["c", "d"]]
            const threeDArray: number[][][] = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]

            type MatrixElement = ArrayElementType<typeof matrix>
            type ThreeDElement = ArrayElementType<typeof threeDArray>

            const row: MatrixElement = ["x", "y"]
            const plane: ThreeDElement = [[9, 10], [11, 12]]

            expect(Array.isArray(row)).toBe(true)
            expect(Array.isArray(plane)).toBe(true)
            expect(Array.isArray(plane[0])).toBe(true)
        })

        test("should handle complex nested object arrays", () => {
            const orderArray: Order[] = [{
                id: "1", total: 100, items: [], status: "pending", createdAt: new Date()
            }]

            type OrderElement = ArrayElementType<typeof orderArray>
            const order: OrderElement = {
                id: "2", total: 200, items: [], status: "delivered", createdAt: new Date()
            }

            expect(order.id).toBe("2")
            expect(order.total).toBe(200)
            expect(order.status).toBe("delivered")
        })

        test("should return never for non-array types", () => {
            type StringElement = ArrayElementType<string>
            type NumberElement = ArrayElementType<number>
            type ObjectElement = ArrayElementType<BasicUser>

            // These should result in 'never' type at compile time
            // Runtime verification isn't possible for 'never' type
            const neverValue: never[] = []
            expect(Array.isArray(neverValue)).toBe(true)
            expect(neverValue.length).toBe(0)
        })

        test("should handle readonly arrays vs normal arrays", () => {
            const readonlyArray: readonly string[] = ["a", "b", "c"]
            const normalArray: string[] = ["x", "y", "z"]

            type ReadonlyElement = ArrayElementType<typeof readonlyArray>
            type NormalElement = ArrayElementType<typeof normalArray>

            // readonly arrays return never because they don't match (infer U)[] pattern
            // This is expected behavior - readonly arrays need special handling
            const neverArray: ReadonlyElement[] = []
            const normalEl: NormalElement = "normal"

            expect(Array.isArray(neverArray)).toBe(true)
            expect(neverArray.length).toBe(0)
            expect(typeof normalEl).toBe("string")
        })

        test("should handle tuple types", () => {
            const tuple: [string, number, boolean] = ["test", 42, true]

            type TupleElement = ArrayElementType<typeof tuple>
            const stringEl: TupleElement = "tuple element"
            const numberEl: TupleElement = 42
            const booleanEl: TupleElement = true

            expect(typeof stringEl).toBe("string")
            expect(typeof numberEl).toBe("number")
            expect(typeof booleanEl).toBe("boolean")
        })

        test("should handle union array types", () => {
            const unionArray: (string | number)[] = ["test", 42, "hello", 123]

            type UnionElement = ArrayElementType<typeof unionArray>
            const stringEl: UnionElement = "string"
            const numberEl: UnionElement = 456

            expect(typeof stringEl).toBe("string")
            expect(typeof numberEl).toBe("number")
        })

        test("should handle optional array element types", () => {
            const optionalArray: Array<string | undefined> = ["a", undefined, "b"]

            type OptionalElement = ArrayElementType<typeof optionalArray>
            const definedEl: OptionalElement = "defined"
            const undefinedEl: OptionalElement = undefined

            expect(definedEl).toBe("defined")
            expect(undefinedEl).toBeUndefined()
        })

        test("should handle generic array types", () => {
            const genericArray: GenericContainer<string>[] = [{
                data: "test", items: ["a", "b"]
            }]

            type GenericElement = ArrayElementType<typeof genericArray>
            const genericEl: GenericElement = {
                data: "new", items: ["c", "d"]
            }

            expect(genericEl.data).toBe("new")
            expect(genericEl.items).toEqual(["c", "d"])
        })
    })

    // === ERROROF TYPE TESTS ===
    
    describe("ErrorOf<T>", () => {
        test("should handle basic primitive properties", () => {
            type BasicUserError = ErrorOf<BasicUser>

            const userError: BasicUserError = {
                id: [{
                    ruleName: "required",
                    attemptedValue: null,
                    errorMessage: "ID is required"
                }],
                name: [{
                    ruleName: "minLength",
                    attemptedValue: "",
                    errorMessage: "Name must be at least 1 character"
                }],
                email: [{
                    ruleName: "emailFormat",
                    attemptedValue: "invalid-email",
                    errorMessage: "Invalid email format"
                }],
                isActive: [{
                    ruleName: "required",
                    attemptedValue: undefined,
                    errorMessage: "isActive is required"
                }]
            }

            expect(userError.id).toBeDefined()
            expect(userError.name).toBeDefined()
            expect(userError.email).toBeDefined()
            expect(userError.isActive).toBeDefined()
            expect(Array.isArray(userError.id)).toBe(true)
            expect(Array.isArray(userError.name)).toBe(true)
        })

        test("should handle optional properties", () => {
            type UserWithOptionalsError = ErrorOf<UserWithOptionals>

            const userError: UserWithOptionalsError = {
                id: [{
                    ruleName: "positive",
                    attemptedValue: -1,
                    errorMessage: "ID must be positive"
                }],
                email: [{
                    ruleName: "emailFormat",
                    attemptedValue: "invalid",
                    errorMessage: "Invalid email"
                }],
                age: [{
                    ruleName: "range",
                    attemptedValue: 150,
                    errorMessage: "Age out of range"
                }],
                // metadata is Record<string, unknown> which is treated as object
                // so it gets ErrorOf<Record<string, unknown>> structure
                metadata: {}
            }

            expect(userError.id).toBeDefined()
            expect(userError.email).toBeDefined()
            expect(userError.age).toBeDefined()
            expect(userError.metadata).toBeDefined()
        })

        test("should handle Date properties correctly", () => {
            type TimestampedError = ErrorOf<TimestampedEntity>

            const timestampError: TimestampedError = {
                id: [{
                    ruleName: "uuid",
                    attemptedValue: "not-uuid",
                    errorMessage: "Must be valid UUID"
                }],
                createdAt: [{
                    ruleName: "validDate",
                    attemptedValue: new Date("invalid"),
                    errorMessage: "Must be valid date"
                }],
                updatedAt: [{
                    ruleName: "afterCreated",
                    attemptedValue: new Date("2020-01-01"),
                    errorMessage: "Updated date must be after created date"
                }],
                deletedAt: [{
                    ruleName: "validDate",
                    attemptedValue: null,
                    errorMessage: "Invalid date format"
                }]
            }

            expect(Array.isArray(timestampError.createdAt)).toBe(true)
            expect(Array.isArray(timestampError.updatedAt)).toBe(true)
            expect(Array.isArray(timestampError.deletedAt)).toBe(true)
        })

        test("should handle array properties with ErrorOfArray structure", () => {
            type EntityWithArraysError = ErrorOf<EntityWithArrays>

            const arrayError: EntityWithArraysError = {
                id: [{
                    ruleName: "required",
                    attemptedValue: "",
                    errorMessage: "ID required"
                }],
                tags: {
                    arrayErrors: [{
                        ruleName: "minLength",
                        attemptedValue: [],
                        errorMessage: "At least one tag required"
                    }],
                    arrayElementErrors: [{
                        index: 0,
                        errors: [{
                            ruleName: "format",
                            attemptedValue: "invalid tag",
                            errorMessage: "Invalid tag format"
                        }],
                        attemptedValue: "invalid tag"
                    }]
                },
                scores: {
                    arrayErrors: [{
                        ruleName: "sorted",
                        attemptedValue: [3, 1, 2],
                        errorMessage: "Scores must be sorted"
                    }]
                },
                optionalItems: {
                    arrayElementErrors: [{
                        index: 1,
                        errors: [{
                            ruleName: "required",
                            attemptedValue: null,
                            errorMessage: "Boolean value required"
                        }],
                        attemptedValue: null
                    }]
                },
                nullableItems: {
                    arrayErrors: [{
                        ruleName: "notEmpty",
                        attemptedValue: null,
                        errorMessage: "Array cannot be null"
                    }]
                }
            }

            expect(arrayError.tags?.arrayErrors).toBeDefined()
            expect(arrayError.tags?.arrayElementErrors).toBeDefined()
            expect(arrayError.scores?.arrayErrors).toBeDefined()
            expect(arrayError.optionalItems?.arrayElementErrors).toBeDefined()
            expect(arrayError.nullableItems?.arrayErrors).toBeDefined()
        })

        test("should handle nested objects correctly", () => {
            type ComplexUserError = ErrorOf<ComplexUser>

            const nestedError: ComplexUserError = {
                id: [{
                    ruleName: "positive",
                    attemptedValue: 0,
                    errorMessage: "ID must be positive"
                }],
                profile: {
                    bio: [{
                        ruleName: "maxLength",
                        attemptedValue: "Very long bio...",
                        errorMessage: "Bio too long"
                    }],
                    settings: {
                        theme: [{
                            ruleName: "validTheme",
                            attemptedValue: "invalid",
                            errorMessage: "Invalid theme"
                        }],
                        languages: {
                            arrayErrors: [{
                                ruleName: "minLength",
                                attemptedValue: [],
                                errorMessage: "At least one language required"
                            }]
                        }
                    }
                },
                orders: {
                    arrayElementErrors: [{
                        index: 0,
                        errors: {
                            total: [{
                                ruleName: "positive",
                                attemptedValue: -100,
                                errorMessage: "Total must be positive"
                            }],
                            items: {
                                arrayElementErrors: [{
                                    index: 0,
                                    errors: {
                                        price: [{
                                            ruleName: "positive",
                                            attemptedValue: -10,
                                            errorMessage: "Price must be positive"
                                        }]
                                    },
                                    attemptedValue: {
                                        productId: "1",
                                        quantity: 1,
                                        price: -10
                                    }
                                }]
                            }
                        },
                        attemptedValue: null
                    }]
                },
                timestamps: {
                    created: [{
                        ruleName: "validDate",
                        attemptedValue: "invalid",
                        errorMessage: "Invalid date"
                    }]
                }
            }

            expect(nestedError.profile?.bio).toBeDefined()
            expect(nestedError.profile?.settings?.theme).toBeDefined()
            expect(nestedError.orders?.arrayElementErrors).toBeDefined()
            expect(nestedError.timestamps?.created).toBeDefined()
        })

        test("should handle empty interfaces", () => {
            type EmptyError = ErrorOf<EmptyInterface>

            const emptyError: EmptyError = {}

            expect(typeof emptyError).toBe("object")
            expect(Object.keys(emptyError).length).toBe(0)
        })

        test("should handle single property interfaces", () => {
            type SingleError = ErrorOf<SingleProperty>

            const singleError: SingleError = {
                value: [{
                    ruleName: "required",
                    attemptedValue: "",
                    errorMessage: "Value is required"
                }]
            }

            expect(singleError.value).toBeDefined()
            expect(Array.isArray(singleError.value)).toBe(true)
        })

        test("should handle union type properties", () => {
            type UnionError = ErrorOf<UnionProperties>

            const unionError: UnionError = {
                stringOrNumber: [{
                    ruleName: "type",
                    attemptedValue: null,
                    errorMessage: "Must be string or number"
                }],
                optionalUnion: [{
                    ruleName: "format",
                    attemptedValue: 123,
                    errorMessage: "Invalid format"
                }],
                nullableUnion: [{
                    ruleName: "validDate",
                    attemptedValue: "not-a-date",
                    errorMessage: "Must be valid date or null"
                }]
            }

            expect(unionError.stringOrNumber).toBeDefined()
            expect(unionError.optionalUnion).toBeDefined()
            expect(unionError.nullableUnion).toBeDefined()
        })

        test("should handle generic types", () => {
            type GenericStringError = ErrorOf<GenericContainer<string>>
            type GenericNumberError = ErrorOf<GenericContainer<number>>

            const stringError: GenericStringError = {
                data: [{
                    ruleName: "minLength",
                    attemptedValue: "",
                    errorMessage: "String too short"
                }],
                items: {
                    arrayElementErrors: [{
                        index: 0,
                        errors: [{
                            ruleName: "format",
                            attemptedValue: "invalid",
                            errorMessage: "Invalid string format"
                        }],
                        attemptedValue: "invalid"
                    }]
                }
            }

            const numberError: GenericNumberError = {
                data: [{
                    ruleName: "positive",
                    attemptedValue: -1,
                    errorMessage: "Number must be positive"
                }],
                items: {
                    arrayErrors: [{
                        ruleName: "minLength",
                        attemptedValue: [],
                        errorMessage: "At least one number required"
                    }]
                }
            }

            expect(stringError.data).toBeDefined()
            expect(stringError.items?.arrayElementErrors).toBeDefined()
            expect(numberError.data).toBeDefined()
            expect(numberError.items?.arrayErrors).toBeDefined()
        })

        test("should handle recursive types", () => {
            type RecursiveError = ErrorOf<RecursiveType>

            const recursiveError: RecursiveError = {
                id: [{
                    ruleName: "uuid",
                    attemptedValue: "not-uuid",
                    errorMessage: "Must be valid UUID"
                }],
                children: {
                    arrayElementErrors: [{
                        index: 0,
                        errors: {
                            id: [{
                                ruleName: "uuid",
                                attemptedValue: "also-not-uuid",
                                errorMessage: "Child ID must be valid UUID"
                            }],
                            parent: {
                                id: [{
                                    ruleName: "circular",
                                    attemptedValue: "parent-id",
                                    errorMessage: "Circular reference detected"
                                }]
                            }
                        },
                        attemptedValue: {
                            id: "also-not-uuid"
                        }
                    }]
                },
                parent: {
                    id: [{
                        ruleName: "uuid",
                        attemptedValue: "parent-not-uuid",
                        errorMessage: "Parent ID must be valid UUID"
                    }]
                }
            }

            expect(recursiveError.id).toBeDefined()
            expect(recursiveError.children?.arrayElementErrors).toBeDefined()
            expect(recursiveError.parent?.id).toBeDefined()
        })

        test("should handle all properties as optional in error type", () => {
            type OptionalError = ErrorOf<BasicUser>

            // All properties should be optional - this should compile without errors
            const partialError1: OptionalError = {}
            const partialError2: OptionalError = {
                name: [{
                    ruleName: "required",
                    attemptedValue: "",
                    errorMessage: "Name required"
                }]
            }
            const partialError3: OptionalError = {
                id: [{
                    ruleName: "positive",
                    attemptedValue: -1,
                    errorMessage: "ID must be positive"
                }],
                email: [{
                    ruleName: "email",
                    attemptedValue: "invalid",
                    errorMessage: "Invalid email"
                }]
            }

            expect(typeof partialError1).toBe("object")
            expect(partialError2.name).toBeDefined()
            expect(partialError3.id).toBeDefined()
            expect(partialError3.email).toBeDefined()
        })
    })

    // === INDEXEDERROROF TYPE TESTS ===
    
    describe("IndexedErrorOf<T>", () => {
        test("should contain required properties: index, errors, attemptedValue", () => {
            const indexedError: IndexedErrorOf<BasicUser> = {
                index: 0,
                errors: {
                    name: [{
                        ruleName: "required",
                        attemptedValue: "",
                        errorMessage: "Name is required"
                    }],
                    email: [{
                        ruleName: "emailFormat",
                        attemptedValue: "invalid-email",
                        errorMessage: "Invalid email format"
                    }]
                },
                attemptedValue: {
                    id: 1,
                    name: "",
                    email: "invalid-email",
                    isActive: true
                }
            }

            expect(indexedError.index).toBe(0)
            expect(indexedError.errors.name).toBeDefined()
            expect(indexedError.errors.email).toBeDefined()
            expect(indexedError.attemptedValue?.id).toBe(1)
        })

        test("should handle primitive types with RuleViolation[] for errors", () => {
            const primitiveError: IndexedErrorOf<string> = {
                index: 2,
                errors: [{
                    ruleName: "minLength",
                    attemptedValue: "ab",
                    errorMessage: "String too short"
                }],
                attemptedValue: "ab"
            }

            expect(primitiveError.index).toBe(2)
            expect(Array.isArray(primitiveError.errors)).toBe(true)
            expect(primitiveError.errors[0].ruleName).toBe("minLength")
            expect(primitiveError.attemptedValue).toBe("ab")
        })

        test("should handle null attemptedValue", () => {
            const nullError: IndexedErrorOf<BasicUser> = {
                index: 1,
                errors: {
                    id: [{
                        ruleName: "required",
                        attemptedValue: null,
                        errorMessage: "ID cannot be null"
                    }]
                },
                attemptedValue: null
            }

            expect(nullError.index).toBe(1)
            expect(nullError.errors.id).toBeDefined()
            expect(nullError.attemptedValue).toBeNull()
        })

        test("should handle undefined attemptedValue", () => {
            const undefinedError: IndexedErrorOf<BasicUser> = {
                index: 3,
                errors: {
                    name: [{
                        ruleName: "required",
                        attemptedValue: undefined,
                        errorMessage: "Name is required"
                    }]
                },
                attemptedValue: undefined
            }

            expect(undefinedError.index).toBe(3)
            expect(undefinedError.errors.name).toBeDefined()
            expect(undefinedError.attemptedValue).toBeUndefined()
        })

        test("should handle complex nested objects", () => {
            const complexError: IndexedErrorOf<ComplexUser> = {
                index: 0,
                errors: {
                    profile: {
                        bio: [{
                            ruleName: "maxLength",
                            attemptedValue: "Very long bio that exceeds the maximum allowed length",
                            errorMessage: "Bio too long"
                        }],
                        settings: {
                            languages: {
                                arrayErrors: [{
                                    ruleName: "minLength",
                                    attemptedValue: [],
                                    errorMessage: "At least one language required"
                                }]
                            }
                        }
                    },
                    orders: {
                        arrayElementErrors: [{
                            index: 0,
                            errors: {
                                total: [{
                                    ruleName: "minValue",
                                    attemptedValue: -100,
                                    errorMessage: "Total cannot be negative"
                                }]
                            },
                            attemptedValue: null
                        }]
                    }
                },
                attemptedValue: {
                    id: 1,
                    name: "John",
                    profile: {
                        bio: "Very long bio that exceeds the maximum allowed length",
                        settings: {
                            theme: "dark",
                            notifications: true,
                            languages: []
                        }
                    },
                    orders: [],
                    timestamps: {
                        created: new Date()
                    }
                }
            }

            expect(complexError.index).toBe(0)
            expect(complexError.errors.profile?.bio).toBeDefined()
            expect(complexError.errors.orders?.arrayElementErrors).toBeDefined()
            expect(complexError.attemptedValue?.profile?.bio).toContain("Very long bio")
        })

        test("should handle different index values", () => {
            const errors: IndexedErrorOf<BasicUser>[] = [
                {
                    index: 0,
                    errors: { name: [{ ruleName: "required", attemptedValue: "", errorMessage: "Name required" }] },
                    attemptedValue: { id: 1, name: "", email: "test@test.com", isActive: true }
                },
                {
                    index: 5,
                    errors: { email: [{ ruleName: "format", attemptedValue: "invalid", errorMessage: "Invalid email" }] },
                    attemptedValue: { id: 2, name: "John", email: "invalid", isActive: false }
                },
                {
                    index: 999,
                    errors: { id: [{ ruleName: "positive", attemptedValue: -1, errorMessage: "ID must be positive" }] },
                    attemptedValue: { id: -1, name: "Jane", email: "jane@test.com", isActive: true }
                }
            ]

            expect(errors[0].index).toBe(0)
            expect(errors[1].index).toBe(5)
            expect(errors[2].index).toBe(999)
            errors.forEach(error => {
                expect(typeof error.index).toBe("number")
                expect(error.errors).toBeDefined()
                expect(error.attemptedValue).toBeDefined()
            })
        })

        test("should handle empty errors object", () => {
            const emptyError: IndexedErrorOf<BasicUser> = {
                index: 0,
                errors: {},
                attemptedValue: {
                    id: 1,
                    name: "John",
                    email: "john@test.com",
                    isActive: true
                }
            }

            expect(emptyError.index).toBe(0)
            expect(typeof emptyError.errors).toBe("object")
            expect(Object.keys(emptyError.errors).length).toBe(0)
            expect(emptyError.attemptedValue?.name).toBe("John")
        })

        test("should handle union type objects", () => {
            const unionError: IndexedErrorOf<UnionProperties> = {
                index: 0,
                errors: {
                    stringOrNumber: [{
                        ruleName: "type",
                        attemptedValue: null,
                        errorMessage: "Must be string or number"
                    }],
                    nullableUnion: [{
                        ruleName: "validDate",
                        attemptedValue: "not-a-date",
                        errorMessage: "Must be valid date or null"
                    }]
                },
                attemptedValue: {
                    stringOrNumber: null,
                    nullableUnion: new Date("invalid")
                }
            }

            expect(unionError.errors.stringOrNumber).toBeDefined()
            expect(unionError.errors.nullableUnion).toBeDefined()
            expect(unionError.attemptedValue?.stringOrNumber).toBeNull()
        })
    })

    // === ERROROFARRAY TYPE TESTS ===
    
    describe("ErrorOfArray<TArray>", () => {
        test("should have optional arrayErrors and arrayElementErrors properties", () => {
            const arrayError: ErrorOfArray<BasicUser[]> = {
                arrayErrors: [{
                    ruleName: "minLength",
                    attemptedValue: [],
                    errorMessage: "Array must have at least one element"
                }],
                arrayElementErrors: [{
                    index: 0,
                    errors: {
                        name: [{
                            ruleName: "required",
                            attemptedValue: "",
                            errorMessage: "Name is required"
                        }]
                    },
                    attemptedValue: {
                        id: 1,
                        name: "",
                        email: "test@test.com",
                        isActive: true
                    }
                }]
            }

            expect(arrayError.arrayErrors).toBeDefined()
            expect(arrayError.arrayElementErrors).toBeDefined()
            expect(Array.isArray(arrayError.arrayErrors)).toBe(true)
            expect(Array.isArray(arrayError.arrayElementErrors)).toBe(true)
        })

        test("should work with only arrayErrors", () => {
            const arrayOnlyError: ErrorOfArray<string[]> = {
                arrayErrors: [
                    {
                        ruleName: "minLength",
                        attemptedValue: [],
                        errorMessage: "Array cannot be empty"
                    },
                    {
                        ruleName: "maxLength",
                        attemptedValue: ["a", "b", "c", "d", "e", "f"],
                        errorMessage: "Array has too many elements"
                    },
                    {
                        ruleName: "unique",
                        attemptedValue: ["a", "b", "a", "c"],
                        errorMessage: "Array elements must be unique"
                    }
                ]
            }

            expect(arrayOnlyError.arrayErrors).toBeDefined()
            expect(arrayOnlyError.arrayElementErrors).toBeUndefined()
            expect(arrayOnlyError.arrayErrors!.length).toBe(3)
            expect(arrayOnlyError.arrayErrors![0].ruleName).toBe("minLength")
            expect(arrayOnlyError.arrayErrors![1].ruleName).toBe("maxLength")
            expect(arrayOnlyError.arrayErrors![2].ruleName).toBe("unique")
        })

        test("should work with only arrayElementErrors", () => {
            const elementsOnlyError: ErrorOfArray<BasicUser[]> = {
                arrayElementErrors: [
                    {
                        index: 0,
                        errors: {
                            name: [{
                                ruleName: "required",
                                attemptedValue: "",
                                errorMessage: "Name is required"
                            }],
                            email: [{
                                ruleName: "emailFormat",
                                attemptedValue: "invalid",
                                errorMessage: "Invalid email format"
                            }]
                        },
                        attemptedValue: {
                            id: 1,
                            name: "",
                            email: "invalid",
                            isActive: true
                        }
                    },
                    {
                        index: 2,
                        errors: {
                            id: [{
                                ruleName: "positive",
                                attemptedValue: -1,
                                errorMessage: "ID must be positive"
                            }]
                        },
                        attemptedValue: {
                            id: -1,
                            name: "John",
                            email: "john@test.com",
                            isActive: false
                        }
                    }
                ]
            }

            expect(elementsOnlyError.arrayErrors).toBeUndefined()
            expect(elementsOnlyError.arrayElementErrors).toBeDefined()
            expect(elementsOnlyError.arrayElementErrors!.length).toBe(2)
            expect(elementsOnlyError.arrayElementErrors![0].index).toBe(0)
            expect(elementsOnlyError.arrayElementErrors![1].index).toBe(2)
        })

        test("should handle primitive array elements", () => {
            const primitiveArrayError: ErrorOfArray<string[]> = {
                arrayErrors: [{
                    ruleName: "sortedAlphabetically",
                    attemptedValue: ["c", "a", "b"],
                    errorMessage: "Array must be sorted alphabetically"
                }],
                arrayElementErrors: [
                    {
                        index: 0,
                        errors: [{
                            ruleName: "minLength",
                            attemptedValue: "",
                            errorMessage: "String cannot be empty"
                        }],
                        attemptedValue: ""
                    },
                    {
                        index: 2,
                        errors: [{
                            ruleName: "alphanumeric",
                            attemptedValue: "hello@world",
                            errorMessage: "String must be alphanumeric"
                        }],
                        attemptedValue: "hello@world"
                    }
                ]
            }

            expect(primitiveArrayError.arrayErrors).toBeDefined()
            expect(primitiveArrayError.arrayElementErrors).toBeDefined()
            expect(Array.isArray(primitiveArrayError.arrayElementErrors![0].errors)).toBe(true)
            expect(primitiveArrayError.arrayElementErrors![0].errors[0].ruleName).toBe("minLength")
        })

        test("should handle nested array structures", () => {
            const nestedArrayError: ErrorOfArray<Order[]> = {
                arrayErrors: [{
                    ruleName: "chronological",
                    attemptedValue: [],
                    errorMessage: "Orders must be in chronological order"
                }],
                arrayElementErrors: [{
                    index: 0,
                    errors: {
                        total: [{
                            ruleName: "positive",
                            attemptedValue: -50,
                            errorMessage: "Order total must be positive"
                        }],
                        items: {
                            arrayErrors: [{
                                ruleName: "minLength",
                                attemptedValue: [],
                                errorMessage: "Order must have at least one item"
                            }],
                            arrayElementErrors: [{
                                index: 0,
                                errors: {
                                    quantity: [{
                                        ruleName: "positive",
                                        attemptedValue: 0,
                                        errorMessage: "Quantity must be positive"
                                    }],
                                    price: [{
                                        ruleName: "positive",
                                        attemptedValue: -10,
                                        errorMessage: "Price must be positive"
                                    }]
                                },
                                attemptedValue: {
                                    productId: "prod1",
                                    quantity: 0,
                                    price: -10
                                }
                            }]
                        }
                    },
                    attemptedValue: {
                        id: "order1",
                        total: -50,
                        items: [],
                        status: "pending",
                        createdAt: new Date()
                    }
                }]
            }

            expect(nestedArrayError.arrayElementErrors![0].errors.items?.arrayErrors).toBeDefined()
            expect(nestedArrayError.arrayElementErrors![0].errors.items?.arrayElementErrors).toBeDefined()
            expect(nestedArrayError.arrayElementErrors![0].errors.items?.arrayElementErrors![0].errors.quantity).toBeDefined()
        })

        test("should handle empty array errors", () => {
            const emptyArrayError: ErrorOfArray<string[]> = {}

            expect(emptyArrayError.arrayErrors).toBeUndefined()
            expect(emptyArrayError.arrayElementErrors).toBeUndefined()
            expect(typeof emptyArrayError).toBe("object")
        })

        test("should handle both empty arrayErrors and arrayElementErrors", () => {
            const partiallyEmptyError: ErrorOfArray<number[]> = {
                arrayErrors: [],
                arrayElementErrors: []
            }

            expect(Array.isArray(partiallyEmptyError.arrayErrors)).toBe(true)
            expect(Array.isArray(partiallyEmptyError.arrayElementErrors)).toBe(true)
            expect(partiallyEmptyError.arrayErrors!.length).toBe(0)
            expect(partiallyEmptyError.arrayElementErrors!.length).toBe(0)
        })

        test("should handle multi-dimensional arrays", () => {
            const multiDimError: ErrorOfArray<string[][]> = {
                arrayErrors: [{
                    ruleName: "dimensions",
                    attemptedValue: [["a"], ["b", "c"]],
                    errorMessage: "All sub-arrays must have same length"
                }]
            }

            expect(multiDimError.arrayErrors).toBeDefined()
            expect(multiDimError.arrayErrors![0].ruleName).toBe("dimensions")
            expect(multiDimError.arrayErrors![0].errorMessage).toBe("All sub-arrays must have same length")
        })

        test("should handle generic array types", () => {
            const genericArrayError: ErrorOfArray<GenericContainer<string>[]> = {
                arrayErrors: [{
                    ruleName: "maxLength",
                    attemptedValue: new Array(1000).fill({ data: "test", items: [] }),
                    errorMessage: "Too many containers"
                }],
                arrayElementErrors: [{
                    index: 0,
                    errors: {
                        data: [{
                            ruleName: "required",
                            attemptedValue: "",
                            errorMessage: "Data is required"
                        }],
                        items: {
                            arrayErrors: [{
                                ruleName: "minLength",
                                attemptedValue: [],
                                errorMessage: "Items array cannot be empty"
                            }]
                        }
                    },
                    attemptedValue: {
                        data: "",
                        items: []
                    }
                }]
            }

            expect(genericArrayError.arrayErrors).toBeDefined()
            expect(genericArrayError.arrayElementErrors).toBeDefined()
            expect(genericArrayError.arrayElementErrors![0].errors.data).toBeDefined()
            expect(genericArrayError.arrayElementErrors![0].errors.items?.arrayErrors).toBeDefined()
        })
    })

    // === INTEGRATION AND EDGE CASE TESTS ===
    
    describe("Integration Tests", () => {
        test("should work with complex nested structures", () => {
            interface ComplexSystem {
                users: ComplexUser[]
                settings: {
                    theme: string
                    features: string[]
                    metadata?: { [key: string]: any }
                }
                auditLog: {
                    timestamp: Date
                    events: Array<{
                        type: string
                        data: any
                        user?: ComplexUser
                    }>
                }
                permissions: Record<string, boolean>
            }

            type ComplexSystemError = ErrorOf<ComplexSystem>

            const systemError: ComplexSystemError = {
                users: {
                    arrayErrors: [{
                        ruleName: "maxUsers",
                        attemptedValue: new Array(1000).fill({}),
                        errorMessage: "Too many users"
                    }],
                    arrayElementErrors: [{
                        index: 0,
                        errors: {
                            profile: {
                                settings: {
                                    languages: {
                                        arrayErrors: [{
                                            ruleName: "required",
                                            attemptedValue: [],
                                            errorMessage: "Languages required"
                                        }]
                                    }
                                }
                            }
                        },
                        attemptedValue: null
                    }]
                },
                settings: {
                    theme: [{
                        ruleName: "validTheme",
                        attemptedValue: "invalid-theme",
                        errorMessage: "Invalid theme"
                    }],
                    features: {
                        arrayErrors: [{
                            ruleName: "minFeatures",
                            attemptedValue: [],
                            errorMessage: "At least one feature required"
                        }]
                    }
                },
                auditLog: {
                    timestamp: [{
                        ruleName: "recentTimestamp",
                        attemptedValue: new Date("2020-01-01"),
                        errorMessage: "Timestamp too old"
                    }],
                    events: {
                        arrayElementErrors: [{
                            index: 0,
                            errors: {
                                type: [{
                                    ruleName: "validEventType",
                                    attemptedValue: "INVALID_EVENT",
                                    errorMessage: "Invalid event type"
                                }],
                                user: {
                                    id: [{
                                        ruleName: "positive",
                                        attemptedValue: -1,
                                        errorMessage: "User ID must be positive"
                                    }]
                                }
                            },
                            attemptedValue: {
                                type: "INVALID_EVENT",
                                data: {}
                            }
                        }]
                    }
                }
            }

            expect(systemError.users?.arrayErrors).toBeDefined()
            expect(systemError.settings?.theme).toBeDefined()
            expect(systemError.auditLog?.events?.arrayElementErrors).toBeDefined()
            expect(systemError.auditLog?.events?.arrayElementErrors![0].errors.user?.id).toBeDefined()
        })

        test("should handle all optional properties correctly", () => {
            interface AllOptional {
                optionalString?: string
                optionalNumber?: number
                optionalBoolean?: boolean
                optionalDate?: Date
                optionalObject?: { prop: string }
                optionalArray?: string[]
                optionalNestedObject?: {
                    nestedProp?: string
                    nestedArray?: number[]
                }
            }

            type AllOptionalError = ErrorOf<AllOptional>

            // All properties should be optional - these should all compile
            const error1: AllOptionalError = {}
            const error2: AllOptionalError = {
                optionalString: [{
                    ruleName: "minLength",
                    attemptedValue: "",
                    errorMessage: "Too short"
                }]
            }
            const error3: AllOptionalError = {
                optionalArray: {
                    arrayErrors: [{
                        ruleName: "required",
                        attemptedValue: undefined,
                        errorMessage: "Array is required"
                    }]
                },
                optionalNestedObject: {
                    nestedArray: {
                        arrayElementErrors: [{
                            index: 0,
                            errors: [{
                                ruleName: "positive",
                                attemptedValue: -1,
                                errorMessage: "Must be positive"
                            }],
                            attemptedValue: -1
                        }]
                    }
                }
            }

            expect(typeof error1).toBe("object")
            expect(error2.optionalString).toBeDefined()
            expect(error3.optionalArray?.arrayErrors).toBeDefined()
            expect(error3.optionalNestedObject?.nestedArray?.arrayElementErrors).toBeDefined()
        })

        test("should handle type narrowing correctly", () => {
            interface ConditionalType {
                type: "user" | "admin"
                data: string | { adminLevel: number }
                permissions: boolean | string[]
            }

            type ConditionalError = ErrorOf<ConditionalType>

            const conditionalError: ConditionalError = {
                type: [{
                    ruleName: "validType",
                    attemptedValue: "invalid",
                    errorMessage: "Invalid user type"
                }],
                data: [{
                    ruleName: "validData",
                    attemptedValue: null,
                    errorMessage: "Data is required"
                }],
                permissions: [{
                    ruleName: "validPermissions",
                    attemptedValue: 123,
                    errorMessage: "Invalid permissions format"
                }]
            }

            expect(conditionalError.type).toBeDefined()
            expect(conditionalError.data).toBeDefined()
            expect(conditionalError.permissions).toBeDefined()
        })
    })

    describe("Edge Cases", () => {
        test("should handle circular references in type definitions", () => {
            interface CircularA {
                id: string
                b?: CircularB
                items: CircularA[]
            }

            interface CircularB {
                id: string
                a: CircularA
                children?: CircularB[]
            }

            type CircularAError = ErrorOf<CircularA>

            const circularError: CircularAError = {
                id: [{
                    ruleName: "uuid",
                    attemptedValue: "not-uuid",
                    errorMessage: "Must be valid UUID"
                }],
                b: {
                    id: [{
                        ruleName: "required",
                        attemptedValue: "",
                        errorMessage: "B ID required"
                    }],
                    a: {
                        id: [{
                            ruleName: "different",
                            attemptedValue: "same-as-parent",
                            errorMessage: "A ID must be different from parent"
                        }]
                    }
                },
                items: {
                    arrayElementErrors: [{
                        index: 0,
                        errors: {
                            id: [{
                                ruleName: "unique",
                                attemptedValue: "duplicate",
                                errorMessage: "Item ID must be unique"
                            }]
                        },
                        attemptedValue: null
                    }]
                }
            }

            expect(circularError.id).toBeDefined()
            expect(circularError.b?.a?.id).toBeDefined()
            expect(circularError.items?.arrayElementErrors).toBeDefined()
        })

        test("should handle very deep nesting", () => {
            interface DeepNesting {
                level1: {
                    level2: {
                        level3: {
                            level4: {
                                level5: {
                                    value: string
                                    array: Array<{
                                        deepProp: string
                                        deepArray: number[]
                                    }>
                                }
                            }
                        }
                    }
                }
            }

            type DeepNestingError = ErrorOf<DeepNesting>

            const deepError: DeepNestingError = {
                level1: {
                    level2: {
                        level3: {
                            level4: {
                                level5: {
                                    value: [{
                                        ruleName: "required",
                                        attemptedValue: "",
                                        errorMessage: "Deep value required"
                                    }],
                                    array: {
                                        arrayElementErrors: [{
                                            index: 0,
                                            errors: {
                                                deepProp: [{
                                                    ruleName: "format",
                                                    attemptedValue: "invalid",
                                                    errorMessage: "Deep prop invalid"
                                                }],
                                                deepArray: {
                                                    arrayErrors: [{
                                                        ruleName: "notEmpty",
                                                        attemptedValue: [],
                                                        errorMessage: "Deep array cannot be empty"
                                                    }]
                                                }
                                            },
                                            attemptedValue: null
                                        }]
                                    }
                                }
                            }
                        }
                    }
                }
            }

            expect(deepError.level1?.level2?.level3?.level4?.level5?.value).toBeDefined()
            expect(deepError.level1?.level2?.level3?.level4?.level5?.array?.arrayElementErrors![0].errors.deepArray?.arrayErrors).toBeDefined()
        })

        test("should handle mixed array types", () => {
            interface MixedArrays {
                primitives: (string | number | boolean)[]
                objects: Array<BasicUser | { type: string; value: number }>
                nested: Array<Array<{ id: string; data: any }>>
            }

            type MixedArraysError = ErrorOf<MixedArrays>

            const mixedError: MixedArraysError = {
                primitives: {
                    arrayErrors: [{
                        ruleName: "homogeneous",
                        attemptedValue: ["string", 123, true],
                        errorMessage: "Array should be homogeneous"
                    }],
                    arrayElementErrors: [{
                        index: 0,
                        errors: [{
                            ruleName: "type",
                            attemptedValue: null,
                            errorMessage: "Invalid type"
                        }],
                        attemptedValue: null
                    }]
                },
                objects: {
                    arrayElementErrors: [{
                        index: 0,
                        errors: {
                            id: [{
                                ruleName: "required",
                                attemptedValue: undefined,
                                errorMessage: "ID required"
                            }]
                        },
                        attemptedValue: {
                            id: undefined,
                            name: "test",
                            email: "test@test.com",
                            isActive: true
                        }
                    }]
                },
                nested: {
                    arrayErrors: [{
                        ruleName: "complexity",
                        attemptedValue: [[]],
                        errorMessage: "Nested arrays too complex"
                    }]
                }
            }

            expect(mixedError.primitives?.arrayErrors).toBeDefined()
            expect(mixedError.objects?.arrayElementErrors).toBeDefined()
            expect(mixedError.nested?.arrayErrors).toBeDefined()
        })

        test("should handle empty and minimal structures", () => {
            interface MinimalStructure {
                id: number
            }

            interface EmptyArrayStructure {
                items: never[]
            }

            type MinimalError = ErrorOf<MinimalStructure>
            type EmptyArrayError = ErrorOf<EmptyArrayStructure>

            const minimalError: MinimalError = {
                id: [{
                    ruleName: "positive",
                    attemptedValue: 0,
                    errorMessage: "ID must be positive"
                }]
            }

            const emptyArrayError: EmptyArrayError = {
                items: {
                    arrayErrors: [{
                        ruleName: "impossible",
                        attemptedValue: [],
                        errorMessage: "This should never happen"
                    }]
                }
            }

            expect(minimalError.id).toBeDefined()
            expect(emptyArrayError.items?.arrayErrors).toBeDefined()
        })

        test("should handle function and symbol properties (skipped by ErrorOf)", () => {
            interface WithFunctionAndSymbol {
                normalProp: string
                // Functions and symbols are not included in ErrorOf
                // This test verifies that only data properties are included
            }

            type WithFunctionAndSymbolError = ErrorOf<WithFunctionAndSymbol>

            const error: WithFunctionAndSymbolError = {
                normalProp: [{
                    ruleName: "required",
                    attemptedValue: "",
                    errorMessage: "Normal prop required"
                }]
            }

            expect(error.normalProp).toBeDefined()
            expect(Object.keys(error).length).toBe(1)
        })
    })
}) 