import { Validator, emailAddress, minNumber, required, ValidationRule, ValidationResult, } from "../../../index"

const defaultMessage = { okMessage: "Good to go.", errorMessage: "One or more validation errors occurred." }

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

        const validator = new Validator(customerRule)
        const actual = validator.validate(customer)

        const expected: ValidationResult<Customer> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                fullName: ["This field is required."],
                email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."],
                addresses: {
                    arrayErrors: ["This field is required."]
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

        const validator = new Validator(customerRule)
        const actual = validator.validate(customer)

        const expected: ValidationResult<Customer> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                fullName: ["This field is required."],
                email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."],
                addresses: {
                    arrayElementErrors: [
                        {
                            index: 0,
                            errors: {
                                cityId: ["Please enter a valid city id."],
                                street: ["This field is required."],
                            },
                            validatedObject: customer.addresses[0]
                        }
                    ]
                }
            }
        }

        expect(actual).toEqual(expected)

    })
})
