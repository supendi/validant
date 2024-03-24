"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objectValidator_1 = require("../../objectValidator");
const elementOf_validator_1 = require("../../validators/elementOf-validator");
const emailAddress_validator_1 = require("../../validators/emailAddress-validator");
const maxNumber_validator_1 = require("../../validators/maxNumber-validator");
const arrayMinLength_validator_1 = require("../../validators/arrayMinLength-validator");
const minNumber_validator_1 = require("../../validators/minNumber-validator");
const required_validator_1 = require("../../validators/required-validator");
describe("getErrorOf Simple Person Test", () => {
    it("Person name should return errors", () => {
        const rule = {
            name: [(0, required_validator_1.required)()]
        };
        const person = {
            name: "",
        };
        const actual = (0, objectValidator_1.getErrorOf)(person, rule);
        const expected = {
            name: ["This field is required."]
        };
        expect(actual).toEqual(expected);
    });
});
describe("getErrorOf Simple Person With Child Test", () => {
    it("Parent and child name should return errors", () => {
        const rule = {
            name: [(0, required_validator_1.required)()],
            child: {
                name: [(0, required_validator_1.required)()]
            }
        };
        const parent = {
            name: "",
            child: {
                name: "",
            }
        };
        const actual = (0, objectValidator_1.getErrorOf)(parent, rule);
        const expected = {
            name: ["This field is required."],
            child: {
                name: ["This field is required."],
            }
        };
        expect(actual).toEqual(expected);
    });
});
describe("getErrorOf Nested Object Test with nested address", () => {
    it("Nested object test should return errors", () => {
        const rule = {
            name: [(0, required_validator_1.required)()],
            address: {
                street: [(0, required_validator_1.required)()],
                city: {
                    name: [(0, required_validator_1.required)()],
                    country: {
                        name: [(0, required_validator_1.required)()],
                        continent: {
                            name: [(0, required_validator_1.required)()],
                        }
                    }
                }
            },
            child: {
                name: [(0, required_validator_1.required)()]
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
        const actual = (0, objectValidator_1.getErrorOf)(parent, rule);
        const expected = {
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
        };
        expect(actual).toEqual(expected);
    });
});
describe("getErrorOf test with children array", () => {
    it("Children has to contain suberrors", () => {
        const rule = {
            name: [(0, required_validator_1.required)()],
        };
        rule.children = {
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
        const actual = (0, objectValidator_1.getErrorOf)(person, rule);
        const expected = {
            name: ["This field is required."],
            children: {
                errorOfArrayElements: [
                    {
                        index: 0,
                        errors: {
                            name: ["This field is required."],
                        },
                        validatedObject: person.children[0]
                    },
                ]
            }
        };
        expect(actual).toEqual(expected);
    });
});
describe("getErrorOf test with children array", () => {
    it("Children has to contain errors", () => {
        const rule = {
            name: [(0, required_validator_1.required)()],
        };
        rule.children = {
            validatorOfArray: [(0, arrayMinLength_validator_1.arrayMinLength)(1, "Please add at least one child.")],
            validationRuleOfArrayElement: rule
        };
        const person = {
            name: "",
            children: []
        };
        const actual = (0, objectValidator_1.getErrorOf)(person, rule);
        const expected = {
            name: ["This field is required."],
            children: {
                errorOfArray: ["Please add at least one child."],
            }
        };
        expect(actual).toEqual(expected);
    });
});
describe("getErrorOf test with Order and Order item", () => {
    it("Validating order item approach 1", () => {
        const rule = {
            orderDate: [(0, required_validator_1.required)()],
            orderNumber: [(0, required_validator_1.required)()],
            orderItems: {
                validatorOfArray: [(0, arrayMinLength_validator_1.arrayMinLength)(1, "Please add at least one order item.")],
                validationRuleOfArrayElement: {
                    productId: [(0, required_validator_1.required)()],
                    quantity: [(0, minNumber_validator_1.minNumber)(1)],
                }
            }
        };
        const newOrder1 = {
            id: "1",
            orderDate: null,
            orderNumber: "",
            orderItems: []
        };
        const actual1 = (0, objectValidator_1.getErrorOf)(newOrder1, rule);
        const expected1 = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            orderItems: {
                errorOfArray: ["Please add at least one order item."],
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
        const actual2 = (0, objectValidator_1.getErrorOf)(newOrder2, rule);
        const expected2 = {
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
        };
        expect(actual2).toEqual(expected2);
    });
});
describe("getErrorOf test with Order and Order item", () => {
    it("Validating order item approach 2, separate the validation rule", () => {
        const orderItemsRule = {
            productId: [(0, required_validator_1.required)()],
            quantity: [(0, minNumber_validator_1.minNumber)(1)],
        };
        const rule = {
            orderDate: [(0, required_validator_1.required)()],
            orderNumber: [(0, required_validator_1.required)()],
            orderItems: {
                validatorOfArray: [(0, arrayMinLength_validator_1.arrayMinLength)(3)],
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
        const actual1 = (0, objectValidator_1.getErrorOf)(newOrder1, rule);
        const expected1 = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            orderItems: {
                errorOfArray: ["The minimum length for this field is 3."],
            }
        };
        expect(actual1).toEqual(expected1);
        const actual2 = (0, objectValidator_1.getErrorOf)(newOrder2, rule);
        const expected2 = {
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
        };
        expect(actual2).toEqual(expected2);
    });
});
describe("getErrorOf complex validations", () => {
    it("Should return errors", () => {
        const productIds = [1, 2, 3, 4, 5];
        const customerIds = [10, 11, 12, 13];
        const orderItemsRule = {
            productId: [(0, required_validator_1.required)(), (0, elementOf_validator_1.elementOf)(productIds)],
            quantity: [(0, minNumber_validator_1.minNumber)(1), (0, maxNumber_validator_1.maxNumber)(5)],
        };
        const rule = {
            orderDate: [(0, required_validator_1.required)()],
            orderNumber: [(0, required_validator_1.required)()],
            customer: {
                id: [(0, required_validator_1.required)(), (0, elementOf_validator_1.elementOf)(customerIds)],
                name: [(0, required_validator_1.required)()],
                email: [(0, required_validator_1.required)(), (0, emailAddress_validator_1.emailAddress)()]
            },
            orderItems: {
                validatorOfArray: [(0, arrayMinLength_validator_1.arrayMinLength)(4)],
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
        const actual1 = (0, objectValidator_1.getErrorOf)(newOrder1, rule);
        const expected1 = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            customer: {
                id: ["The value '1' is not the element of [10, 11, 12, 13]."],
                email: ["Invalid email address. The valid email example: john.doe@example.com."],
                name: ["This field is required."]
            },
            orderItems: {
                errorOfArray: ["The minimum length for this field is 4."],
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
        };
        const actual2 = (0, objectValidator_1.getErrorOf)(newOrder2, rule);
        const expected2 = {
            orderDate: ["This field is required."],
            orderNumber: ["This field is required."],
            customer: {
                id: ["The value '1' is not the element of [10, 11, 12, 13]."],
                email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."],
                name: ["This field is required."]
            },
            orderItems: {
                errorOfArray: ["The minimum length for this field is 4."],
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
        };
        expect(actual2).toEqual(expected2);
    });
});
