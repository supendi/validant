import { minNumber, required } from "../../rules"
import { ValidationRule } from "../../types"
import saferval, { ValidationResult } from "../../saferval"

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

        const actual = saferval.validate(john, rule)

        const expected: ValidationResult<Person> = {
            message: "One or more validation errors occurred.",
            isValid: false,
            errors: {
                name: ["This field is required."],
                age: ["The minimum value for this field is 20."],
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
        }

        expect(actual).toEqual(expected)
    })
})