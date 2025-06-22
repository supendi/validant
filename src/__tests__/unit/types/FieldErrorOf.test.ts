import { RuleViolation } from "../../../types/ValidationRule"
import { ErrorOf, ErrorOfArray, PossiblyUndefined } from "../../../types/ErrorOf"
import { FieldErrors, FieldErrorOf } from "../../../types/FieldErrorOf"

describe("FieldErrorOf Type System", () => {
    
    // Test data interfaces
    interface User {
        id: number
        name: string
        email: string
        age?: number
        isActive: boolean
    }

    interface UserProfile {
        bio: string
        avatar?: string
        preferences: {
            theme: string
            language: string
            notifications: boolean
        }
        metadata?: {
            lastLogin: Date
            loginCount: number
        }
    }

    interface Order {
        id: string
        userId: number
        total: number
        status: 'pending' | 'completed' | 'cancelled'
        createdAt: Date
        updatedAt?: Date
        items: OrderItem[]
        tags?: string[]
    }

    interface OrderItem {
        productId: string
        productName: string
        quantity: number
        price: number
        discount?: number
    }

    // Mock data for testing
    const mockRuleViolation: RuleViolation = {
        ruleName: "required",
        attemptedValue: null,
        errorMessage: "Field is required"
    }

    const mockValidationErrors: RuleViolation[] = [
        mockRuleViolation,
        {
            ruleName: "minLength",
            attemptedValue: "a",
            errorMessage: "Minimum length is 3 characters"
        },
        {
            ruleName: "pattern",
            attemptedValue: "invalid@format",
            errorMessage: "Invalid format"
        }
    ]

    describe("FieldErrors Type Mapping", () => {
        test("should map primitive string fields to RuleViolation[]", () => {
            type NameErrors = FieldErrors<User, 'name'>
            type EmailErrors = FieldErrors<User, 'email'>
            
            const nameErrors: NameErrors = mockValidationErrors
            const emailErrors: EmailErrors = [mockRuleViolation]
            
            expect(Array.isArray(nameErrors)).toBe(true)
            expect(Array.isArray(emailErrors)).toBe(true)
            expect(nameErrors).toHaveLength(3)
            expect(emailErrors).toHaveLength(1)
            
            nameErrors.forEach(error => {
                expect(error).toHaveProperty('ruleName')
                expect(error).toHaveProperty('attemptedValue')
                expect(error).toHaveProperty('errorMessage')
                expect(typeof error.ruleName).toBe('string')
                expect(typeof error.errorMessage).toBe('string')
            })
        })

        test("should map primitive number fields to RuleViolation[]", () => {
            type IdErrors = FieldErrors<User, 'id'>
            type AgeErrors = FieldErrors<User, 'age'>
            
            const idErrors: IdErrors = [{
                ruleName: "minNumber",
                attemptedValue: -1,
                errorMessage: "ID must be positive"
            }]
            
            const ageErrors: AgeErrors = [{
                ruleName: "range",
                attemptedValue: 150,
                errorMessage: "Age must be between 0 and 120"
            }]
            
            expect(Array.isArray(idErrors)).toBe(true)
            expect(Array.isArray(ageErrors)).toBe(true)
            expect(idErrors[0].attemptedValue).toBe(-1)
            expect(ageErrors[0].attemptedValue).toBe(150)
        })

        test("should map primitive boolean fields to RuleViolation[]", () => {
            type IsActiveErrors = FieldErrors<User, 'isActive'>
            
            const isActiveErrors: IsActiveErrors = [{
                ruleName: "required",
                attemptedValue: undefined,
                errorMessage: "Active status is required"
            }]
            
            expect(Array.isArray(isActiveErrors)).toBe(true)
            expect(isActiveErrors[0].attemptedValue).toBeUndefined()
        })

        test("should map Date fields to RuleViolation[]", () => {
            type CreatedAtErrors = FieldErrors<Order, 'createdAt'>
            type UpdatedAtErrors = FieldErrors<Order, 'updatedAt'>
            
            const createdAtErrors: CreatedAtErrors = [{
                ruleName: "dateFormat",
                attemptedValue: "invalid-date",
                errorMessage: "Invalid date format"
            }]
            
            const updatedAtErrors: UpdatedAtErrors = [{
                ruleName: "futureDate",
                attemptedValue: new Date(2025, 0, 1),
                errorMessage: "Date cannot be in the future"
            }]
            
            expect(Array.isArray(createdAtErrors)).toBe(true)
            expect(Array.isArray(updatedAtErrors)).toBe(true)
            expect(createdAtErrors[0].attemptedValue).toBe("invalid-date")
            expect(updatedAtErrors[0].attemptedValue).toBeInstanceOf(Date)
        })

        test("should map object fields to structured ErrorOf", () => {
            type PreferencesErrors = FieldErrors<UserProfile, 'preferences'>
            type MetadataErrors = FieldErrors<UserProfile, 'metadata'>
            
            const preferencesErrors: PreferencesErrors = {
                theme: [{
                    ruleName: "elementOf",
                    attemptedValue: "invalid-theme",
                    errorMessage: "Theme must be light or dark"
                }],
                language: [{
                    ruleName: "language",
                    attemptedValue: "xx",
                    errorMessage: "Invalid language code"
                }],
                notifications: [{
                    ruleName: "required",
                    attemptedValue: undefined,
                    errorMessage: "Notification preference is required"
                }]
            }
            
            const metadataErrors: MetadataErrors = {
                lastLogin: [{
                    ruleName: "pastDate",
                    attemptedValue: new Date(2025, 0, 1),
                    errorMessage: "Last login cannot be in the future"
                }],
                loginCount: [{
                    ruleName: "minNumber",
                    attemptedValue: -1,
                    errorMessage: "Login count cannot be negative"
                }]
            }
            
            expect(typeof preferencesErrors).toBe('object')
            expect(typeof metadataErrors).toBe('object')
            expect(Array.isArray(preferencesErrors.theme)).toBe(true)
            expect(Array.isArray(metadataErrors.lastLogin)).toBe(true)
            expect(preferencesErrors.theme![0].ruleName).toBe("elementOf")
            expect(metadataErrors.loginCount![0].attemptedValue).toBe(-1)
        })

        test("should map object array fields to ErrorOfArray", () => {
            type ItemsErrors = FieldErrors<Order, 'items'>
            
            const itemsErrors: ItemsErrors = {
                arrayErrors: [{
                    ruleName: "arrayMinLen",
                    attemptedValue: [],
                    errorMessage: "At least one item is required"
                }],
                arrayElementErrors: [
                    {
                        index: 0,
                        errors: {
                            productId: [{
                                ruleName: "required",
                                attemptedValue: "",
                                errorMessage: "Product ID is required"
                            }],
                            quantity: [{
                                ruleName: "minNumber",
                                attemptedValue: 0,
                                errorMessage: "Quantity must be at least 1"
                            }],
                            price: [{
                                ruleName: "minNumber",
                                attemptedValue: -10,
                                errorMessage: "Price cannot be negative"
                            }]
                        },
                        attemptedValue: {
                            productId: "",
                            productName: "Test Product",
                            quantity: 0,
                            price: -10
                        }
                    },
                    {
                        index: 1,
                        errors: {
                            productName: [{
                                ruleName: "maxLength",
                                attemptedValue: "Very long product name that exceeds maximum length limit",
                                errorMessage: "Product name is too long"
                            }]
                        },
                        attemptedValue: null
                    }
                ]
            }
            
            expect(typeof itemsErrors).toBe('object')
            expect(Array.isArray(itemsErrors.arrayErrors)).toBe(true)
            expect(Array.isArray(itemsErrors.arrayElementErrors)).toBe(true)
            expect(itemsErrors.arrayErrors![0].ruleName).toBe("arrayMinLen")
            expect(itemsErrors.arrayElementErrors![0].index).toBe(0)
            expect(itemsErrors.arrayElementErrors![0].errors.productId![0].ruleName).toBe("required")
            expect(itemsErrors.arrayElementErrors![1].index).toBe(1)
            expect(itemsErrors.arrayElementErrors![1].attemptedValue).toBeNull()
        })

        test("should handle union type fields", () => {
            type StatusErrors = FieldErrors<Order, 'status'>
            
            const statusErrors: StatusErrors = [{
                ruleName: "elementOf",
                attemptedValue: "invalid-status",
                errorMessage: "Status must be pending, completed, or cancelled"
            }]
            
            expect(Array.isArray(statusErrors)).toBe(true)
            expect(statusErrors[0].attemptedValue).toBe("invalid-status")
        })

        test("should handle optional fields", () => {
            type AgeErrors = FieldErrors<User, 'age'>
            type UpdatedAtErrors = FieldErrors<Order, 'updatedAt'>
            type AvatarErrors = FieldErrors<UserProfile, 'avatar'>
            
            const ageErrors: AgeErrors = []
            const updatedAtErrors: UpdatedAtErrors = []
            const avatarErrors: AvatarErrors = []
            
            expect(Array.isArray(ageErrors)).toBe(true)
            expect(Array.isArray(updatedAtErrors)).toBe(true)
            expect(Array.isArray(avatarErrors)).toBe(true)
        })
    })

    describe("FieldErrorOf Interface Structure", () => {
        test("should create valid field error for primitive fields", () => {
            type NameFieldError = FieldErrorOf<User, 'name'>
            type EmailFieldError = FieldErrorOf<User, 'email'>
            
            const nameError: NameFieldError = {
                isValid: false,
                fieldName: 'name',
                errors: [
                    {
                        ruleName: "required",
                        attemptedValue: "",
                        errorMessage: "Name is required"
                    },
                    {
                        ruleName: "minLength",
                        attemptedValue: "Jo",
                        errorMessage: "Name must be at least 3 characters"
                    }
                ]
            }
            
            const emailValid: EmailFieldError = {
                isValid: true,
                fieldName: 'email'
            }
            
            expect(nameError.isValid).toBe(false)
            expect(nameError.fieldName).toBe('name')
            expect(nameError.errors).toHaveLength(2)
            expect(nameError.errors![0]).toHaveProperty('ruleName')
            expect(nameError.errors![0]).toHaveProperty('attemptedValue')
            expect(nameError.errors![0]).toHaveProperty('errorMessage')
            
            expect(emailValid.isValid).toBe(true)
            expect(emailValid.fieldName).toBe('email')
            expect(emailValid.errors).toBeUndefined()
        })

        test("should create valid field error for Date fields", () => {
            type CreatedAtFieldError = FieldErrorOf<Order, 'createdAt'>
            
            const createdAtError: CreatedAtFieldError = {
                isValid: false,
                fieldName: 'createdAt',
                errors: [
                    {
                        ruleName: "required",
                        attemptedValue: null,
                        errorMessage: "Creation date is required"
                    },
                    {
                        ruleName: "dateFormat",
                        attemptedValue: "2023-13-40",
                        errorMessage: "Invalid date format"
                    }
                ]
            }
            
            expect(createdAtError.isValid).toBe(false)
            expect(createdAtError.fieldName).toBe('createdAt')
            expect(Array.isArray(createdAtError.errors)).toBe(true)
            expect(createdAtError.errors![0].ruleName).toBe("required")
            expect(createdAtError.errors![1].attemptedValue).toBe("2023-13-40")
        })

        test("should create valid field error for object fields", () => {
            type PreferencesFieldError = FieldErrorOf<UserProfile, 'preferences'>
            
            const preferencesError: PreferencesFieldError = {
                isValid: false,
                fieldName: 'preferences',
                errors: {
                    theme: [{
                        ruleName: "elementOf",
                        attemptedValue: "neon",
                        errorMessage: "Theme must be light or dark"
                    }],
                    language: [{
                        ruleName: "required",
                        attemptedValue: "",
                        errorMessage: "Language is required"
                    }],
                    notifications: [{
                        ruleName: "isBool",
                        attemptedValue: "yes",
                        errorMessage: "Notifications must be true or false"
                    }]
                }
            }
            
            expect(preferencesError.isValid).toBe(false)
            expect(preferencesError.fieldName).toBe('preferences')
            expect(typeof preferencesError.errors).toBe('object')
            expect(preferencesError.errors?.theme![0].ruleName).toBe("elementOf")
            expect(preferencesError.errors?.language![0].attemptedValue).toBe("")
            expect(preferencesError.errors?.notifications![0].errorMessage).toBe("Notifications must be true or false")
        })

        test("should create valid field error for object array fields", () => {
            type ItemsFieldError = FieldErrorOf<Order, 'items'>
            
            const itemsError: ItemsFieldError = {
                isValid: false,
                fieldName: 'items',
                errors: {
                    arrayErrors: [
                        {
                            ruleName: "arrayMinLen",
                            attemptedValue: [],
                            errorMessage: "Order must have at least one item"
                        },
                        {
                            ruleName: "arrayMaxLen",
                            attemptedValue: new Array(101).fill({}),
                            errorMessage: "Order cannot have more than 100 items"
                        }
                    ],
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                productId: [{
                                    ruleName: "required",
                                    attemptedValue: null,
                                    errorMessage: "Product ID is required"
                                }],
                                quantity: [{
                                    ruleName: "minNumber",
                                    attemptedValue: 0,
                                    errorMessage: "Quantity must be positive"
                                }],
                                price: [{
                                    ruleName: "minNumber",
                                    attemptedValue: -5.99,
                                    errorMessage: "Price cannot be negative"
                                }],
                                discount: [{
                                    ruleName: "maxNumber",
                                    attemptedValue: 1.5,
                                    errorMessage: "Discount cannot exceed 100%"
                                }]
                            },
                            attemptedValue: {
                                productId: null,
                                productName: "Invalid Item",
                                quantity: 0,
                                price: -5.99,
                                discount: 1.5
                            }
                        }
                    ]
                }
            }
            
            expect(itemsError.isValid).toBe(false)
            expect(itemsError.fieldName).toBe('items')
            expect(itemsError.errors?.arrayErrors).toHaveLength(2)
            expect(itemsError.errors?.arrayElementErrors).toHaveLength(1)
            expect(itemsError.errors?.arrayElementErrors![0].index).toBe(0)
            expect(itemsError.errors?.arrayElementErrors![0].errors.productId![0].ruleName).toBe("required")
            expect(itemsError.errors?.arrayElementErrors![0].attemptedValue?.quantity).toBe(0)
        })

        test("should handle optional object fields", () => {
            type MetadataFieldError = FieldErrorOf<UserProfile, 'metadata'>
            
            const metadataError: MetadataFieldError = {
                isValid: false,
                fieldName: 'metadata',
                errors: {
                    lastLogin: [{
                        ruleName: "pastDate",
                        attemptedValue: new Date(2025, 5, 15),
                        errorMessage: "Last login cannot be in the future"
                    }]
                }
            }
            
            const metadataValid: MetadataFieldError = {
                isValid: true,
                fieldName: 'metadata'
            }
            
            expect(metadataError.fieldName).toBe('metadata')
            expect(metadataError.errors?.lastLogin![0].ruleName).toBe("pastDate")
            expect(metadataValid.isValid).toBe(true)
            expect(metadataValid.errors).toBeUndefined()
        })
    })

    describe("Edge Cases and Complex Scenarios", () => {
        test("should handle deeply nested object structures", () => {
            interface DeepNested {
                level1: {
                    level2: {
                        level3: {
                            value: string
                            date: Date
                            nested: {
                                deep: number
                            }
                        }
                    }
                }
            }
            
            type Level1FieldError = FieldErrorOf<DeepNested, 'level1'>
            
            const deepError: Level1FieldError = {
                isValid: false,
                fieldName: 'level1',
                errors: {
                    level2: {
                        level3: {
                            value: [{
                                ruleName: "required",
                                attemptedValue: "",
                                errorMessage: "Value is required"
                            }],
                            date: [{
                                ruleName: "dateFormat",
                                attemptedValue: "invalid",
                                errorMessage: "Invalid date"
                            }],
                            nested: {
                                deep: [{
                                    ruleName: "minNumber",
                                    attemptedValue: -1,
                                    errorMessage: "Must be positive"
                                }]
                            }
                        }
                    }
                }
            }
            
            expect(deepError.isValid).toBe(false)
            expect(deepError.fieldName).toBe('level1')
            expect(deepError.errors?.level2?.level3?.value![0].ruleName).toBe("required")
            expect(deepError.errors?.level2?.level3?.nested?.deep![0].attemptedValue).toBe(-1)
        })

        test("should handle mixed array types in complex objects", () => {
            interface ComplexOrder {
                id: string
                metadata: {
                    tags: string[]
                    categories: { id: number, name: string }[]
                    history: {
                        timestamp: Date
                        action: string
                        details: {
                            changes: { field: string, oldValue: any, newValue: any }[]
                        }
                    }[]
                }
            }
            
            type MetadataFieldError = FieldErrorOf<ComplexOrder, 'metadata'>
            
            const complexError: MetadataFieldError = {
                isValid: false,
                fieldName: 'metadata',
                errors: {
                    categories: {
                        arrayErrors: [{
                            ruleName: "arrayMinLen",
                            attemptedValue: [],
                            errorMessage: "At least one category required"
                        }],
                        arrayElementErrors: [{
                            index: 0,
                            errors: {
                                id: [{
                                    ruleName: "minNumber",
                                    attemptedValue: 0,
                                    errorMessage: "Category ID must be positive"
                                }],
                                name: [{
                                    ruleName: "required",
                                    attemptedValue: "",
                                    errorMessage: "Category name is required"
                                }]
                            },
                            attemptedValue: { id: 0, name: "" }
                        }]
                    },
                    history: {
                        arrayElementErrors: [{
                            index: 0,
                            errors: {
                                timestamp: [{
                                    ruleName: "required",
                                    attemptedValue: null,
                                    errorMessage: "Timestamp is required"
                                }],
                                details: {
                                    changes: {
                                        arrayElementErrors: [{
                                            index: 0,
                                            errors: {
                                                field: [{
                                                    ruleName: "required",
                                                    attemptedValue: "",
                                                    errorMessage: "Field name is required"
                                                }]
                                            },
                                            attemptedValue: { field: "", oldValue: null, newValue: null }
                                        }]
                                    }
                                }
                            },
                            attemptedValue: null
                        }]
                    }
                }
            }
            
            expect(complexError.fieldName).toBe('metadata')
            expect(complexError.errors?.categories?.arrayElementErrors![0].errors.id![0].attemptedValue).toBe(0)
            expect(complexError.errors?.history?.arrayElementErrors![0].errors.details?.changes?.arrayElementErrors![0].errors.field![0].ruleName).toBe("required")
        })

        test("should handle empty error states", () => {
            type NameFieldError = FieldErrorOf<User, 'name'>
            
            const validField: NameFieldError = {
                isValid: true,
                fieldName: 'name'
            }
            
            const emptyErrors: NameFieldError = {
                isValid: false,
                fieldName: 'name',
                errors: []
            }
            
            expect(validField.isValid).toBe(true)
            expect(validField.errors).toBeUndefined()
            expect(emptyErrors.isValid).toBe(false)
            expect(emptyErrors.errors).toHaveLength(0)
        })

        test("should handle null and undefined attempted values", () => {
            type NameFieldError = FieldErrorOf<User, 'name'>
            
            const nullError: NameFieldError = {
                isValid: false,
                fieldName: 'name',
                errors: [
                    {
                        ruleName: "required",
                        attemptedValue: null,
                        errorMessage: "Name cannot be null"
                    },
                    {
                        ruleName: "required",
                        attemptedValue: undefined,
                        errorMessage: "Name cannot be undefined"
                    }
                ]
            }
            
            expect(nullError.errors![0].attemptedValue).toBeNull()
            expect(nullError.errors![1].attemptedValue).toBeUndefined()
        })

        test("should handle various data types as attempted values", () => {
            interface TypeTest {
                stringField: string
                numberField: number
                booleanField: boolean
                dateField: Date
                objectField: { nested: string }
                arrayField: string[]
            }
            
            type StringFieldError = FieldErrorOf<TypeTest, 'stringField'>
            type NumberFieldError = FieldErrorOf<TypeTest, 'numberField'>
            type BooleanFieldError = FieldErrorOf<TypeTest, 'booleanField'>
            type DateFieldError = FieldErrorOf<TypeTest, 'dateField'>
            type ObjectFieldError = FieldErrorOf<TypeTest, 'objectField'>
            type ArrayFieldError = FieldErrorOf<TypeTest, 'arrayField'>
            
            const stringError: StringFieldError = {
                isValid: false,
                fieldName: 'stringField',
                errors: [{
                    ruleName: "isString",
                    attemptedValue: 123,
                    errorMessage: "Must be a string"
                }]
            }
            
            const numberError: NumberFieldError = {
                isValid: false,
                fieldName: 'numberField',
                errors: [{
                    ruleName: "isNumber",
                    attemptedValue: "not a number",
                    errorMessage: "Must be a number"
                }]
            }
            
            const booleanError: BooleanFieldError = {
                isValid: false,
                fieldName: 'booleanField',
                errors: [{
                    ruleName: "isBool",
                    attemptedValue: "true",
                    errorMessage: "Must be a boolean"
                }]
            }
            
            const dateError: DateFieldError = {
                isValid: false,
                fieldName: 'dateField',
                errors: [{
                    ruleName: "isDate",
                    attemptedValue: "2023-01-01",
                    errorMessage: "Must be a Date object"
                }]
            }
            
            const objectError: ObjectFieldError = {
                isValid: false,
                fieldName: 'objectField',
                errors: {
                    nested: [{
                        ruleName: "required",
                        attemptedValue: null,
                        errorMessage: "Nested value is required"
                    }]
                }
            }
            
            const arrayError: ArrayFieldError = {
                isValid: false,
                fieldName: 'arrayField',
                errors: {
                    arrayErrors: [{
                        ruleName: "isArray",
                        attemptedValue: "not an array",
                        errorMessage: "Must be an array"
                    }]
                }
            }
            
            expect(stringError.errors![0].attemptedValue).toBe(123)
            expect(numberError.errors![0].attemptedValue).toBe("not a number")
            expect(booleanError.errors![0].attemptedValue).toBe("true")
            expect(dateError.errors![0].attemptedValue).toBe("2023-01-01")
            expect(objectError.errors?.nested![0].attemptedValue).toBeNull()
            expect(arrayError.errors?.arrayErrors![0].attemptedValue).toBe("not an array")
        })
    })

    describe("Type Safety and Constraints", () => {
        test("should enforce correct field name types", () => {
            type UserFieldError = FieldErrorOf<User, 'name'>
            type OrderFieldError = FieldErrorOf<Order, 'total'>
            
            const userError: UserFieldError = {
                isValid: false,
                fieldName: 'name', // Must be 'name', not any other string
                errors: [mockRuleViolation]
            }
            
            const orderError: OrderFieldError = {
                isValid: false,
                fieldName: 'total', // Must be 'total', not any other string
                errors: [mockRuleViolation]
            }
            
            expect(userError.fieldName).toBe('name')
            expect(orderError.fieldName).toBe('total')
        })

        test("should maintain type consistency between field name and errors", () => {
            type NameFieldError = FieldErrorOf<User, 'name'>
            type PreferencesFieldError = FieldErrorOf<UserProfile, 'preferences'>
            type ItemsFieldError = FieldErrorOf<Order, 'items'>
            
            const nameError: NameFieldError = {
                isValid: false,
                fieldName: 'name',
                errors: mockValidationErrors // Must be RuleViolation[] for primitive field
            }
            
            const preferencesError: PreferencesFieldError = {
                isValid: false,
                fieldName: 'preferences',
                errors: { // Must be structured ErrorOf for object field
                    theme: [mockRuleViolation],
                    language: [mockRuleViolation],
                    notifications: [mockRuleViolation]
                }
            }
            
            const itemsError: ItemsFieldError = {
                isValid: false,
                fieldName: 'items',
                errors: { // Must be ErrorOfArray for array field
                    arrayErrors: [mockRuleViolation],
                    arrayElementErrors: [{
                        index: 0,
                        errors: {
                            productId: [mockRuleViolation],
                            quantity: [mockRuleViolation]
                        },
                        attemptedValue: null
                    }]
                }
            }
            
            expect(Array.isArray(nameError.errors)).toBe(true)
            expect(typeof preferencesError.errors).toBe('object')
            expect(typeof itemsError.errors).toBe('object')
            expect(Array.isArray(itemsError.errors?.arrayErrors)).toBe(true)
        })
    })

    describe("Real-world Integration Scenarios", () => {
        test("should work with form validation scenarios", () => {
            interface LoginForm {
                username: string
                password: string
                rememberMe: boolean
                captcha?: string
            }
            
            type UsernameError = FieldErrorOf<LoginForm, 'username'>
            type PasswordError = FieldErrorOf<LoginForm, 'password'>
            type RememberMeError = FieldErrorOf<LoginForm, 'rememberMe'>
            type CaptchaError = FieldErrorOf<LoginForm, 'captcha'>
            
            const formErrors = {
                username: {
                    isValid: false,
                    fieldName: 'username' as const,
                    errors: [
                        {
                            ruleName: "required",
                            attemptedValue: "",
                            errorMessage: "Username is required"
                        },
                        {
                            ruleName: "minLength",
                            attemptedValue: "ab",
                            errorMessage: "Username must be at least 3 characters"
                        }
                    ]
                } as UsernameError,
                
                password: {
                    isValid: false,
                    fieldName: 'password' as const,
                    errors: [
                        {
                            ruleName: "required",
                            attemptedValue: "",
                            errorMessage: "Password is required"
                        },
                        {
                            ruleName: "complexity",
                            attemptedValue: "simple",
                            errorMessage: "Password must contain uppercase, lowercase, and numbers"
                        }
                    ]
                } as PasswordError,
                
                rememberMe: {
                    isValid: true,
                    fieldName: 'rememberMe' as const
                } as RememberMeError,
                
                captcha: {
                    isValid: false,
                    fieldName: 'captcha' as const,
                    errors: [
                        {
                            ruleName: "captchaValidation",
                            attemptedValue: "wrong-captcha",
                            errorMessage: "Captcha verification failed"
                        }
                    ]
                } as CaptchaError
            }
            
            expect(formErrors.username.errors).toHaveLength(2)
            expect(formErrors.password.errors).toHaveLength(2)
            expect(formErrors.rememberMe.isValid).toBe(true)
            expect(formErrors.captcha.errors![0].ruleName).toBe("captchaValidation")
        })

        test("should work with API response validation scenarios", () => {
            interface ApiResponse {
                success: boolean
                data: {
                    users: User[]
                    pagination: {
                        page: number
                        total: number
                        hasNext: boolean
                    }
                }
                errors?: string[]
                timestamp: Date
            }
            
            type DataFieldError = FieldErrorOf<ApiResponse, 'data'>
            
            const apiValidationError: DataFieldError = {
                isValid: false,
                fieldName: 'data',
                errors: {
                    users: {
                        arrayErrors: [{
                            ruleName: "arrayMinLen",
                            attemptedValue: [],
                            errorMessage: "At least one user is required"
                        }],
                        arrayElementErrors: [{
                            index: 0,
                            errors: {
                                id: [{
                                    ruleName: "minNumber",
                                    attemptedValue: 0,
                                    errorMessage: "User ID must be positive"
                                }],
                                email: [{
                                    ruleName: "emailAddress",
                                    attemptedValue: "invalid-email",
                                    errorMessage: "Invalid email format"
                                }]
                            },
                            attemptedValue: {
                                id: 0,
                                name: "Test User",
                                email: "invalid-email",
                                isActive: true
                            }
                        }]
                    },
                    pagination: {
                        page: [{
                            ruleName: "minNumber",
                            attemptedValue: 0,
                            errorMessage: "Page must be at least 1"
                        }],
                        total: [{
                            ruleName: "minNumber",
                            attemptedValue: -1,
                            errorMessage: "Total cannot be negative"
                        }]
                    }
                }
            }
            
            expect(apiValidationError.errors?.users?.arrayElementErrors![0].errors.email![0].ruleName).toBe("emailAddress")
            expect(apiValidationError.errors?.pagination?.page![0].attemptedValue).toBe(0)
        })
    })
}) 