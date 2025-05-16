
/**
 * This test pretends to be service layer that validates requests.
 * So there is no service in this scenario, this test is the service itself.
 */

import { ValidationResult } from "../../../../validant"
import { createEcommerceContext } from "./ecommerceContext"
import { ProductRequest } from "./services/repositories/productRepository"
import { User, UserType } from "./services/repositories/userRepository"
import { LoginRequest } from "./services/validations/loginValidationService"
import { ALLOWED_USER_TYPES, RegistrationRequest } from "./services/validations/registrationValidationService"

const {
    userRepository,
    registrationValidationService,
    loginValidationService,
    productValidationService,
    productRepository
} = createEcommerceContext([], [])

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
                email: ["Invalid email address. The valid email example: john.doe@example.com."],
                password: ["Should contain a number, capital letter, at least 8 chars min and special char."],
                confirmPassword: ["Password must match."]
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
                confirmPassword: ["Password must match."]
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
                email: [`The email ${anjarRegistration.email} has been registered.`]
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
                userType: [`Invalid user types ${anjarRegistration.userType}. Allowed types ${ALLOWED_USER_TYPES.join(" ")}.`]
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
                email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."],
                password: ["This field is required."]
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
                email: [`${rezaLogin.email} is not registered.`],
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
                userEmail: ["User is not allowed to create product."],
                prices: {
                    errors: ["This field is required.", "Product has to be at least having 1 price."]
                }
            }
        }
        expect(productValidationResult).toEqual(expectedProductValidationResult)
    })
})

describe("Attempt2: Dwi login and create product.", () => {
    it("Failed", async () => {

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
                productName: ["This field is required.", "Product name should be at least 3 chars"],
                prices: {
                    errors: ["This field is required.", "Product has to be at least having 1 price."]
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
                    errorsEach: [
                        {
                            index: 0,
                            validatedObject: {
                                level: 0,
                                price: 0
                            },
                            errors: {
                                level: ["Product level is a non 0 and positive number."],
                                price: ["Minimum price is at least $1."],
                            }
                        },
                        {
                            index: 1,
                            validatedObject: {
                                level: 2,
                                price: 2
                            },
                            errors: {
                                level: ["Price level should be sequential. And the current price level should be: 1, but got 2"]
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
                    errorsEach: [
                        {
                            index: 2,
                            validatedObject: {
                                level: 4,
                                price: 1
                            },
                            errors: {
                                level: ["Price level should be sequential. And the current price level should be: 3, but got 4"]
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
                    errors: ["Duplicate price 1 and level 1. At index 0."],
                    errorsEach: [
                        {
                            index: 1,
                            validatedObject: {
                                level: 1,
                                price: 1
                            },
                            errors: {
                                level: ["Price level should be sequential. And the current price level should be: 2, but got 1"]
                            }
                        },
                        {
                            index: 2,
                            validatedObject: {
                                level: 4,
                                price: 1
                            },
                            errors: {
                                level: ["Price level should be sequential. And the current price level should be: 2, but got 4"]
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
    it("Success", async () => {

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