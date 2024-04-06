import { ValidationRule } from "../../types"
import { elementOf, emailAddress, maxNumber, arrayMinLen, minNumber, required } from "../../validators"

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
        validators: [arrayMinLen(4)],
        validationRule: {
            id: [required()],
            productId: [],
        }
    },
}

// ensure order items has the correct type check and can use predefined rules

// Predefined rules
const orderItemsRule: ValidationRule<OrderItem> = {
    productId: [required(), elementOf(productIds)],
    quantity: [minNumber(1), maxNumber(5)],
}

// Apply the predefined order item rules
const rule3: ValidationRule<Order> = {
    orderItems: {
        validators: [arrayMinLen(4)],
        validationRule: orderItemsRule
    },
}

// Ensure deep type check on order items, see the customer properties
const rule4: ValidationRule<Order> = {
    orderItems: {
        validators: [arrayMinLen(4)],
        validationRule: {
            customers: {
                validationRule: {
                    id: [required(), elementOf(customerIds)],
                    name: [required()],
                    email: [required(), emailAddress()]
                }
            }
        },
    },
}