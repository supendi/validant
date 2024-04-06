import { getErrorOf } from "../../objectValidator"
import { ErrorOf, ValidationRule } from "../../types"
import { elementOf } from "../../validators/elementOf"
import { emailAddress } from "../../validators/emailAddress"
import { maxNumber } from "../../validators/maxNumber"
import { arrayMinLen } from "../../validators/arrayMinLen"
import { minNumber } from "../../validators/minNumber"
import { required } from "../../validators/required"
import { alphabetOnly } from "../../validators/alphabetOnly"
import { stringLengthMinimum } from "../../validators/stringLengthMinimum"

describe("getErrorOf Simple Person Test", () => {
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

        const actual = getErrorOf(person, rule)

        const expected: ErrorOf<SimplePerson> = {
            name: ["This field is required."]
        }

        expect(actual).toEqual(expected)
    })
})

describe("getErrorOf Simple Person With Child Test", () => {
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

        const actual = getErrorOf(parent, rule)

        const expected: ErrorOf<SimplePerson> = {
            name: ["This field is required."],
            child: {
                name: ["This field is required."],
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("getErrorOf Nested Object Test with nested address", () => {
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
        interface SimplePerson {
            name: string
            child?: SimplePerson
            address?: Address
        }

        const rule: ValidationRule<SimplePerson> = {
            name: [required()],
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
        const parent: SimplePerson = {
            name: "",
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
            }
        }

        const actual = getErrorOf(parent, rule)

        const expected: ErrorOf<SimplePerson> = {
            name: ["This field is required."],
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

        expect(actual).toEqual(expected)
    })
})


describe("getErrorOf test with children array", () => {
    it("Children has to contain suberrors", () => {
        interface Person {
            name?: string
            children?: Person[]
        }

        const rule: ValidationRule<Person> = {
            name: [required()],
        }

        rule.children = {
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

        const actual = getErrorOf(person, rule)

        const expected: ErrorOf<Person> = {
            name: ["This field is required."],
            children: {
                errorsEach: [
                    {
                        index: 0,
                        errors: {
                            name: ["This field is required."],
                        },
                        validatedObject: person.children[0]
                    },
                ]
            }
        }

        expect(actual).toEqual(expected)
    })
})


describe("getErrorOf test with children array", () => {
    it("Children has to contain errors", () => {
        interface Person {
            name?: string
            children?: Person[]
        }

        const rule: ValidationRule<Person> = {
            name: [required()],
        }

        rule.children = {
            validators: [arrayMinLen(1, "Please add at least one child.")],
            validationRule: rule
        }

        const person: Person = {
            name: "",
            children: []
        }

        const actual = getErrorOf(person, rule)

        const expected: ErrorOf<Person> = {
            name: ["This field is required."],
            children: {
                errors: ["Please add at least one child."],
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("getErrorOf test with Order and Order item", () => {
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

        const actual1 = getErrorOf(newOrder1, rule)
        const expected1: ErrorOf<Order> = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            orderItems: {
                errors: ["Please add at least one order item."],
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

        const actual2 = getErrorOf(newOrder2, rule)
        const expected2: ErrorOf<Order> = {
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
        expect(actual2).toEqual(expected2)
    })
})

describe("getErrorOf test with Order and Order item", () => {
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

        const orderItemsRule: ValidationRule<OrderItem> = {
            productId: [required()],
            quantity: [minNumber(1)],
        }

        const rule: ValidationRule<Order> = {
            orderDate: [required()],
            orderNumber: [required()],
            orderItems: {
                validators: [arrayMinLen(3)],
                validationRule: orderItemsRule
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

        const actual1 = getErrorOf(newOrder1, rule)
        const expected1: ErrorOf<Order> = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            orderItems: {
                errors: ["The minimum length for this field is 3."],
            }
        }
        expect(actual1).toEqual(expected1)

        const actual2 = getErrorOf(newOrder2, rule)
        const expected2: ErrorOf<Order> = {
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
        expect(actual2).toEqual(expected2)
    })
})

describe("getErrorOf complex validations", () => {
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
                validators: [arrayMinLen(4)],
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

        const actual1 = getErrorOf(newOrder1, rule)
        const expected1: ErrorOf<Order> = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            customer: {
                id: ["The value '1' is not the element of [10, 11, 12, 13]."],
                email: ["Invalid email address. The valid email example: john.doe@example.com."],
                name: ["This field is required."]
            },
            orderItems: {
                errors: ["The minimum length for this field is 4."],
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
                    productId: 0,
                    quantity: 12,
                },
                {
                    id: "2",
                    orderId: "2",
                    productId: 6,
                    quantity: 12,
                },
            ]
        }
        const actual2 = getErrorOf(newOrder2, rule)
        const expected2: ErrorOf<Order> = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            customer: {
                id: ["The value '1' is not the element of [10, 11, 12, 13]."],
                email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."],
                name: ["This field is required."]
            },
            orderItems: {
                errors: ["The minimum length for this field is 4."],
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
                        index: 1,
                        errors: {
                            productId: ["This field is required.", "The value '0' is not the element of [1, 2, 3, 4, 5]."],
                            quantity: ["The maximum value for this field is 5."],
                        },
                        validatedObject: newOrder2.orderItems[1]
                    },
                    {
                        index: 2,
                        errors: {
                            productId: ["The value '6' is not the element of [1, 2, 3, 4, 5]."],
                            quantity: ["The maximum value for this field is 5."],
                        },
                        validatedObject: newOrder2.orderItems[2]
                    }
                ]
            }
        }
        expect(actual2).toEqual(expected2)
    })
})


describe("getErrorOf complex validations", () => {
    it("Should return errors", () => {
        interface Customer {
            id: number
            name: string
            email: string,
            address: { street: string }[]
        }
        const stringLenMin = 10
        const rule: ValidationRule<Customer> = {
            name: [required(), alphabetOnly(), stringLengthMinimum(stringLenMin)],
            email: [required(), emailAddress()],
            address: {
                validators: []
            }
        }

        const customer: Customer = {
            id: 1,
            name: "notN@me",
            email: "invalid",
            address: []
        }

        const actual1 = getErrorOf(customer, rule)
        const expected1: ErrorOf<Customer> = {
            name: ["This field should not contain any numbers or symbols. Accept only A-Z a-z and spaces.", `The minimum length string is ${stringLenMin}.`],
            email: ["Invalid email address. The valid email example: john.doe@example.com."],
        }

        expect(actual1).toEqual(expected1)

        const customer2: Customer = {
            id: 1,
            name: "This is the correct name",
            email: "invalid@gmail.com",
            address: []
        }

        const actual2 = getErrorOf(customer2, rule)
        const expected2: ErrorOf<Customer> = undefined

        expect(actual2).toEqual(expected2)
    })
})
