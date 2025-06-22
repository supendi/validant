import { Validator, required, ValidationRule, } from "../../../index"
import { FieldErrorOf } from "../../../types/FieldErrorOf"

interface Address {
    city: string
}
interface Person {
    name: string
    address?: Address
    children?: Person[]
}

describe("Test Simple Object", () => {
    it("Person name should return errors", () => {
        const rule: ValidationRule<Person> = {
            name: [required()],
            address: {
                city: [required()]
            }
        }

        const person: Person = {
            name: "",
        }
        const validator = new Validator(rule)
        const actual = validator.validateField(person, "name")

        const expected: FieldErrorOf<Person, "name"> = {
            isValid: false,
            fieldName: "name",
            errors: [{
                errorMessage: "This field is required.",
                attemptedValue: "",
                ruleName: required.name
            }]
        }

        expect(actual).toEqual(expected)
    })
})

describe("Test validate field", () => {
    it("children", () => {
        const rule: ValidationRule<Person> = {
            name: [required()],
            address: {
                city: [required()]
            }
        }

        const person: Person = {
            name: "",
        }
        const validator = new Validator(rule)
        const actual = validator.validateField(person, "children")

        const expected: FieldErrorOf<Person, "children"> = {
            isValid: true,
            fieldName: "children",
        }

        expect(actual).toEqual(expected)
    })
})

describe("Test validate field", () => {
    it("children", () => {
        const rule: ValidationRule<Person> = {
            name: [required()],
            address: {
                city: [required()]
            },
            children: {
                arrayRules: [required()],
                arrayElementRule: {
                    name: [required()]
                }
            }
        }

        const person: Person = {
            name: "",
            children: [
                {
                    name: ""
                }
            ]
        }

        const validator = new Validator(rule)
        const actual = validator.validateField(person, "children")

        const expected: FieldErrorOf<Person, "children"> = {
            isValid: false,
            fieldName: "children",
            errors: {
                arrayElementErrors: [
                    {
                        index: 0,
                        attemptedValue: {
                            name: ""
                        },
                        errors: {
                            name: [
                                {
                                    errorMessage: "This field is required.",
                                    attemptedValue: "",
                                    ruleName: required.name
                                }
                            ]
                        }
                    }
                ]
            }
        }

        expect(actual).toEqual(expected)
    })
})

describe("Test validate field", () => {
    it("Address", () => {
        const rule: ValidationRule<Person> = {
            name: [required()],
            address: {
                city: [required()]
            },
            children: {
                arrayRules: [required()],
                arrayElementRule: {
                    name: [required()]
                }
            }
        }

        const person: Person = {
            name: "",
        }

        const validator = new Validator(rule)
        const actual = validator.validateField(person, "address")

        const expected: FieldErrorOf<Person, "address"> = {
            isValid: false,
            fieldName: "address",
            errors: {
                city: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: undefined,
                        ruleName: required.name
                    }
                ]
            }
        }

        expect(actual).toEqual(expected)
    })
})
