"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../../validators");
const productIds = [1, 2, 3, 4, 5];
const customerIds = [10, 11, 12, 13];
// Common Check
const rule1 = {
    orderDate: [(0, validators_1.required)()],
    orderNumber: [(0, validators_1.required)()],
    customer: {
        id: [(0, validators_1.required)(), (0, validators_1.elementOf)(customerIds)],
        name: [(0, validators_1.required)()],
        email: [(0, validators_1.required)(), (0, validators_1.emailAddress)()]
    },
};
// ensure order items has the correct type check
const rule2 = {
    orderItems: {
        validators: [(0, validators_1.arrayMinLen)(4)],
        validationRule: {
            id: [(0, validators_1.required)()],
            productId: [],
        }
    },
};
// ensure order items has the correct type check and can use predefined rules
// Predefined rules
const orderItemsRule = {
    productId: [(0, validators_1.required)(), (0, validators_1.elementOf)(productIds)],
    quantity: [(0, validators_1.minNumber)(1), (0, validators_1.maxNumber)(5)],
};
// Apply the predefined order item rules
const rule3 = {
    orderItems: {
        validators: [(0, validators_1.arrayMinLen)(4)],
        validationRule: orderItemsRule
    },
};
// Ensure deep type check on order items, see the customer properties
const rule4 = {
    orderItems: {
        validators: [(0, validators_1.arrayMinLen)(4)],
        validationRule: {
            customers: {
                validationRule: {
                    id: [(0, validators_1.required)(), (0, validators_1.elementOf)(customerIds)],
                    name: [(0, validators_1.required)()],
                    email: [(0, validators_1.required)(), (0, validators_1.emailAddress)()]
                }
            }
        },
    },
};
