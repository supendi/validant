import { objectValidator, maxSumOf } from "../../index"
import { ValidationResult, ValidationRule } from "../../types"
import { elementOf, emailAddress, maxNumber, arrayMinLen, required, minNumber } from "../../propertyValidators"
import { propertyValidator } from "../../propertyValidators/propertyValidator"
import { minSumOf } from "../../propertyValidators/minSumOf"

const defaultMessage = { okMessage: "Good to go.", errorMessage: "One or more validation errors occurred." }

describe("Validator Simple Person Test", () => {
    it("Person name should return errors", () => {
        interface SimplePerson {
            name: string
        }

        const rule: ValidationRule<SimplePerson> = {
            name: [required()]
        }

        const person: SimplePerson = {
            name: "",
        }

        const actual = objectValidator.validate(person, rule)

        const expected: ValidationResult<SimplePerson> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                name: ["This field is required."]
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("Validator Account Object Test", () => {
    it("Should return errors", () => {
        interface Account {
            name: string,
            age: number,
            email: string
        }

        const validationRule: ValidationRule<Account> = {
            name: [required("Account name is required.")],
            age: [required(), minNumber(17, "Should be at least 17 years old.")],
            email: [required(), emailAddress("Invalid email address")]
        }

        const account: Account = {
            name: "",
            age: 0,
            email: ""
        }

        const actual = objectValidator.validate(account, validationRule)

        var expected = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["Account name is required."],
                age: ["This field is required.", "Should be at least 17 years old."],
                email: ["This field is required.", "Invalid email address"],
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("Validator Using Custom Validator", () => {
    it("Should return errors", () => {
        interface Account {
            name: string,
        }

        const validationRule: ValidationRule<Account> = {
            name: [
                // Name length minimum is 5 char
                propertyValidator((value, object) => {
                    return value.length >= 5
                }, "Name length minimum is 5 chars."),

                // Must contain A letter
                propertyValidator((value, object) => {
                    return value.toLocaleLowerCase().includes("a")
                }, "The name must contain the 'A' letter."),
            ],
        }

        const account: Account = {
            name: "John",
        }

        const validationResult = objectValidator.validate(account, validationRule)

        const expected = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["Name length minimum is 5 chars.", "The name must contain the 'A' letter."]
            }
        }

        expect(validationResult).toEqual(expected)
    })
})

describe("Validator Simple Person With Child Test", () => {
    it("Parent and child name should return errors", () => {
        interface SimplePerson {
            name: string
            child?: SimplePerson
        }

        const rule: ValidationRule<SimplePerson> = {
            name: [required()],
            child: {
                name: [required()]
            }
        }
        const parent: SimplePerson = {
            name: "",
            child: {
                name: "",
            }
        }

        const actual = objectValidator.validate(parent, rule)

        const expected: ValidationResult<SimplePerson> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                name: ["This field is required."],
                child: {
                    name: ["This field is required."],
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("Validator Nested Object Test with nested address", () => {
    it("Nested object test should return errors", () => {
        interface Continent {
            name: string
        }
        interface Country {
            name: string
            continent: Continent
        }
        interface City {
            name: string
            country: Country
        }
        interface Address {
            street: string,
            city: City
        }
        interface Person {
            name: string,
            age: number,
            child?: Person
            address?: Address
        }

        const rule: ValidationRule<Person> = {
            name: [required()],
            age: [minNumber(20)],
            address: {
                street: [required()],
                city: {
                    name: [required()],
                    country: {
                        name: [required()],
                        continent: {
                            name: [required()],
                        }
                    }
                }
            },
            child: {
                name: [required()]
            }
        }
        const john: Person = {
            name: "",
            age: 0,
            address: {
                street: "",
                city: {
                    name: "",
                    country: {
                        name: "",
                        continent: {
                            name: ""
                        }
                    }
                }
            },
            child: {
                name: "",
                age: 0,
            }
        }

        const actual = objectValidator.validate(john, rule)

        const expected: ValidationResult<Person> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                name: ["This field is required."],
                age: ["The minimum value for this field is 20."],
                address: {
                    street: ["This field is required."],
                    city: {
                        name: ["This field is required."],
                        country: {
                            name: ["This field is required."],
                            continent: {
                                name: ["This field is required."],
                            }
                        }
                    }
                },
                child: {
                    name: ["This field is required."],
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("Validator Nested Object Test with nested address", () => {
    it("Nested object test should return errors", () => {
        interface Person {
            name: string,
            age: number,
            child?: Person
            address?: {
                street: string,
                city: {
                    name: string
                    country: {
                        name: string
                        continent: {
                            name: string
                        }
                    }
                }
            }
        }

        const rule: ValidationRule<Person> = {
            name: [required()],
            age: [minNumber(20)],
            address: {
                street: [required()],
                city: {
                    name: [required()],
                    country: {
                        name: [required()],
                        continent: {
                            name: [required()],
                        }
                    }
                }
            },
            child: {
                name: [required()]
            }
        }
        const john: Person = {
            name: "",
            age: 0,
            address: {
                street: "",
                city: {
                    name: "",
                    country: {
                        name: "",
                        continent: {
                            name: ""
                        }
                    }
                }
            },
            child: {
                name: "",
                age: 0,
            }
        }

        const validationResult = objectValidator.validate(john, rule)

        const expected: ValidationResult<Person> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                name: ["This field is required."],
                age: ["The minimum value for this field is 20."],
                address: {
                    street: ["This field is required."],
                    city: {
                        name: ["This field is required."],
                        country: {
                            name: ["This field is required."],
                            continent: {
                                name: ["This field is required."],
                            }
                        }
                    }
                },
                child: {
                    name: ["This field is required."],
                }
            }
        }

        expect(validationResult).toEqual(expected)
    })
})


describe("Validator test with children array", () => {
    it("Children has to contain elementErrors", () => {
        interface Person {
            name?: string
            children?: Person[]
        }

        const rule: ValidationRule<Person> = {
            name: [required()],
        }

        rule.children = {
            validators: [arrayMinLen(1)],
            validationRule: rule
        }

        const person: Person = {
            name: "",
            children: [
                {
                    name: "",
                },
            ]
        }

        const actual = objectValidator.validate(person, rule)

        const expected: ValidationResult<Person> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                name: ["This field is required."],
                children: {
                    errorsEach: [
                        {
                            index: 0,
                            errors: {
                                name: ["This field is required."],
                            },
                            validatedObject: person.children ? person.children[0] : undefined
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})


describe("Validator test with children array", () => {
    it("Children has to contain errors", () => {
        interface Person {
            name?: string
            children?: Person[]
        }

        const rule: ValidationRule<Person> = {
            name: [required()],
        }

        rule.children = {
            validators: [arrayMinLen(2, "The minimum children is 2.")],
            validationRule: rule
        }

        const person: Person = {
            name: "",
            children: [
                {
                    name: "",
                    children: []
                }
            ]
        }

        const actual = objectValidator.validate(person, rule)

        const expected: ValidationResult<Person> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                name: ["This field is required."],
                children: {
                    errors: ["The minimum children is 2."],
                    errorsEach: [
                        {
                            index: 0,
                            errors: {
                                name: ["This field is required."],
                                children: {
                                    errors: ["The minimum children is 2."]
                                }
                            },
                            validatedObject: {
                                name: "",
                                children: []
                            }
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})


describe("Validator array test", () => {
    it("Has to contains errors", () => {
        interface Product {
            name?: string
            units?: Unit[]
        }

        interface Unit {
            name: string,
            conversion: number,
        }

        const validationRule: ValidationRule<Product> = {
            name: [required()],
            units: {
                validators: [arrayMinLen(3, "Product uom has to be at least 3 units.")],
                validationRule: {
                    name: [required()],
                    conversion: [minNumber(1)]
                }
            }
        }

        const ironStick: Product = {
            name: "",
            units: [
                {
                    name: "",
                    conversion: 0
                },
                {
                    name: "cm",
                    conversion: 0
                }
            ]
        }

        const validationResult = objectValidator.validate(ironStick, validationRule)

        const expected: ValidationResult<Product> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                name: ["This field is required."],
                units: {
                    errors: ["Product uom has to be at least 3 units."],
                    errorsEach: [
                        {
                            index: 0,
                            errors: {
                                name: ["This field is required."],
                                conversion: ["The minimum value for this field is 1."]
                            },
                            validatedObject: {
                                name: "",
                                conversion: 0
                            }
                        },
                        {
                            index: 1,
                            errors: {
                                conversion: ["The minimum value for this field is 1."]
                            },
                            validatedObject: {
                                name: "cm",
                                conversion: 0
                            }
                        }
                    ]
                }
            }
        }

        expect(validationResult).toEqual(expected)
    })
})

describe("Validator test with Order and Order item", () => {
    it("Validating order item approach 1", () => {
        interface Product {
            name: string
            price: number
            subProducts?: Product[]
        }

        interface Order {
            id: string
            orderNumber: string
            orderDate: Date | null
            orderItems: OrderItem[]
        }

        interface OrderItem {
            id: string
            orderId?: string
            productId: number
            product?: Product
            quantity: number
        }

        const rule: ValidationRule<Order> = {
            orderDate: [required()],
            orderNumber: [required()],
            orderItems: {
                validators: [arrayMinLen(1, "Please add at least one order item.")],
                validationRule: {
                    productId: [required()],
                    quantity: [minNumber(1)],
                }
            }
        }

        const newOrder1: Order = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            orderItems: []
        }

        const actual1 = objectValidator.validate(newOrder1, rule)
        const expected1: ValidationResult<Order> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                orderItems: {
                    errors: ["Please add at least one order item."],
                }
            }
        }
        expect(actual1).toEqual(expected1)


        const newOrder2: Order = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            orderItems: [
                {
                    id: "1",
                    orderId: "1",
                    productId: 0,
                    quantity: 0,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 0,
                    quantity: 1,
                },
            ]
        }

        const actual2 = objectValidator.validate(newOrder2, rule)
        const expected2: ValidationResult<Order> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                orderItems: {
                    errorsEach: [
                        {
                            index: 0,
                            errors: {
                                productId: ["This field is required."],
                                quantity: ["The minimum value for this field is 1."],
                            },
                            validatedObject: newOrder2.orderItems[0]
                        },
                        {
                            index: 1,
                            errors: {
                                productId: ["This field is required."],
                            },
                            validatedObject: newOrder2.orderItems[1]
                        }
                    ]
                }
            }
        }
        expect(actual2).toEqual(expected2)
    })
})

describe("Validator test with Order and Order item", () => {
    it("Validating order item approach 2, separate the validation rule", () => {
        interface Product {
            name: string
            price: number
            subProducts?: Product[]
        }

        interface Order {
            id: string
            orderNumber: string
            orderDate: Date | null
            orderItems: OrderItem[]
        }

        interface OrderItem {
            id: string
            orderId?: string
            productId: number
            product?: Product
            quantity: number
        }

        const rule: ValidationRule<Order> = {
            orderDate: [required()],
            orderNumber: [required()],
            orderItems: {
                validators: [arrayMinLen(3)],
                validationRule: {
                    productId: [required()],
                    quantity: [minNumber(1)],
                }
            }
        }

        const newOrder1: Order = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            orderItems: []
        }

        const newOrder2: Order = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            orderItems: [
                {
                    id: "1",
                    orderId: "1",
                    productId: 0,
                    quantity: 0,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 0,
                    quantity: 1,
                },
            ]
        }

        const actual1 = objectValidator.validate(newOrder1, rule)
        const expected1: ValidationResult<Order> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                orderItems: {
                    errors: ["The minimum length for this field is 3."],
                }
            }
        }
        expect(actual1).toEqual(expected1)

        const actual2 = objectValidator.validate(newOrder2, rule)
        const expected2: ValidationResult<Order> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                orderItems: {
                    errors: ["The minimum length for this field is 3."],
                    errorsEach: [
                        {
                            index: 0,
                            errors: {
                                productId: ["This field is required."],
                                quantity: ["The minimum value for this field is 1."],
                            },
                            validatedObject: newOrder2.orderItems[0]
                        },
                        {
                            index: 1,
                            errors: {
                                productId: ["This field is required."],
                            },
                            validatedObject: newOrder2.orderItems[1]
                        }
                    ]
                }
            }
        }
        expect(actual2).toEqual(expected2)
    })
})

describe("Validator complex validations", () => {
    it("Should return errors", () => {
        interface Product {
            name: string
            price: number
            subProducts?: Product[]
        }

        interface Customer {
            id: number
            name: string
            email: string
        }

        interface Order {
            id: string
            customer: Customer
            orderNumber: string
            orderDate: Date | null
            orderItems: OrderItem[]
        }

        interface OrderItem {
            id: string
            orderId?: string
            productId: number
            product?: Product
            quantity: number
        }

        const productIds = [1, 2, 3, 4, 5]
        const customerIds = [10, 11, 12, 13]

        const orderItemsRule: ValidationRule<OrderItem> = {
            productId: [required(), elementOf(productIds)],
            quantity: [minNumber(1), maxNumber(5)],
        }

        const rule: ValidationRule<Order> = {
            orderDate: [required()],
            orderNumber: [required()],
            customer: {
                id: [required(), elementOf(customerIds)],
                name: [required()],
                email: [required(), emailAddress()]
            },
            orderItems: {
                validators: [arrayMinLen(4), minSumOf("quantity", 100)],
                validationRule: orderItemsRule
            }
        }

        const newOrder1: Order = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            customer: {
                id: 1,
                email: "invalid",
                name: ""
            },
            orderItems: []
        }

        const actual1 = objectValidator.validate(newOrder1, rule)
        const expected1: ValidationResult<Order> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                customer: {
                    id: ["The value '1' is not the element of [10, 11, 12, 13]."],
                    email: ["Invalid email address. The valid email example: john.doe@example.com."],
                    name: ["This field is required."]
                },
                orderItems: {
                    errors: ["The minimum length for this field is 4.", "The minimum sum of quantity is 100.",],
                }
            }
        }

        expect(actual1).toEqual(expected1)

        const newOrder2: Order = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            customer: {
                id: 1,
                email: "",
                name: ""
            },
            orderItems: [
                {
                    id: "1",
                    orderId: "1",
                    productId: 0,
                    quantity: 0,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 5,
                    quantity: 5,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 6,
                    quantity: 12,
                },
            ]
        }
        const actual2 = objectValidator.validate(newOrder2, rule)
        const expected2: ValidationResult<Order> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                customer: {
                    id: ["The value '1' is not the element of [10, 11, 12, 13]."],
                    email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."],
                    name: ["This field is required."]
                },
                orderItems: {
                    errors: ["The minimum length for this field is 4.", "The minimum sum of quantity is 100.",],
                    errorsEach: [
                        {
                            index: 0,
                            errors: {
                                productId: ["This field is required.", "The value '0' is not the element of [1, 2, 3, 4, 5]."],
                                quantity: ["The minimum value for this field is 1.", "The maximum value for this field is 5."],
                            },
                            validatedObject: newOrder2.orderItems[0]
                        },
                        {
                            index: 2,
                            errors: {
                                productId: ["The value '6' is not the element of [1, 2, 3, 4, 5]."],
                                quantity: ["The maximum value for this field is 5."],
                            },
                            validatedObject: newOrder2.orderItems[2]
                        },
                    ]
                }
            }
        }
        expect(actual2).toEqual(expected2)
    })
})



describe("Validator test maximum sum of", () => {
    it("Should return errors", () => {
        interface Product {
            name: string
            price: number
            subProducts?: Product[]
        }

        interface Customer {
            id: number
            name: string
            email: string
        }

        interface Order {
            id: string
            customer: Customer
            orderNumber: string
            orderDate: Date | null
            orderItems: OrderItem[]
        }

        interface OrderItem {
            id: string
            orderId?: string
            productId: number
            product?: Product
            quantity: number
        }

        const productIds = [1, 2, 3, 4, 5]
        const customerIds = [10, 11, 12, 13]

        const orderItemsRule: ValidationRule<OrderItem> = {
            productId: [required(), elementOf(productIds)],
            quantity: [minNumber(1), maxNumber(10)],
        }

        const rule: ValidationRule<Order> = {
            orderDate: [required()],
            orderNumber: [required()],
            customer: {
                id: [required(), elementOf(customerIds)],
                name: [required()],
                email: [required(), emailAddress()]
            },
            orderItems: {
                validators: [arrayMinLen(4), maxSumOf("quantity", 10,)],
                validationRule: orderItemsRule
            }
        }

        const newOrder1: Order = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            customer: {
                id: 1,
                email: "invalid",
                name: ""
            },
            orderItems: [
                {
                    id: "1",
                    orderId: "1",
                    productId: 1,
                    quantity: 6,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 1,
                    quantity: 5,
                },
            ]
        }

        const actual1 = objectValidator.validate(newOrder1, rule)
        const expected1: ValidationResult<Order> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                customer: {
                    id: ["The value '1' is not the element of [10, 11, 12, 13]."],
                    email: ["Invalid email address. The valid email example: john.doe@example.com."],
                    name: ["This field is required."]
                },
                orderItems: {
                    errors: ["The minimum length for this field is 4.", "The maximum sum of quantity is 10.",],
                }
            }
        }

        expect(actual1).toEqual(expected1)
    })
})


describe("Validator complex validations", () => {
    it("Should return a valid validation result", () => {
        interface Product {
            name: string
            price: number
            subProducts?: Product[]
        }

        interface Customer {
            id: number
            name: string
            email: string
        }

        interface Order {
            id: string
            customer: Customer
            orderNumber: string
            orderDate: Date | null
            orderItems: OrderItem[]
        }

        interface OrderItem {
            id: string
            orderId?: string
            productId: number
            product?: Product
            quantity: number
        }

        const productIds = [1, 2, 3, 4, 5]
        const customerIds = [10, 11, 12, 13]

        const orderItemsRule: ValidationRule<OrderItem> = {
            productId: [required(), elementOf(productIds)],
            quantity: [minNumber(1), maxNumber(5)],
        }

        const rule: ValidationRule<Order> = {
            orderDate: [required()],
            orderNumber: [required()],
            customer: {
                id: [required(), elementOf(customerIds)],
                name: [required()],
                email: [required(), emailAddress()]
            },
            orderItems: {
                validators: [arrayMinLen(4)],
                validationRule: orderItemsRule
            }
        }

        const newOrder1: Order = {
            id: "1",
            orderDate: new Date(),
            orderNumber: "ORD/0001",
            customer: {
                id: 10,
                email: "invalid@email.com",
                name: "Agung"
            },
            orderItems: [
                {
                    id: "1",
                    orderId: "1",
                    productId: 1,
                    quantity: 2,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 1,
                    quantity: 5,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 1,
                    quantity: 5,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 2,
                    quantity: 5,
                },
            ]
        }

        const actual1 = objectValidator.validate(newOrder1, rule)
        const expected1: ValidationResult<Order> = {
            message: defaultMessage.okMessage,
            isValid: true,
            errors: undefined,
        }

        expect(actual1).toEqual(expected1)
    })
})

describe("Validator Test The Custom Validator", () => {
    it("Custom validator test", () => {
        interface Product {
            name: string
            price: number
            subProducts?: Product[]
        }

        interface Customer {
            id: number
            name: string
            email: string
        }

        interface Order {
            id: string
            customer: Customer
            orderNumber: string
            orderDate: Date | null
            orderItems: OrderItem[]
        }

        interface OrderItem {
            id: string
            orderId?: string
            productId: number
            product?: Product
            quantity: number
        }

        const productIds = [1, 2, 3, 4, 5]
        const customerIds = [10, 11, 12, 13]

        const orderItemsRule: ValidationRule<OrderItem> = {
            productId: [required(), elementOf(productIds)],
            quantity: [minNumber(1), maxNumber(5)],
        }


        const rule: ValidationRule<Order> = {
            orderDate: [required()],
            orderNumber: [required()],
            customer: {
                id: [required(), elementOf(customerIds)],
                name: [required(), propertyValidator(function (value, object) {
                    return false
                }, "Error customer name")],
                email: [required(), emailAddress()]
            },
            orderItems: {
                validators: [arrayMinLen(4), propertyValidator(function (value, object) {
                    return true
                }, "Order item has error.")],
                validationRule: orderItemsRule
            }
        }

        const newOrder1: Order = {
            id: "1",
            orderDate: new Date(),
            orderNumber: "ORD/0001",
            customer: {
                id: 10,
                email: "invalid@email.com", //this is not invalid one
                name: "Agung"
            },
            orderItems: [
                {
                    id: "1",
                    orderId: "1",
                    productId: 1,
                    quantity: 2,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 1,
                    quantity: 5,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 1,
                    quantity: 5,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 2,
                    quantity: 5,
                },
            ]
        }

        const actual1 = objectValidator.validate(newOrder1, rule)
        const expected1: ValidationResult<Order> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                customer: {
                    name: ["Error customer name"]
                }
            },
        }

        expect(actual1).toEqual(expected1)
    })
})

describe("Validator Test Date Test", () => {
    it("Test date value", () => {
        interface Product {
            expiredDate?: Date
        }
        const product: Product = {
        }
        const rule: ValidationRule<Product> = {
            expiredDate: [required()],
        }

        const actual1 = objectValidator.validate(product, rule)
        const expected1: ValidationResult<Product> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                expiredDate: ["This field is required."]
            },
        }

        expect(actual1).toEqual(expected1)

        const actual2 = objectValidator.validate({
            expiredDate: new Date()
        }, rule)
        const expected2: ValidationResult<Product> = {
            message: defaultMessage.okMessage,
            isValid: true,
            errors: undefined
        }

        expect(actual2).toEqual(expected2)
    })
})
