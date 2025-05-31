/**
 * This test pretends to be service layer that validates requests.
 * So there is no service in this scenario, this test is the service itself.
 */

import { ValidationResult } from "../../../../Validator"
import { createEcommerceContext } from "./ecommerceContext"
import { OrderRequest } from "./services/repositories/orderRepository"
import { ProductRequest } from "./services/repositories/productRepository"
import { User, UserType } from "./services/repositories/userRepository"
import { LoginRequest } from "./services/validations/loginValidationService"
import { ALLOWED_USER_TYPES, RegistrationRequest } from "./services/validations/registrationValidationService"

const {
    userRepository,
    registrationValidationService,
    loginValidationService,
    productValidationService,
    productRepository,
    orderValidationService,
    orderRepository,
} = createEcommerceContext([], [], [])

/**
 * REGISTRATION FLOW
 */
describe("Reza try to register, unwillingly.", () => {
    it("Reza will get errors.", async () => {
        let rezaRegistration: RegistrationRequest = {
            fullName: "Reza",
            email: "reza@fakeemailandfalse",
            password: "weak",
            confirmPassword: "not weak",
            userType: "customer"
        }

        const actual = await registrationValidationService.validateAsync(rezaRegistration)

        const expected: ValidationResult<RegistrationRequest> = {
            isValid: false,
            message: "error",
            errors: {
                email: [
                    {
                        errorMessage: "Invalid email address. The valid email example: john.doe@example.com.",
                        attemptedValue: "reza@fakeemailandfalse",
                        ruleName: "emailAddress"
                    }
                ],
                password: [
                    {
                        errorMessage: "Should contain a number, capital letter, at least 8 chars min and special char.",
                        attemptedValue: "weak",
                        ruleName: "strongPasswordRule"
                    }
                ],
                confirmPassword: [
                    {
                        errorMessage: "Password must match.",
                        attemptedValue: "not weak",
                        ruleName: "equalToPropertyValue"
                    }
                ]
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("Reza realize that he needs to at least provide correct format of emails etc, based on the errors he got previously.", () => {
    it("Reza still got error, because the password he entered unmatch.", async () => {
        let rezaRegistration: RegistrationRequest = {
            fullName: "Not Reza",
            email: "notreza@fakeemailbutsuccess.com",
            password: "Passwword123!", // <= double w causes failing.
            confirmPassword: "Password123!",
            userType: "customer"
        }

        const actual = await registrationValidationService.validateAsync(rezaRegistration)

        const expected: ValidationResult<RegistrationRequest> = {
            isValid: false,
            message: "error",
            errors: {
                confirmPassword: [
                    {
                        errorMessage: "Password must match.",
                        attemptedValue: "Password123!",
                        ruleName: "equalToPropertyValue"
                    }
                ]
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("Reza get mad, but now he carefully enter the password.", () => {
    it("Reza successfuly do the registration.", async () => {
        let rezaRegistration: RegistrationRequest = {
            fullName: "Not Reza",
            email: "notreza@fakeemailbutsuccess.com",
            password: "Password123!",
            confirmPassword: "Password123!",
            userType: "customer"
        }

        const actual = await registrationValidationService.validateAsync(rezaRegistration)

        const expected: ValidationResult<RegistrationRequest> = {
            isValid: true,
            message: "ok",
        }

        const user: User = {
            email: rezaRegistration.email,
            fullName: rezaRegistration.fullName,
            password: rezaRegistration.password,
            userType: rezaRegistration.userType
        }

        await userRepository.addUserAsync(user)

        expect(actual).toEqual(expected)
    })
})

describe("Anjar also register, he tries to register with the same Reza's email address .", () => {
    it("Anjar failed to register, and he went away.", async () => {

        let anjarRegistration: RegistrationRequest = {
            fullName: "Someone",
            email: "notreza@fakeemailbutsuccess.com",
            password: "Password123!",
            confirmPassword: "Password123!",
            userType: "customer"
        }

        const actual = await registrationValidationService.validateAsync(anjarRegistration)

        const expected: ValidationResult<RegistrationRequest> = {
            isValid: false,
            message: "error",
            errors: {
                email: [
                    {
                        errorMessage: `The email ${anjarRegistration.email} has been registered.`,
                        attemptedValue: anjarRegistration.email,
                        ruleName: "uniqueEmailRule"
                    }
                ]
            }
        }
        expect(actual).toEqual(expected)
    })
})

describe("Anjar comeback to register, he tried to be a hacker, and try to register as super admin.", () => {
    it("Anjar failed to register, because there is such thing as super admin", async () => {

        let anjarRegistration: RegistrationRequest = {
            fullName: "Some one you dont know",
            email: "some@gmail.com",
            password: "Password123!",
            confirmPassword: "Password123!",
            userType: "superAdmin" as UserType // Anjar tries to hack this
        }

        const actual = await registrationValidationService.validateAsync(anjarRegistration)

        const expected: ValidationResult<RegistrationRequest> = {
            isValid: false,
            message: "error",
            errors: {
                userType: [
                    {
                        errorMessage: `Invalid user types ${anjarRegistration.userType}. Allowed types ${ALLOWED_USER_TYPES.join(" ")}.`,
                        attemptedValue: anjarRegistration.userType,
                        ruleName: "validUserTypeRule"
                    }
                ]
            }
        }
        expect(actual).toEqual(expected)
    })
})

describe("Dwi wants to be a tenant.", () => {
    it("Dwi successfully register as tenant", async () => {

        let dwiRegistration: RegistrationRequest = {
            fullName: "Sport Shop",
            email: "dwi@gmail.com",
            password: "Password123!",
            confirmPassword: "Password123!",
            userType: "tenant"
        }

        const actual = await registrationValidationService.validateAsync(dwiRegistration)

        const expected: ValidationResult<RegistrationRequest> = {
            isValid: true,
            message: "ok"
        }
        expect(actual).toEqual(expected)

        const user: User = {
            email: dwiRegistration.email,
            fullName: dwiRegistration.fullName,
            password: dwiRegistration.password,
            userType: dwiRegistration.userType
        }

        await userRepository.addUserAsync(user)

        expect(actual).toEqual(expected)
    })
})

/**
 * LOGIN FLOW
 */
describe("Reza do login", () => {
    it("Failed to logged in, because front end bug, the form sent empty data to server", async () => {

        let rezaLogin: LoginRequest = {
            email: "",
            password: "",
        }

        const actual = await loginValidationService.validateAsync(rezaLogin)

        const expected: ValidationResult<LoginRequest> = {
            isValid: false,
            message: "error",
            errors: {
                email: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: "required"
                    },
                    {
                        errorMessage: "Invalid email address. The valid email example: john.doe@example.com.",
                        attemptedValue: "",
                        ruleName: "emailAddress"
                    }
                ],
                password: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: "required"
                    }
                ]
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("Reza do login with incorrect email address", () => {
    it("failed due to invalid email address", async () => {

        let rezaLogin: LoginRequest = {
            email: "notreza@fakeemailbutsuccess.co", // <= .co should be .com
            password: "Password123!",
        }

        const actual = await loginValidationService.validateAsync(rezaLogin)

        const expected: ValidationResult<LoginRequest> = {
            isValid: false,
            message: "error",
            errors: {
                email: [
                    {
                        errorMessage: `${rezaLogin.email} is not registered.`,
                        attemptedValue: rezaLogin.email,
                        ruleName: "preventUnregisteredEmailRule"
                    }
                ],
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("Reza do login and success", () => {
    it("success", async () => {
        let rezaLogin: LoginRequest = {
            email: "notreza@fakeemailbutsuccess.com",
            password: "Password123!",
        }

        const loginValidationResult = await loginValidationService.validateAsync(rezaLogin)

        const expectedLoginValidationResult: ValidationResult<LoginRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(loginValidationResult).toEqual(expectedLoginValidationResult)

        const user = await userRepository.getUserAsync(rezaLogin.email)

        expect(user).not.toBeUndefined()
        expect(user).not.toBeNull()
        expect(user.password).toEqual(rezaLogin.password)
    })
})

// PRODUCT FLOW
describe("Reza do login and create product.", () => {
    it("Failed, he's not a tenant, he's a customer", async () => {

        // LOGIN
        let rezaLogin: LoginRequest = {
            email: "notreza@fakeemailbutsuccess.com",
            password: "Password123!",
        }

        const loginValidationResult = await loginValidationService.validateAsync(rezaLogin)

        const expectedLoginValidationResult: ValidationResult<LoginRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(loginValidationResult).toEqual(expectedLoginValidationResult)

        const user = await userRepository.getUserAsync(rezaLogin.email)

        expect(user).not.toBeUndefined()
        expect(user).not.toBeNull()
        expect(user.password).toEqual(rezaLogin.password)
        expect(user.userType).toEqual("customer")

        // PRODUCT CREATE TEST
        const productRequest: ProductRequest = {
            userEmail: user.email,
            productName: "not product",
            prices: []
        }

        const productValidationResult = await productValidationService.validateAsync(productRequest)
        const expectedProductValidationResult: ValidationResult<ProductRequest> = {
            isValid: false,
            message: "error",
            errors: {
                userEmail: [
                    {
                        errorMessage: "User is not allowed to create product.",
                        attemptedValue: user.email,
                        ruleName: "userCanCreateProductRule"
                    }
                ],
                prices: {
                    arrayErrors: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: [],
                            ruleName: "required"
                        },
                        {
                            errorMessage: "Product has to be at least having 1 price.",
                            attemptedValue: [],
                            ruleName: "arrayMinLen"
                        }
                    ]
                }
            }
        }
        expect(productValidationResult).toEqual(expectedProductValidationResult)
    })
})

describe("Attempt1: Dwi login and create product.", () => {
    it("Failed because product requirement incomplete.", async () => {

        // LOGIN
        let dwi: LoginRequest = {
            email: "dwi@gmail.com",
            password: "Password123!",
        }

        // login assert
        const loginValidationResult = await loginValidationService.validateAsync(dwi)
        const expectedLoginValidationResult: ValidationResult<LoginRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(loginValidationResult).toEqual(expectedLoginValidationResult)

        // user assert
        const user = await userRepository.getUserAsync(dwi.email)

        expect(user).not.toBeUndefined()
        expect(user).not.toBeNull()
        expect(user.password).toEqual(dwi.password)
        expect(user.userType).toEqual("tenant")

        // PRODUCT CREATE TEST
        const productRequest: ProductRequest = {
            userEmail: user.email,
            productName: "",
            prices: []
        }

        const productValidationResult = await productValidationService.validateAsync(productRequest)
        const expectedProductValidationResult: ValidationResult<ProductRequest> = {
            isValid: false,
            message: "error",
            errors: {
                productName: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: "required"
                    },
                    {
                        errorMessage: "Product name should be at least 3 chars",
                        attemptedValue: "",
                        ruleName: "stringMinLen"
                    }
                ],
                prices: {
                    arrayErrors: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: [],
                            ruleName: "required"
                        },
                        {
                            errorMessage: "Product has to be at least having 1 price.",
                            attemptedValue: [],
                            ruleName: "arrayMinLen"
                        }
                    ]
                }
            }
        }
        expect(productValidationResult).toEqual(expectedProductValidationResult)
    })
})


describe("Attempt2: Dwi login and create product.", () => {
    it("Failed caused by product price and level errors", async () => {

        // LOGIN
        let dwi: LoginRequest = {
            email: "dwi@gmail.com",
            password: "Password123!",
        }

        // login assert
        const loginValidationResult = await loginValidationService.validateAsync(dwi)
        const expectedLoginValidationResult: ValidationResult<LoginRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(loginValidationResult).toEqual(expectedLoginValidationResult)

        // user assert
        const user = await userRepository.getUserAsync(dwi.email)

        expect(user).not.toBeUndefined()
        expect(user).not.toBeNull()
        expect(user.password).toEqual(dwi.password)
        expect(user.userType).toEqual("tenant")

        // PRODUCT CREATE TEST
        const productRequest: ProductRequest = {
            userEmail: user.email,
            productName: "Basketball T-Shirt",
            prices: [
                {
                    level: 0,
                    price: 0
                },
                {
                    level: 2,
                    price: 2
                }
            ]
        }

        const productValidationResult = await productValidationService.validateAsync(productRequest)
        const expectedProductValidationResult: ValidationResult<ProductRequest> = {
            isValid: false,
            message: "error",
            errors: {
                prices: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            validatedObject: {
                                level: 0,
                                price: 0
                            },
                            errors: {
                                level: [
                                    {
                                        errorMessage: "Product level is a non 0 and positive number.",
                                        attemptedValue: 0,
                                        ruleName: "minNumber"
                                    }
                                ],
                                price: [
                                    {
                                        errorMessage: "Minimum price is at least $1.",
                                        attemptedValue: 0,
                                        ruleName: "minNumber"
                                    }
                                ],
                            }
                        },
                        {
                            index: 1,
                            validatedObject: {
                                level: 2,
                                price: 2
                            },
                            errors: {
                                level: [
                                    {
                                        errorMessage: "Price level should be sequential. And the current price level should be: 1, but got 2",
                                        attemptedValue: 2,
                                        ruleName: "sequentialPriceLevelRule"
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        }
        expect(productValidationResult).toEqual(expectedProductValidationResult)
    })
})

describe("Attempt3: Dwi login and create product.", () => {
    it("Failed: Product level sequence is incorrect", async () => {

        // LOGIN
        let dwi: LoginRequest = {
            email: "dwi@gmail.com",
            password: "Password123!",
        }

        // login assert
        const loginValidationResult = await loginValidationService.validateAsync(dwi)
        const expectedLoginValidationResult: ValidationResult<LoginRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(loginValidationResult).toEqual(expectedLoginValidationResult)

        // user assert
        const user = await userRepository.getUserAsync(dwi.email)

        expect(user).not.toBeUndefined()
        expect(user).not.toBeNull()
        expect(user.password).toEqual(dwi.password)
        expect(user.userType).toEqual("tenant")

        // PRODUCT CREATE TEST
        const productRequest: ProductRequest = {
            userEmail: user.email,
            productName: "Basketball T-Shirt",
            prices: [
                {
                    level: 1,
                    price: 1
                },
                {
                    level: 2,
                    price: 1
                },
                {
                    level: 4,
                    price: 1
                }
            ]
        }

        const productValidationResult = await productValidationService.validateAsync(productRequest)
        const expectedProductValidationResult: ValidationResult<ProductRequest> = {
            isValid: false,
            message: "error",
            errors: {
                prices: {
                    arrayElementErrors: [
                        {
                            index: 2,
                            validatedObject: {
                                level: 4,
                                price: 1
                            },
                            errors: {
                                level: [
                                    {
                                        errorMessage: "Price level should be sequential. And the current price level should be: 3, but got 4",
                                        attemptedValue: 4,
                                        ruleName: "sequentialPriceLevelRule"
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        }
        expect(productValidationResult).toEqual(expectedProductValidationResult)
    })
})

describe("Attempt4: Dwi login and create product.", () => {
    it("Failed: Product level duplicate", async () => {

        // LOGIN
        let dwi: LoginRequest = {
            email: "dwi@gmail.com",
            password: "Password123!",
        }

        // login assert
        const loginValidationResult = await loginValidationService.validateAsync(dwi)
        const expectedLoginValidationResult: ValidationResult<LoginRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(loginValidationResult).toEqual(expectedLoginValidationResult)

        // user assert
        const user = await userRepository.getUserAsync(dwi.email)

        expect(user).not.toBeUndefined()
        expect(user).not.toBeNull()
        expect(user.password).toEqual(dwi.password)
        expect(user.userType).toEqual("tenant")

        // PRODUCT CREATE TEST
        const productRequest: ProductRequest = {
            userEmail: user.email,
            productName: "Basketball T-Shirt",
            prices: [
                {
                    level: 1,
                    price: 1
                },
                {
                    level: 1,
                    price: 1
                },
                {
                    level: 4,
                    price: 1
                }
            ]
        }

        const productValidationResult = await productValidationService.validateAsync(productRequest)
        const expectedProductValidationResult: ValidationResult<ProductRequest> = {
            isValid: false,
            message: "error",
            errors: {
                prices: {
                    arrayErrors: [
                        {
                            errorMessage: "Duplicate price 1 and level 1. At index 0.",
                            attemptedValue: productRequest.prices,
                            ruleName: "noDuplicatePriceLevelRule"
                        }
                    ],
                    arrayElementErrors: [
                        {
                            index: 1,
                            validatedObject: {
                                level: 1,
                                price: 1
                            },
                            errors: {
                                level: [
                                    {
                                        errorMessage: "Price level should be sequential. And the current price level should be: 2, but got 1",
                                        attemptedValue: 1,
                                        ruleName: "sequentialPriceLevelRule"
                                    }
                                ]
                            }
                        },
                        {
                            index: 2,
                            validatedObject: {
                                level: 4,
                                price: 1
                            },
                            errors: {
                                level: [
                                    {
                                        errorMessage: "Price level should be sequential. And the current price level should be: 2, but got 4",
                                        attemptedValue: 4,
                                        ruleName: "sequentialPriceLevelRule"
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        }
        expect(productValidationResult).toEqual(expectedProductValidationResult)
    })
})

describe("Attempt5: Dwi login and create product.", () => {
    it("Successfully added 3 new products", async () => {

        // LOGIN
        let dwi: LoginRequest = {
            email: "dwi@gmail.com",
            password: "Password123!",
        }

        // login assert
        const loginValidationResult = await loginValidationService.validateAsync(dwi)
        const expectedLoginValidationResult: ValidationResult<LoginRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(loginValidationResult).toEqual(expectedLoginValidationResult)

        // user assert
        const user = await userRepository.getUserAsync(dwi.email)

        expect(user).not.toBeUndefined()
        expect(user).not.toBeNull()
        expect(user.password).toEqual(dwi.password)
        expect(user.userType).toEqual("tenant")

        // PRODUCT CREATE TEST
        const productRequests: ProductRequest[] = [
            {
                userEmail: user.email,
                productName: "Basketball T-Shirt",
                prices: [
                    {
                        level: 1,
                        price: 1
                    },
                    {
                        level: 2,
                        price: 1
                    },
                    {
                        level: 3,
                        price: 1
                    }
                ]
            },
            {
                userEmail: user.email,
                productName: "Justeen Bieber Hat",
                prices: [
                    {
                        level: 1,
                        price: 100
                    },
                    {
                        level: 2,
                        price: 200 // expensive as h
                    }
                ]
            },
            {
                userEmail: user.email,
                productName: "Gibson Electric Guitar, why is this in a sport shop?",
                prices: [
                    {
                        level: 1,
                        price: 1100
                    }
                ]
            }
        ]

        for (let index = 0; index < productRequests.length; index++) {
            const productRequest = productRequests[index];
            const productValidationResult = await productValidationService.validateAsync(productRequest)
            const expectedProductValidationResult: ValidationResult<ProductRequest> = {
                isValid: true,
                message: "ok",
            }
            expect(productValidationResult).toEqual(expectedProductValidationResult)

            await productRepository.addProductAsync(productRequest)
        }
        const products = await productRepository.listProductsAsync()
        expect(products).toBeDefined()
        expect(products.length).toEqual(3)
    })
})

// ORDER
describe("Attempt1: Reza Create an Order", () => {
    it("Fail caused by incomplete order info", async () => {
        // LOGIN
        let rezaLogin: LoginRequest = {
            email: "notreza@fakeemailbutsuccess.com",
            password: "Password123!",
        }

        const loginValidationResult = await loginValidationService.validateAsync(rezaLogin)

        const expectedLoginValidationResult: ValidationResult<LoginRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(loginValidationResult).toEqual(expectedLoginValidationResult)

        const user = await userRepository.getUserAsync(rezaLogin.email)

        expect(user).not.toBeUndefined()
        expect(user).not.toBeNull()

        const orderDate = new Date().toISOString() as any as Date

        // ORDER
        const orderRequest: OrderRequest = {
            orderDate: orderDate, // Fails isDateObject rule
            userEmail: "",
            customer: {
                fullName: user.fullName,
                email: user.email,
            },
            orderItems: [],
            totalAmount: 0,
            gst: 0,
        }

        const orderValidationResult = await orderValidationService.validateAsync(orderRequest)

        const expectedOrderValidationResult: ValidationResult<OrderRequest> = {
            isValid: false,
            message: "error",
            errors: {
                orderDate: [
                    {
                        errorMessage: "This field is not a valid date, type of value was: string.",
                        attemptedValue: orderDate,
                        ruleName: "isDateObject"
                    }
                ],
                orderItems: {
                    arrayErrors: [
                        {
                            errorMessage: "Please add at least an item",
                            attemptedValue: [],
                            ruleName: "required"
                        }
                    ]
                },
                totalAmount: [
                    {
                        errorMessage: "The minimum value for this field is 1.",
                        attemptedValue: 0,
                        ruleName: "minNumber"
                    }
                ],
                userEmail: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: "required"
                    },
                    {
                        errorMessage: "Invalid email address. The valid email example: john.doe@example.com.",
                        attemptedValue: "",
                        ruleName: "emailAddress"
                    }
                ]

            }
        }

        expect(orderValidationResult).toEqual(expectedOrderValidationResult)
    })
})

describe("Attempt2: Reza Create an Order", () => {
    it(" Incomplete order item", async () => {
        // LOGIN
        let rezaLogin: LoginRequest = {
            email: "notreza@fakeemailbutsuccess.com",
            password: "Password123!",
        }

        const loginValidationResult = await loginValidationService.validateAsync(rezaLogin)

        const expectedLoginValidationResult: ValidationResult<LoginRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(loginValidationResult).toEqual(expectedLoginValidationResult)

        const user = await userRepository.getUserAsync(rezaLogin.email)

        expect(user).not.toBeUndefined()
        expect(user).not.toBeNull()

        // ORDER  
        let orderRequest: OrderRequest = {
            orderDate: new Date(), // Fails isDateObject rule
            userEmail: user.email,
            customer: {
                fullName: user.fullName,
                email: user.email,
            },
            orderItems: [
                {
                    productId: 0,
                    price: 0,
                    qty: 0,
                    amount: 0,
                    discountAmount: 0,
                    discountPercentage: 0,
                    subtotal: 0,
                }
            ],
            totalAmount: 0,
            gst: 0,
        }

        const totalAmount = orderRequest.orderItems.reduce((sum, item) => sum + item.amount, 0)
        const gst = totalAmount * 0.1

        orderRequest.totalAmount = totalAmount
        orderRequest.gst = gst

        const orderValidationResult = await orderValidationService.validateAsync(orderRequest)

        const expectedOrderValidationResult: ValidationResult<OrderRequest> = {
            isValid: false,
            message: "error",
            errors: {
                orderItems: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                productId: [
                                    {
                                        errorMessage: "Product id 0 is invalid.",
                                        attemptedValue: 0,
                                        ruleName: "isValidProductRule"
                                    }
                                ],
                                qty: [
                                    {
                                        errorMessage: "The minimum value for this field is 1.",
                                        attemptedValue: 0,
                                        ruleName: "minNumber"
                                    }
                                ],
                                amount: [
                                    {
                                        errorMessage: "The minimum value for this field is 1.",
                                        attemptedValue: 0,
                                        ruleName: "minNumber"
                                    }
                                ],
                                price: [
                                    {
                                        errorMessage: "The minimum value for this field is 1.",
                                        attemptedValue: 0,
                                        ruleName: "minNumber"
                                    }
                                ],
                                subtotal: [
                                    {
                                        errorMessage: "The minimum value for this field is 1.",
                                        attemptedValue: 0,
                                        ruleName: "minNumber"
                                    }
                                ]
                            },
                            validatedObject: {
                                productId: 0,
                                price: 0,
                                qty: 0,
                                amount: 0,
                                discountAmount: 0,
                                discountPercentage: 0,
                                subtotal: 0
                            }
                        }
                    ]
                },
                totalAmount: [
                    {
                        errorMessage: "The minimum value for this field is 1.",
                        attemptedValue: 0,
                        ruleName: "minNumber"
                    }
                ],
            }
        }

        expect(orderValidationResult).toEqual(expectedOrderValidationResult)
    })
})

describe("Attempt2: Reza Create an Order", () => {
    it("Failed: Incomplete order item", async () => {
        // LOGIN
        let rezaLogin: LoginRequest = {
            email: "notreza@fakeemailbutsuccess.com",
            password: "Password123!",
        }

        const loginValidationResult = await loginValidationService.validateAsync(rezaLogin)

        const expectedLoginValidationResult: ValidationResult<LoginRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(loginValidationResult).toEqual(expectedLoginValidationResult)

        const user = await userRepository.getUserAsync(rezaLogin.email)

        expect(user).not.toBeUndefined()
        expect(user).not.toBeNull()

        // ORDER
        const products = await productRepository.listProductsAsync()
        const firstProduct = products[0]
        const productPriceLevel1 = firstProduct.prices[0]

        let orderRequest: OrderRequest = {
            orderDate: new Date(), // Fails isDateObject rule
            userEmail: user.email,
            customer: {
                fullName: user.fullName,
                email: user.email,
            },
            orderItems: [
                {
                    productId: firstProduct.id,
                    qty: 100,
                    price: productPriceLevel1.price,
                    amount: 0,
                    discountPercentage: 40,
                    discountAmount: 0,
                    subtotal: 0
                }
            ],
            totalAmount: 0,
            gst: 0,
        }

        orderRequest.orderItems = orderRequest.orderItems.map(orderItem => {
            orderItem.amount = orderItem.qty * orderItem.price
            orderItem.discountAmount = orderItem.amount * (orderItem.discountPercentage / 100)
            orderItem.subtotal = orderItem.amount - orderItem.discountAmount
            return orderItem
        })

        const totalAmount = orderRequest.orderItems.reduce((sum, item) => sum + item.amount, 0)
        const gst = totalAmount * 0.1

        orderRequest.totalAmount = totalAmount
        orderRequest.gst = gst

        const orderValidationResult = await orderValidationService.validateAsync(orderRequest)

        const expectedOrderValidationResult: ValidationResult<OrderRequest> = {
            isValid: false,
            message: "error",
            errors: {
                orderItems: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                qty: [
                                    {
                                        errorMessage: "The maximum value for this field is 10.",
                                        attemptedValue: 100,
                                        ruleName: "maxNumber"
                                    }
                                ],
                                discountPercentage: [
                                    {
                                        errorMessage: "Can't be more than 30 percent of discount. Our boss is watching.",
                                        attemptedValue: 40,
                                        ruleName: "maxNumber"
                                    }
                                ]
                            },
                            validatedObject: {
                                productId: firstProduct.id,
                                qty: 100,
                                price: productPriceLevel1.price,
                                amount: 100,
                                discountPercentage: 40,
                                discountAmount: 40,
                                subtotal: 60
                            }
                        }
                    ]
                },
            }
        }

        expect(orderValidationResult).toEqual(expectedOrderValidationResult)
    })
})

describe("Attempt3: Reza Create an Order", () => {
    it("Success", async () => {
        // LOGIN
        let rezaLogin: LoginRequest = {
            email: "notreza@fakeemailbutsuccess.com",
            password: "Password123!",
        }

        const loginValidationResult = await loginValidationService.validateAsync(rezaLogin)

        const expectedLoginValidationResult: ValidationResult<LoginRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(loginValidationResult).toEqual(expectedLoginValidationResult)

        const user = await userRepository.getUserAsync(rezaLogin.email)

        expect(user).not.toBeUndefined()
        expect(user).not.toBeNull()

        // ORDER
        const products = await productRepository.listProductsAsync()
        const firstProduct = products[0]
        const productPriceLevel1 = firstProduct.prices[0]

        let orderRequest: OrderRequest = {
            orderDate: new Date(), // Fails isDateObject rule
            userEmail: user.email,
            customer: {
                fullName: user.fullName,
                email: user.email,
            },
            orderItems: [
                {
                    productId: firstProduct.id,
                    qty: 10,
                    price: productPriceLevel1.price,
                    amount: 0,
                    discountPercentage: 30,
                    discountAmount: 0,
                    subtotal: 0
                }
            ],
            totalAmount: 0,
            gst: 0,
        }

        orderRequest.orderItems = orderRequest.orderItems.map(orderItem => {
            orderItem.amount = orderItem.qty * orderItem.price
            orderItem.discountAmount = orderItem.amount * (orderItem.discountPercentage / 100)
            orderItem.subtotal = orderItem.amount - orderItem.discountAmount
            return orderItem
        })

        const totalAmount = orderRequest.orderItems.reduce((sum, item) => sum + item.amount, 0)
        const gst = totalAmount * 0.1

        orderRequest.totalAmount = totalAmount
        orderRequest.gst = gst

        const orderValidationResult = await orderValidationService.validateAsync(orderRequest)

        const expectedOrderValidationResult: ValidationResult<OrderRequest> = {
            isValid: true,
            message: "ok",
        }

        expect(orderValidationResult).toEqual(expectedOrderValidationResult)

        await orderRepository.addOrderAsync(orderRequest)

        const orders = await orderRepository.listOrdersAsync()
    })
})