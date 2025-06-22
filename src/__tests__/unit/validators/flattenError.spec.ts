import { flattenError } from "../../../validators/flattenError";
import { ErrorOf } from "../../../types";
import { FlattenErrorOf } from "../../../types/FlattenErrorOf";

interface OrderItem {
    productId: number;
    quantity: number;
    customer: Customer
    addresses: Address[]
}

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

interface Customer {
    name: string,
    age: number,
    child?: Customer
    address?: Address
}

interface Order {
    orderDate: Date | null;
    orderNumber: string;
    customer: Customer;
    orderItems: OrderItem[];
}

describe("flattenError", () => {
    it("should flatten a complex ErrorOf structure to FlattenErrorOf", () => {
        const errorOf: ErrorOf<Order> = {
            orderDate: [
                {
                    errorMessage: "This field is required.",
                    attemptedValue: null,
                    ruleName: "required"
                }
            ],
            orderNumber: [
                {
                    errorMessage: "This field is required.",
                    attemptedValue: "",
                    ruleName: "required"
                }
            ],
            customer: {
                name: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: "required"
                    }
                ],
                age: [
                    {
                        errorMessage: "Must be at least 18.",
                        attemptedValue: 10,
                        ruleName: "min"
                    }
                ],
                child: {
                    name: [
                        {
                            errorMessage: "Child name required.",
                            attemptedValue: "",
                            ruleName: "required"
                        }
                    ],
                    age: [
                        {
                            errorMessage: "Child must be at least 5.",
                            attemptedValue: 2,
                            ruleName: "min"
                        }
                    ]
                },
                address: {
                    street: [
                        {
                            errorMessage: "Street required.",
                            attemptedValue: "",
                            ruleName: "required"
                        }
                    ],
                    city: {
                        name: [
                            {
                                errorMessage: "City name required.",
                                attemptedValue: "",
                                ruleName: "required"
                            }
                        ],
                        country: {
                            name: [
                                {
                                    errorMessage: "Country name required.",
                                    attemptedValue: "",
                                    ruleName: "required"
                                }
                            ],
                            continent: {
                                name: [
                                    {
                                        errorMessage: "Continent name required.",
                                        attemptedValue: "",
                                        ruleName: "required"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            orderItems: {
                arrayErrors: [
                    {
                        errorMessage: "The minimum length for this field is 4.",
                        attemptedValue: [],
                        ruleName: "arrayMinLen"
                    }
                ],
                arrayElementErrors: [
                    {
                        index: 0,
                        errors: {
                            productId: [
                                {
                                    errorMessage: "Invalid product id.",
                                    attemptedValue: 0,
                                    ruleName: "elementOf"
                                }
                            ],
                            quantity: [
                                {
                                    errorMessage: "The minimum value for this field is 1.",
                                    attemptedValue: 0,
                                    ruleName: "minNumber"
                                }
                            ],
                            customer: {
                                name: [
                                    {
                                        errorMessage: "Order item customer name required.",
                                        attemptedValue: "",
                                        ruleName: "required"
                                    }
                                ],
                                age: [
                                    {
                                        errorMessage: "Order item customer must be at least 18.",
                                        attemptedValue: 12,
                                        ruleName: "min"
                                    }
                                ]
                            },
                            addresses: {
                                arrayErrors: [
                                    {
                                        errorMessage: "At least one address required.",
                                        attemptedValue: [],
                                        ruleName: "minLen"
                                    }
                                ],
                                arrayElementErrors: [
                                    {
                                        index: 0,
                                        errors: {
                                            street: [
                                                {
                                                    errorMessage: "Street required.",
                                                    attemptedValue: "",
                                                    ruleName: "required"
                                                }
                                            ],
                                            city: {
                                                name: [
                                                    {
                                                        errorMessage: "City name required.",
                                                        attemptedValue: "",
                                                        ruleName: "required"
                                                    }
                                                ]
                                            }
                                        },
                                        attemptedValue: { street: "", city: { name: "", country: { name: "", continent: { name: "" } } } }
                                    }
                                ]
                            }
                        },
                        attemptedValue: {
                            productId: 0,
                            quantity: 0,
                            customer: { name: "", age: 12 },
                            addresses: []
                        }
                    }
                ]
            }
        };

        const expected: FlattenErrorOf<Order> = {
            orderDate: [
                {
                    errorMessage: "This field is required.",
                    attemptedValue: null,
                    ruleName: "required"
                }
            ],
            orderNumber: [
                {
                    errorMessage: "This field is required.",
                    attemptedValue: "",
                    ruleName: "required"
                }
            ],
            customer: {
                name: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: "required"
                    }
                ],
                age: [
                    {
                        errorMessage: "Must be at least 18.",
                        attemptedValue: 10,
                        ruleName: "min"
                    }
                ],
                child: {
                    name: [
                        {
                            errorMessage: "Child name required.",
                            attemptedValue: "",
                            ruleName: "required"
                        }
                    ],
                    age: [
                        {
                            errorMessage: "Child must be at least 5.",
                            attemptedValue: 2,
                            ruleName: "min"
                        }
                    ]
                },
                address: {
                    street: [
                        {
                            errorMessage: "Street required.",
                            attemptedValue: "",
                            ruleName: "required"
                        }
                    ],
                    city: {
                        name: [
                            {
                                errorMessage: "City name required.",
                                attemptedValue: "",
                                ruleName: "required"
                            }
                        ],
                        country: {
                            name: [
                                {
                                    errorMessage: "Country name required.",
                                    attemptedValue: "",
                                    ruleName: "required"
                                }
                            ],
                            continent: {
                                name: [
                                    {
                                        errorMessage: "Continent name required.",
                                        attemptedValue: "",
                                        ruleName: "required"
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            orderItems: [
                {
                    errorLevel: "array",
                    errorMessage: "The minimum length for this field is 4.",
                    attemptedValue: [],
                    ruleName: "arrayMinLen"
                },
                {
                    errorLevel: "arrayElement",
                    index: 0,
                    errors: {
                        productId: [
                            {
                                errorMessage: "Invalid product id.",
                                attemptedValue: 0,
                                ruleName: "elementOf"
                            }
                        ],
                        quantity: [
                            {
                                errorMessage: "The minimum value for this field is 1.",
                                attemptedValue: 0,
                                ruleName: "minNumber"
                            }
                        ],
                        customer: {
                            name: [
                                {
                                    errorMessage: "Order item customer name required.",
                                    attemptedValue: "",
                                    ruleName: "required"
                                }
                            ],
                            age: [
                                {
                                    errorMessage: "Order item customer must be at least 18.",
                                    attemptedValue: 12,
                                    ruleName: "min"
                                }
                            ]
                        },
                        addresses: [
                            {
                                errorLevel: "array",
                                errorMessage: "At least one address required.",
                                attemptedValue: [],
                                ruleName: "minLen"
                            },
                            {
                                errorLevel: "arrayElement",
                                index: 0,
                                errors: {
                                    street: [
                                        {
                                            errorMessage: "Street required.",
                                            attemptedValue: "",
                                            ruleName: "required"
                                        }
                                    ],
                                    city: {
                                        name: [
                                            {
                                                errorMessage: "City name required.",
                                                attemptedValue: "",
                                                ruleName: "required"
                                            }
                                        ]
                                    }
                                },
                                attemptedValue: { street: "", city: { name: "", country: { name: "", continent: { name: "" } } } }
                            }
                        ]
                    },
                    attemptedValue: {
                        productId: 0,
                        quantity: 0,
                        customer: { name: "", age: 12 },
                        addresses: []
                    }
                }
            ]
        };

        const flat = flattenError(errorOf);
        expect(flat).toEqual(expected);
    });
});