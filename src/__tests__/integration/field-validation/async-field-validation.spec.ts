import { required, ValidationRule, AsyncValidationRule, AsyncValidator } from "../../../index"
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
    it("Person name should return errors", async () => {
        const rule: AsyncValidationRule<Person> = {
            name: [required()],
            address: {
                city: [required()]
            }
        }

        const person: Person = {
            name: "",
        }
        const validator = new AsyncValidator()
        const actual = await validator.validateFieldAsync(person, "name", rule)

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
    it("children", async () => {
        const rule: AsyncValidationRule<Person> = {
            name: [required()],
            address: {
                city: [required()]
            }
        }

        const person: Person = {
            name: "",
        }
        const validator = new AsyncValidator()
        const actual = await validator.validateFieldAsync(person, "children", rule)

        const expected: FieldErrorOf<Person, "children"> = {
            isValid: true,
            fieldName: "children",
        }

        expect(actual).toEqual(expected)
    })
})

describe("Test validate field", () => {
    it("children", async () => {
        const rule: AsyncValidationRule<Person> = {
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

        const validator = new AsyncValidator()
        const actual = await validator.validateFieldAsync(person, "children", rule)

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
    it("Address", async () => {
        const rule: AsyncValidationRule<Person> = {
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

        const validator = new AsyncValidator()
        const actual = await validator.validateFieldAsync(person, "address", rule)

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
