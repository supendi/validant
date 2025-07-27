import { Validator, emailAddress, minNumber, required, ValidationRule, ValidationResult, } from "../../../index"

const defaultMessage = { okMessage: "Validation successful.", errorMessage: "Validation failed. Please check and fix the errors to continue." }

interface Address {
    street: string,
    cityId: number
}

interface Customer {
    fullName: string
    email: string
    addresses: Address[]
}

const customerAddressRule: ValidationRule<Address, Customer> = {
    cityId: [required(), minNumber(1, "Please enter a valid city id.")],
    street: [required()]
}

const customerRule: ValidationRule<Customer> = {
    fullName: [required()],
    email: [
        required(),
        emailAddress()
    ],
    addresses: {
        arrayRules: [required()],
        arrayElementRule: customerAddressRule
    }
}

describe("Validate customer with empty address", () => {
    it("Return error customer and empty address error", () => {

        const customer: Customer = {
            fullName: "",
            email: "",
            addresses: []
        }

        const validator = new Validator()
        const actual = validator.validate(customer, customerRule)

        const expected: ValidationResult<Customer> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                fullName: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                email: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    },
                    {
                        errorMessage: "Invalid email address. The valid email example: john.doe@example.com.",
                        attemptedValue: "",
                        ruleName: emailAddress.name
                    }
                ],
                addresses: {
                    arrayErrors: [
                        {
                            errorMessage: "This field is required.",
                            attemptedValue: [],
                            ruleName: required.name
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)

    })
})

describe("Validate customer with address items", () => {
    it("Return error customer and address item error", () => {

        const customer: Customer = {
            fullName: "",
            email: "",
            addresses: [
                {
                    cityId: 0,
                    street: ""
                },
                {
                    cityId: 1,
                    street: "asdf"
                }
            ]
        }

        const validator = new Validator()
        const actual = validator.validate(customer, customerRule)

        const expected: ValidationResult<Customer> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                fullName: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    }
                ],
                email: [
                    {
                        errorMessage: "This field is required.",
                        attemptedValue: "",
                        ruleName: required.name
                    },
                    {
                        errorMessage: "Invalid email address. The valid email example: john.doe@example.com.",
                        attemptedValue: "",
                        ruleName: emailAddress.name
                    }
                ],
                addresses: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                cityId: [
                                    {
                                        attemptedValue: 0,
                                        errorMessage: "Please enter a valid city id.",
                                        ruleName: minNumber.name
                                    }
                                ],
                                street: [
                                    {
                                        attemptedValue: "",
                                        errorMessage: "This field is required.",
                                        ruleName: required.name
                                    }
                                ],
                            },
                            attemptedValue: customer.addresses[0]
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)

    })
})