import { getArrayStringErrorOf } from "../../objectValidator"
import { ArrayStringErrorOf, ValidationRule } from "../../types"
import { elementOf } from "../../validators/elementOf-validator"
import { emailAddress } from "../../validators/emailAddress-validator"
import { maxNumber } from "../../validators/maxNumber-validator"
import { minLength } from "../../validators/minLength-validator"
import { minNumber } from "../../validators/minNumber-validator"
import { required } from "../../validators/required-validator"

describe("getArrayStringErrorOf Simple Person Test", () => {
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

        const actual = getArrayStringErrorOf(person, rule)

        const expected: ArrayStringErrorOf<SimplePerson> = {
            name: ["This field is required."]
        }

        expect(actual).toEqual(expected)
    })
})

describe("getArrayStringErrorOf Simple Person With Child Test", () => {
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

        const actual = getArrayStringErrorOf(parent, rule)

        const expected: ArrayStringErrorOf<SimplePerson> = {
            name: ["This field is required."],
            child: {
                name: ["This field is required."],
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("getArrayStringErrorOf Nested Object Test with nested address", () => {
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

        const actual = getArrayStringErrorOf(parent, rule)

        const expected: ArrayStringErrorOf<SimplePerson> = {
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


describe("getArrayStringErrorOf test with children array", () => {
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

        const actual = getArrayStringErrorOf(person, rule)

        const expected: ArrayStringErrorOf<Person> = {
            name: ["This field is required."],
            children: {
                indexedErrors: [
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


describe("getArrayStringErrorOf test with children array", () => {
    it("Children has to contain errors", () => {
        interface Person {
            name?: string
            children?: Person[]
        }

        const rule: ValidationRule<Person> = {
            name: [required()],
        }

        rule.children = {
            fieldValidators: [minLength(1, "Please add at least one child.")],
            validationRule: rule
        }

        const person: Person = {
            name: "",
            children: []
        }

        const actual = getArrayStringErrorOf(person, rule)

        const expected: ArrayStringErrorOf<Person> = {
            name: ["This field is required."],
            children: {
                fieldErrors: ["Please add at least one child."],
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("getArrayStringErrorOf test with Order and Order item", () => {
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
                fieldValidators: [minLength(1, "Please add at least one order item.")],
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

        const actual1 = getArrayStringErrorOf(newOrder1, rule)
        const expected1: ArrayStringErrorOf<Order> = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            orderItems: {
                fieldErrors: ["Please add at least one order item."],
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

        const actual2 = getArrayStringErrorOf(newOrder2, rule)
        const expected2: ArrayStringErrorOf<Order> = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            orderItems: {
                indexedErrors: [
                    {
                        index: 0,
                        errors: {
                            productId: ["This field is required."],
                            quantity: ["The minimum value for this field is 1"],
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

describe("getArrayStringErrorOf test with Order and Order item", () => {
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
                fieldValidators: [minLength(3)],
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

        const actual1 = getArrayStringErrorOf(newOrder1, rule)
        const expected1: ArrayStringErrorOf<Order> = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            orderItems: {
                fieldErrors: ["The minimum length for this field is 3"],
            }
        }
        expect(actual1).toEqual(expected1)

        const actual2 = getArrayStringErrorOf(newOrder2, rule)
        const expected2: ArrayStringErrorOf<Order> = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            orderItems: {
                fieldErrors: ["The minimum length for this field is 3"],
                indexedErrors: [
                    {
                        index: 0,
                        errors: {
                            productId: ["This field is required."],
                            quantity: ["The minimum value for this field is 1"],
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

describe("getArrayStringErrorOf complex validations", () => {
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
                fieldValidators: [minLength(4)],
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

        const actual1 = getArrayStringErrorOf(newOrder1, rule)
        const expected1: ArrayStringErrorOf<Order> = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            customer: {
                id: ["The value '1' is not the element of [10, 11, 12, 13]."],
                email: ["Invalid email address. The valid email example: john.doe@example.com"],
                name: ["This field is required."]
            },
            orderItems: {
                fieldErrors: ["The minimum length for this field is 4"],
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
        const actual2 = getArrayStringErrorOf(newOrder2, rule)
        const expected2: ArrayStringErrorOf<Order> = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            customer: {
                id: ["The value '1' is not the element of [10, 11, 12, 13]."],
                email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com"],
                name: ["This field is required."]
            },
            orderItems: {
                fieldErrors: ["The minimum length for this field is 4"],
                indexedErrors: [
                    {
                        index: 0,
                        errors: {
                            productId: ["This field is required.", "The value '0' is not the element of [1, 2, 3, 4, 5]."],
                            quantity: ["The minimum value for this field is 1", "The maximum value for this field is 5"],
                        },
                        validatedObject: newOrder2.orderItems[0]
                    },
                    {
                        index: 1,
                        errors: {
                            productId: ["This field is required.", "The value '0' is not the element of [1, 2, 3, 4, 5]."],
                            quantity: ["The maximum value for this field is 5"],
                        },
                        validatedObject: newOrder2.orderItems[1]
                    },
                    {
                        index: 2,
                        errors: {
                            productId: ["The value '6' is not the element of [1, 2, 3, 4, 5]."],
                            quantity: ["The maximum value for this field is 5"],
                        },
                        validatedObject: newOrder2.orderItems[2]
                    }
                ]
            }
        }
        expect(actual2).toEqual(expected2)
    })
})
