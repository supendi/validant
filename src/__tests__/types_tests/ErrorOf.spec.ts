import { ErrorOf } from "../../types/ErrorOf"

/**
 * Ensure all the code below compiled
 */
describe("ErrorOf Test", () => {
    it("Should compile", () => {
        interface SimplePerson {
            name: string
            age: number
        }

        const actual: ErrorOf<SimplePerson> = {
            age: [
                {
                    errorMessage: "Age is required",
                    attemptedValue: undefined,
                    ruleName: "required"
                },
                {
                    errorMessage: "Maximum age is 56",
                    attemptedValue: 60,
                    ruleName: "max"
                },
            ],
            name: [
                {
                    errorMessage: "Name is required",
                    attemptedValue: undefined,
                    ruleName: "required"
                },
                {
                    errorMessage: "Minimum chars of person name is 2",
                    attemptedValue: "A",
                    ruleName: "minLength"
                },
            ]
        }
        expect(!actual).not.toBeNull()
    })
})


describe("ErrorOf Test", () => {
    it("Should compile", () => {
        interface Address {
            street: string,
            cityId: number
        }
        interface ComplexPerson {
            name: string
            age: number
            birtDate: Date,
            address: Address
            children: ComplexPerson[]
        }

        const actual: ErrorOf<ComplexPerson> = {
            age: [
                {
                    errorMessage: "Age is required",
                    attemptedValue: undefined,
                    ruleName: "required"
                },
                {
                    errorMessage: "Maximum age is 56",
                    attemptedValue: 60,
                    ruleName: "max"
                }
            ],
            name: [
                {
                    errorMessage: "Name is required",
                    attemptedValue: undefined,
                    ruleName: "required"
                },
                {
                    errorMessage: "Minimum chars of person name is 2",
                    attemptedValue: "A",
                    ruleName: "minLength"
                }
            ],
            birtDate: [
                {
                    errorMessage: "Birtdate is required",
                    attemptedValue: undefined,
                    ruleName: "required"
                },
                {
                    errorMessage: "Date cannot be future",
                    attemptedValue: new Date("2100-01-01"),
                    ruleName: "future"
                }
            ],
            address: {
                cityId: [
                    {
                        errorMessage: "invalid city id ''",
                        attemptedValue: "",
                        ruleName: "invalidCity"
                    }
                ],
                street: [
                    {
                        errorMessage: "Please enter street name",
                        attemptedValue: "",
                        ruleName: "required"
                    }
                ]
            },
            children: {
                arrayErrors: [],
                arrayElementErrors: [
                    {
                        index: 0,
                        errors: {
                            // Ensure If age/other property is an optional error,it doesn't have any errors
                            // age: [
                            //     { errorMessage: "Age is required", attemptedValue: undefined, ruleName: "required" },
                            //     { errorMessage: "Children age cannot be greater than parent", attemptedValue: 10, ruleName: "ageComparison" }
                            // ],
                            name: [
                                {
                                    errorMessage: "Minimum chars of person name is 2",
                                    attemptedValue: "A",
                                    ruleName: "minLength"
                                }
                            ],
                            birtDate: [
                                {
                                    errorMessage: "Date cannot be future",
                                    attemptedValue: new Date("2100-01-01"),
                                    ruleName: "future"
                                }
                            ],
                            address: {
                                // cityId: [{ errorMessage: "invalid city id ''", attemptedValue: "", ruleName: "invalidCity" }], //ensure each property is optional
                                street: [
                                    {
                                        errorMessage: "Please enter street name",
                                        attemptedValue: "",
                                        ruleName: "required"
                                    }
                                ]
                            },
                        },
                        attemptedValue: undefined
                    }
                ]
            }
        }
        expect(!actual).not.toBeNull()
    })
})



describe("ErrorOf Complex Person Test", () => {
    it("Should compile", () => {
        interface Address {
            street: string,
            cityId: number
        }
        interface ComplexPerson {
            name: string
            age: number
            birtDate: Date,
            addresses: Address[]
            children: ComplexPerson[]
        }

        const actual: ErrorOf<ComplexPerson> = {
            age: [
                {
                    errorMessage: "Age is required",
                    attemptedValue: undefined,
                    ruleName: "required"
                },
                {
                    errorMessage: "Maximum age is 56",
                    attemptedValue: 60,
                    ruleName: "max"
                }
            ],
            name: [
                {
                    errorMessage: "Name is required",
                    attemptedValue: undefined,
                    ruleName: "required"
                },
                {
                    errorMessage: "Minimum chars of person name is 2",
                    attemptedValue: "A",
                    ruleName: "minLength"
                }
            ],
            birtDate: [
                {
                    errorMessage: "Birtdate is required",
                    attemptedValue: undefined,
                    ruleName: "required"
                },
                {
                    errorMessage: "Date cannot be future",
                    attemptedValue: new Date("2100-01-01"),
                    ruleName: "future"
                }
            ],
            addresses: {
                arrayErrors: [],
                arrayElementErrors: [
                    {
                        index: 0,
                        errors: {
                            cityId: [
                                {
                                    errorMessage: "invalid city id ''",
                                    attemptedValue: "",
                                    ruleName: "invalidCity"
                                }
                            ],
                            street: [
                                {
                                    errorMessage: "Please enter street name",
                                    attemptedValue: "",
                                    ruleName: "required"
                                }
                            ]
                        },
                        attemptedValue: undefined
                    }
                ]
            },
            children: {
                arrayErrors: [],
                arrayElementErrors: [
                    {
                        index: 0,
                        errors: {
                            // If age doesnt have errors
                            // age: [
                            //     { errorMessage: "Age is required", attemptedValue: undefined, ruleName: "required" },
                            //     { errorMessage: "Children age cannot be greater than parent", attemptedValue: 10, ruleName: "ageComparison" }
                            // ],
                            name: [
                                {
                                    errorMessage: "Minimum chars of person name is 2",
                                    attemptedValue: "A",
                                    ruleName: "minLength"
                                }
                            ],
                            birtDate: [
                                {
                                    errorMessage: "Date cannot be future",
                                    attemptedValue: new Date("2100-01-01"),
                                    ruleName: "future"
                                }
                            ],
                            addresses: {
                                arrayErrors: [],
                                arrayElementErrors: [
                                    {
                                        index: 0,
                                        errors: {
                                            // cityId: [{ errorMessage: "invalid city id ''", attemptedValue: "", ruleName: "invalidCity" }], //ensure each property is optional
                                            street: [
                                                {
                                                    errorMessage: "Please enter street name",
                                                    attemptedValue: "",
                                                    ruleName: "required"
                                                }
                                            ]
                                        },
                                        attemptedValue: undefined
                                    }
                                ]
                            }
                        },
                        attemptedValue: undefined
                    }
                ]
            }
        }
        expect(!actual).not.toBeNull()
    })
})