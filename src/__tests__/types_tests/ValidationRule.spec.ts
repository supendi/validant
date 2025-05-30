import { ArrayValidationRule } from "../../types/ValidationRule"
import { ValidateFunc } from "../../types/ValidationRule"
import { ValidationRule } from "../../types/ValidationRule"
import { elementOf, emailAddress, maxNumber, arrayMinLen, minNumber, required } from "../../rules"

/**
 * Ensure all the code below are compiled
 */

describe("ValidationRule Compile Test", () => {
    it("Should compile", () => {

        interface Product {
            id: string
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
            quantity: number,
            customers: Customer[]
        }

        const productIds = [1, 2, 3, 4, 5]
        const customerIds = [10, 11, 12, 13]

        // Common Check
        const rule1: ValidationRule<Order> = {
            orderDate: [required()],
            orderNumber: [required()],
            customer: {
                id: [required(), elementOf(customerIds)],
                name: [required()],
                email: [required(), emailAddress()]
            },
        }

        // ensure order items has the correct type check
        const rule2: ValidationRule<Order> = {
            orderItems: {
                arrayRules: [arrayMinLen(4)],
                arrayElementRule: {
                    id: [required()],
                    productId: [],
                }
            },
        }

        // ensure order items has the correct type check and can use predefined rules

        // Predefined rules
        const orderItemsRule: ValidationRule<OrderItem, Order> = {
            productId: [required(), elementOf(productIds)],
            quantity: [minNumber(1), maxNumber(5)],
        }

        // Apply the predefined order item rules
        const rule3: ValidationRule<Order> = {
            orderItems: {
                arrayRules: [arrayMinLen(4)],
                arrayElementRule: orderItemsRule
            },
        }

        // Ensure deep type check on order items, see the customer properties
        const rule4: ValidationRule<Order> = {
            orderItems: {
                arrayRules: [arrayMinLen(4)],
                arrayElementRule: {
                    customers: {
                        arrayElementRule: {
                            id: [required(), elementOf(customerIds)],
                            name: [required()],
                            email: [required(), emailAddress()]
                        }
                    }
                },
            },
        }
    })
})


/**
 * Ensure all the code below compiled
 */

describe("ValidationRules Simple Person Test", () => {
    it("Should compile", () => {
        interface Person {
            name: string
            age: number
        }
        const requiredValidator: ValidateFunc<any, any> = (value: any, obj?: any) => {
            return {
                ruleName: requiredValidator.name,
                attemptedValue: value,
                errorMessage: "This field is required"
            }
        }
        const minNumberValidator: ValidateFunc<any, any> = (value: any, obj?: any) => {
            return {
                ruleName: minNumberValidator.name,
                attemptedValue: value,
                errorMessage: "minNumberValidator"
            }
        }

        const rules: ValidationRule<Person> = {
            name: [requiredValidator],
            age: [requiredValidator, minNumberValidator],
        }

        expect(rules).not.toBeUndefined()

        expect(rules.name).not.toBeUndefined()
        expect(rules.age).not.toBeUndefined()

        expect(Array.isArray(rules.name)).toBeTruthy()
        expect(Array.isArray(rules.age)).toBeTruthy()

        expect(rules.name?.length).toEqual(1)
        expect(rules.age?.length).toEqual(2)

        const nameValidators = rules.name ? rules.name : []
        expect(nameValidators[0]).not.toBeUndefined()
        expect(nameValidators[0]).toEqual(requiredValidator)

        const ageValidators = rules.age ? rules.age : []
        expect(ageValidators[0]).not.toBeUndefined()
        expect(ageValidators[0]).toEqual(requiredValidator)

        expect(ageValidators[1]).not.toBeUndefined()
        expect(ageValidators[1]).toEqual(minNumberValidator)
    })
})


describe("ValidationRules Complex Person Test", () => {
    it("Should compile", () => {
        interface Person {
            name: string
            age: number
            father: Person
            children: Person[]
        }
        const requiredValidator: ValidateFunc<any, any> = (value: any, obj?: any) => {
            return {
                ruleName: requiredValidator.name,
                attemptedValue: value,
                errorMessage: "error"
            }
        }
        const minNumberValidator: ValidateFunc<any, any> = (value: any, obj?: any) => {
            return {
                ruleName: minNumberValidator.name,
                attemptedValue: value,
                errorMessage: "error"
            }
        }
        const maxNumberValidator: ValidateFunc<any, any> = (value: any, obj?: any) => {
            return {
                ruleName: maxNumberValidator.name,
                attemptedValue: value,
                errorMessage: "error"
            }
        }

        const personRules: ValidationRule<Person> = {
            name: [requiredValidator],
            age: [requiredValidator, minNumberValidator],
            father: {
                name: [requiredValidator],
                age: [maxNumberValidator],
            }
        }

        personRules.children = {
            arrayRules: [requiredValidator],
            arrayElementRule: {
                name: [requiredValidator],
                age: [requiredValidator, minNumberValidator],
                father: {
                    name: [requiredValidator],
                    age: [maxNumberValidator],
                }
            }
        }

        expect(personRules).not.toBeUndefined()

        expect(personRules.name).not.toBeUndefined()
        expect(personRules.age).not.toBeUndefined()

        expect(Array.isArray(personRules.name)).toBeTruthy()
        expect(Array.isArray(personRules.age)).toBeTruthy()

        expect(personRules.name?.length).toEqual(1)
        expect(personRules.age?.length).toEqual(2)

        const nameValidators = personRules.name ? personRules.name : []
        expect(nameValidators[0]).not.toBeUndefined()
        expect(nameValidators[0]).toEqual(requiredValidator)

        const ageValidators = personRules.age ? personRules.age : []
        expect(ageValidators[0]).not.toBeUndefined()
        expect(ageValidators[0]).toEqual(requiredValidator)

        expect(ageValidators[1]).not.toBeUndefined()
        expect(ageValidators[1]).toEqual(minNumberValidator)

        const fatherRules = personRules.father
        expect(fatherRules).not.toBeUndefined()
        expect(fatherRules).toEqual({
            name: [requiredValidator],
            age: [maxNumberValidator],
        },)

        expect(fatherRules?.name?.length).toEqual(1)
        expect(fatherRules?.age?.length).toEqual(1)

        const fatherNameValidators = fatherRules?.name ? fatherRules?.name : []
        expect(fatherNameValidators[0]).not.toBeUndefined()
        expect(fatherNameValidators[0]).toEqual(requiredValidator)

        const fatherAgeValidators = fatherRules?.age ? fatherRules?.age : []
        expect(fatherAgeValidators[0]).not.toBeUndefined()
        expect(fatherAgeValidators[0]).toEqual(maxNumberValidator)


        const childrenRules = personRules.children
        expect(childrenRules).not.toBeUndefined()
        expect(childrenRules).toEqual<ArrayValidationRule<Person[], Person>>({
            arrayRules: [requiredValidator],
            arrayElementRule: {
                name: [requiredValidator],
                age: [requiredValidator, minNumberValidator],
                father: {
                    name: [requiredValidator],
                    age: [maxNumberValidator],
                }
            }
        })

        expect(childrenRules.arrayRules?.length).toEqual(1)
        expect(childrenRules.arrayElementRule).toEqual({
            name: [requiredValidator],
            age: [requiredValidator, minNumberValidator],
            father: {
                name: [requiredValidator],
                age: [maxNumberValidator],
            }
        })

        const childrenValidationRule = childrenRules.arrayElementRule
        expect(childrenValidationRule?.name).not.toBeUndefined()
        expect(childrenValidationRule?.name).toEqual([requiredValidator])
    })
})
