import { required, ValidationRule, AsyncValidationRule, AsyncValidator } from "../../../index"
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
        const validator = new AsyncValidator(rule)
        const actual = await validator.validateFieldAsync("name", person)

        const expected: FieldErrorOf<Person, "name"> = {
            isValid: false,
            fieldName: "name",
            errors: {
                name: [{
                    errorMessage: "This field is required.",
                    attemptedValue: "",
                    ruleName: required.name
                }]
            }
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
        const validator = new AsyncValidator(rule)
        const actual = await validator.validateFieldAsync("children", person)

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

        const validator = new AsyncValidator(rule)
        const actual = await validator.validateFieldAsync("children", person)

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

        const validator = new AsyncValidator(rule)
        const actual = await validator.validateFieldAsync("address", person)

        const expected: FieldErrorOf<Person, "address"> = {
            isValid: false,
            fieldName: "address",
            errors: {
                address: {
                    city: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: undefined,
                            ruleName: required.name
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)
    })
})
