import { validant, } from "../../index"
import { ValidationRule } from "../../types"
import { ValidationResult } from "../../validant"
import { emailAddress, required, minNumber } from "../../rules"

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
        arrayItemRule: customerAddressRule
    }
}

describe("Validate customer with empty address", () => {
    it("Return error customer and empty address error", () => {

        const customer: Customer = {
            fullName: "",
            email: "",
            addresses: []
        }

        const actual = validant.validate(customer, customerRule)

        const expected: ValidationResult<Customer> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                fullName: ["This field is required."],
                email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."],
                addresses: {
                    errors: ["This field is required."]
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

        const actual = validant.validate(customer, customerRule)

        const expected: ValidationResult<Customer> = {
            message: defaultMessage.errorMessage,
            isValid: false,
            errors: {
                fullName: ["This field is required."],
                email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."],
                addresses: {
                    errorsEach: [
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
