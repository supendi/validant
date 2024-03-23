"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const validators_1 = require("../../validators");
const custom_validator_1 = require("../../validators/custom-validator");
const minSumOf_validator_1 = require("../../validators/minSumOf-validator");
const defaultMessage = { okMessage: "Good to go.", errorMessage: "One or more validation errors occurred." };
describe("Validator Simple Person Test", () => {
    it("Person name should return errors", () => {
        const rule = {
            name: [(0, validators_1.required)()]
        };
        const person = {
            name: "",
        };
        const actual = index_1.default.validate(person, rule);
        const expected = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                name: ["This field is required."]
            }
        };
        expect(actual).toEqual(expected);
    });
});
describe("Validator Simple Person With Child Test", () => {
    it("Parent and child name should return errors", () => {
        const rule = {
            name: [(0, validators_1.required)()],
            child: {
                name: [(0, validators_1.required)()]
            }
        };
        const parent = {
            name: "",
            child: {
                name: "",
            }
        };
        const actual = index_1.default.validate(parent, rule);
        const expected = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                name: ["This field is required."],
                child: {
                    name: ["This field is required."],
                }
            }
        };
        expect(actual).toEqual(expected);
    });
});
describe("Validator Nested Object Test with nested address", () => {
    it("Nested object test should return errors", () => {
        const rule = {
            name: [(0, validators_1.required)()],
            address: {
                street: [(0, validators_1.required)()],
                city: {
                    name: [(0, validators_1.required)()],
                    country: {
                        name: [(0, validators_1.required)()],
                        continent: {
                            name: [(0, validators_1.required)()],
                        }
                    }
                }
            },
            child: {
                name: [(0, validators_1.required)()]
            }
        };
        const parent = {
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
        };
        const actual = index_1.default.validate(parent, rule);
        const expected = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
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
        };
        expect(actual).toEqual(expected);
    });
});
describe("Validator test with children array", () => {
    it("Children has to contain elementErrors", () => {
        const rule = {
            name: [(0, validators_1.required)()],
        };
        rule.children = {
            validatorOfArray: [(0, validators_1.minLength)(1)],
            validationRuleOfArrayElement: rule
        };
        const person = {
            name: "",
            children: [
                {
                    name: "",
                },
            ]
        };
        const actual = index_1.default.validate(person, rule);
        const expected = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                name: ["This field is required."],
                children: {
                    errorOfArrayElements: [
                        {
                            index: 0,
                            errors: {
                                name: ["This field is required."],
                            },
                            validatedObject: person.children[0]
                        }
                    ]
                }
            }
        };
        expect(actual).toEqual(expected);
    });
});
describe("Validator test with children array", () => {
    it("Children has to contain errors", () => {
        const rule = {
            name: [(0, validators_1.required)()],
        };
        rule.children = {
            validatorOfArray: [(0, validators_1.minLength)(1, "Please add at least one child.")],
            validationRuleOfArrayElement: rule
        };
        const person = {
            name: "",
            children: []
        };
        const actual = index_1.default.validate(person, rule);
        const expected = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                name: ["This field is required."],
                children: {
                    errorOfArray: ["Please add at least one child."],
                }
            }
        };
        expect(actual).toEqual(expected);
    });
});
describe("Validator test with Order and Order item", () => {
    it("Validating order item approach 1", () => {
        const rule = {
            orderDate: [(0, validators_1.required)()],
            orderNumber: [(0, validators_1.required)()],
            orderItems: {
                validatorOfArray: [(0, validators_1.minLength)(1, "Please add at least one order item.")],
                validationRuleOfArrayElement: {
                    productId: [(0, validators_1.required)()],
                    quantity: [(0, validators_1.minNumber)(1)],
                }
            }
        };
        const newOrder1 = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            orderItems: []
        };
        const actual1 = index_1.default.validate(newOrder1, rule);
        const expected1 = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                orderItems: {
                    errorOfArray: ["Please add at least one order item."],
                }
            }
        };
        expect(actual1).toEqual(expected1);
        const newOrder2 = {
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
        };
        const actual2 = index_1.default.validate(newOrder2, rule);
        const expected2 = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                orderItems: {
                    errorOfArrayElements: [
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
        };
        expect(actual2).toEqual(expected2);
    });
});
describe("Validator test with Order and Order item", () => {
    it("Validating order item approach 2, separate the validation rule", () => {
        const orderItemsRule = {
            productId: [(0, validators_1.required)()],
            quantity: [(0, validators_1.minNumber)(1)],
        };
        const rule = {
            orderDate: [(0, validators_1.required)()],
            orderNumber: [(0, validators_1.required)()],
            orderItems: {
                validatorOfArray: [(0, validators_1.minLength)(3)],
                validationRuleOfArrayElement: orderItemsRule
            }
        };
        const newOrder1 = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            orderItems: []
        };
        const newOrder2 = {
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
        };
        const actual1 = index_1.default.validate(newOrder1, rule);
        const expected1 = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                orderItems: {
                    errorOfArray: ["The minimum length for this field is 3."],
                }
            }
        };
        expect(actual1).toEqual(expected1);
        const actual2 = index_1.default.validate(newOrder2, rule);
        const expected2 = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                orderDate: ["This field is required."],
                orderNumber: ["This field is required."],
                orderItems: {
                    errorOfArray: ["The minimum length for this field is 3."],
                    errorOfArrayElements: [
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
        };
        expect(actual2).toEqual(expected2);
    });
});
describe("Validator complex validations", () => {
    it("Should return errors", () => {
        const productIds = [1, 2, 3, 4, 5];
        const customerIds = [10, 11, 12, 13];
        const orderItemsRule = {
            productId: [(0, validators_1.required)(), (0, validators_1.elementOf)(productIds)],
            quantity: [(0, validators_1.minNumber)(1), (0, validators_1.maxNumber)(5)],
        };
        const rule = {
            orderDate: [(0, validators_1.required)()],
            orderNumber: [(0, validators_1.required)()],
            customer: {
                id: [(0, validators_1.required)(), (0, validators_1.elementOf)(customerIds)],
                name: [(0, validators_1.required)()],
                email: [(0, validators_1.required)(), (0, validators_1.emailAddress)()]
            },
            orderItems: {
                validatorOfArray: [(0, validators_1.minLength)(4), (0, minSumOf_validator_1.minSumOf)("quantity", 100)],
                validationRuleOfArrayElement: orderItemsRule
            }
        };
        const newOrder1 = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            customer: {
                id: 1,
                email: "invalid",
                name: ""
            },
            orderItems: []
        };
        const actual1 = index_1.default.validate(newOrder1, rule);
        const expected1 = {
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
                    errorOfArray: ["The minimum length for this field is 4.", "The minimum sum of quantity is 100.",],
                }
            }
        };
        expect(actual1).toEqual(expected1);
        const newOrder2 = {
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
        };
        const actual2 = index_1.default.validate(newOrder2, rule);
        const expected2 = {
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
                    errorOfArray: ["The minimum length for this field is 4.", "The minimum sum of quantity is 100.",],
                    errorOfArrayElements: [
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
        };
        expect(actual2).toEqual(expected2);
    });
});
describe("Validator test maximum sum of", () => {
    it("Should return errors", () => {
        const productIds = [1, 2, 3, 4, 5];
        const customerIds = [10, 11, 12, 13];
        const orderItemsRule = {
            productId: [(0, validators_1.required)(), (0, validators_1.elementOf)(productIds)],
            quantity: [(0, validators_1.minNumber)(1), (0, validators_1.maxNumber)(10)],
        };
        const rule = {
            orderDate: [(0, validators_1.required)()],
            orderNumber: [(0, validators_1.required)()],
            customer: {
                id: [(0, validators_1.required)(), (0, validators_1.elementOf)(customerIds)],
                name: [(0, validators_1.required)()],
                email: [(0, validators_1.required)(), (0, validators_1.emailAddress)()]
            },
            orderItems: {
                validatorOfArray: [(0, validators_1.minLength)(4), (0, index_1.maxSumOf)("quantity", 10)],
                validationRuleOfArrayElement: orderItemsRule
            }
        };
        const newOrder1 = {
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
        };
        const actual1 = index_1.default.validate(newOrder1, rule);
        const expected1 = {
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
                    errorOfArray: ["The minimum length for this field is 4.", "The maximum sum of quantity is 10.",],
                }
            }
        };
        expect(actual1).toEqual(expected1);
    });
});
describe("Validator complex validations", () => {
    it("Should return a valid validation result", () => {
        const productIds = [1, 2, 3, 4, 5];
        const customerIds = [10, 11, 12, 13];
        const orderItemsRule = {
            productId: [(0, validators_1.required)(), (0, validators_1.elementOf)(productIds)],
            quantity: [(0, validators_1.minNumber)(1), (0, validators_1.maxNumber)(5)],
        };
        const rule = {
            orderDate: [(0, validators_1.required)()],
            orderNumber: [(0, validators_1.required)()],
            customer: {
                id: [(0, validators_1.required)(), (0, validators_1.elementOf)(customerIds)],
                name: [(0, validators_1.required)()],
                email: [(0, validators_1.required)(), (0, validators_1.emailAddress)()]
            },
            orderItems: {
                validatorOfArray: [(0, validators_1.minLength)(4)],
                validationRuleOfArrayElement: orderItemsRule
            }
        };
        const newOrder1 = {
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
        };
        const actual1 = index_1.default.validate(newOrder1, rule);
        const expected1 = {
            message: defaultMessage.okMessage,
            isValid: true,
            errors: undefined,
        };
        expect(actual1).toEqual(expected1);
    });
});
describe("Validator Test The Custom Validator", () => {
    it("Custom validator test", () => {
        const productIds = [1, 2, 3, 4, 5];
        const customerIds = [10, 11, 12, 13];
        const orderItemsRule = {
            productId: [(0, validators_1.required)(), (0, validators_1.elementOf)(productIds)],
            quantity: [(0, validators_1.minNumber)(1), (0, validators_1.maxNumber)(5)],
        };
        const rule = {
            orderDate: [(0, validators_1.required)()],
            orderNumber: [(0, validators_1.required)()],
            customer: {
                id: [(0, validators_1.required)(), (0, validators_1.elementOf)(customerIds)],
                name: [(0, validators_1.required)(), (0, custom_validator_1.custom)(function (value, object) {
                        return false;
                    }, "Error customer name")],
                email: [(0, validators_1.required)(), (0, validators_1.emailAddress)()]
            },
            orderItems: {
                validatorOfArray: [(0, validators_1.minLength)(4), (0, custom_validator_1.custom)(function (value, object) {
                        console.log(object);
                        return true;
                    }, "Order item has error.")],
                validationRuleOfArrayElement: orderItemsRule
            }
        };
        const newOrder1 = {
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
        };
        const actual1 = index_1.default.validate(newOrder1, rule);
        const expected1 = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                customer: {
                    name: ["Error customer name"]
                }
            },
        };
        expect(actual1).toEqual(expected1);
    });
});
describe("Validator Test Date Test", () => {
    it("Test date value", () => {
        const product = {};
        const rule = {
            expiredDate: [(0, validators_1.required)()],
        };
        const actual1 = index_1.default.validate(product, rule);
        const expected1 = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                expiredDate: ["This field is required."]
            },
        };
        expect(actual1).toEqual(expected1);
        const actual2 = index_1.default.validate({
            expiredDate: new Date()
        }, rule);
        const expected2 = {
            message: defaultMessage.okMessage,
            isValid: true,
            errors: undefined
        };
        expect(actual2).toEqual(expected2);
    });
});
