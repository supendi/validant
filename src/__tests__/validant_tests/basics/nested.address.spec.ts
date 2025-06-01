import { minNumber, required, ValidationResult, ValidationRule, Validator } from "../../../index"

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

describe("Nested Object Test with nested address", () => {
    it("should return errors", () => {
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

        const validator = new Validator(rule)
        const actual = validator.validate(john)

        const expected: ValidationResult<Person> = {
            message: "Validation failed. Please check and fix the errors to continue.",
            isValid: false,
            errors: {
                name: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                age: [
                    {
                        errorMessage: "The minimum value for this field is 20.",
                        attemptedValue: 0,
                        ruleName: minNumber.name
                    }
                ],
                address: {
                    street: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: "",
                            ruleName: required.name
                        }
                    ],
                    city: {
                        name: [
                            {
                                errorMessage: "This field is required.",
                                attemptedValue: "",
                                ruleName: required.name
                            }
                        ],
                        country: {
                            name: [
                                {
                                    errorMessage: "This field is required.",
                                    attemptedValue: "",
                                    ruleName: required.name
                                }
                            ],
                            continent: {
                                name: [
                                    {
                                        errorMessage: "This field is required.",
                                        attemptedValue: "",
                                        ruleName: required.name
                                    }
                                ],
                            }
                        }
                    }
                },
                child: {
                    name: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: "",
                            ruleName: required.name
                        }
                    ],
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})