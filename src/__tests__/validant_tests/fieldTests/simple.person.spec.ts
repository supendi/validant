import { Validator, required, ValidationRule, } from "../../../index"
import { FieldErrorOf } from "../../../types/ErrorOf"

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
        const actual = validator.validateField("name", person)

        const expected: FieldErrorOf<Person, "name"> = {
            isValid: false,
            fieldName: "name",
            errors: {
                name: ["This field is required."]
            }
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
        const actual = validator.validateField("children", person)

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
        const actual = validator.validateField("children", person)

        const expected: FieldErrorOf<Person, "children"> = {
            isValid: false,
            fieldName: "children",
            errors: {
                children: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            validatedObject: {
                                name: ""
                            },
                            errors: {
                                name: ["This field is required."]
                            }
                        }
                    ]
                }
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
        const actual = validator.validateField("address", person)

        const expected: FieldErrorOf<Person, "address"> = {
            isValid: false,
            fieldName: "address",
            errors: {
                address: {
                    city: ["This field is required."]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})
