# ts-validity

## Installation

```
npm install ts-validity       # npm
yarn add ts-validity          # yarn
```

## Usage

### Real World Validation

Given Order Interface
```typescript

interface Customer {
    fullName: string
    email: string
}

interface OrderItem {
    productId: number
    quantity: number
}

interface OrderRequest {
    orderNumber: string
    orderDate?: Date
    customer: Customer
    orderItems: OrderItem[]
} 
```

Validation Scema : Nested and Array Validation with custom validate function.

```typescript 
const orderRule: ValidationRule<OrderRequest> = {
    orderNumber: [required("Order number is required.")],
    orderDate: [required("Please enter order date.")],
    customer: {
        fullName: [required()],
        email: [
            required(),
            emailAddress()
        ],
    },
    orderItems: {
        arrayRules: [arrayMinLen(1, "Please add at least one product.")],
        arrayItemRule: {
            productId: [required("Please enter product.")],
            quantity: [
                minNumber(1, "Minimum quantity is 1."),
                function (quantity, order) {

                    // Case:
                    // When customer first 3 letters contains : Jac ignore invariant
                    // Then Max Quantity = 100
                    // So  Jack, Jacob, Jacky, Jacka will get this special max quantity
                    // 
                    // Other than that
                    // Max quantity = 10
 
                    // Accessing other properties via order
                    const customerName = order.customer.fullName
                    const isJac = order.customer.fullName.toLowerCase().startsWith("jac");

                    const maxQuantityForJac = 100
                    const maxQuantityForOthers = 10

                    if (isJac) {
                        return {
                            isValid: quantity <= maxQuantityForJac,
                            errorMessage: `You are special ${customerName}, other's max quantity is limited to ${maxQuantityForOthers}. Yours is limited to, but ${maxQuantityForJac} pcs.`
                        }
                    }
                    return {
                        isValid: quantity <= maxQuantityForOthers,
                        errorMessage: `You only allowed to order ${maxQuantityForOthers} product at once.`
                    }
                }
            ]
        }
    }
}
```
 
Validation and Result
```typescript
const orderRequest: OrderRequest = {
    orderNumber: "",
    customer: {
        email: "",
        fullName: "JaCkY chan"
    },
    orderItems: [
        {
            productId: 0,
            quantity: 120
        }
    ]
}

const actual = tsValidity.validate(orderRequest, orderRule)


// Validation result
const expected: ValidationResult<OrderRequest> = {
    message: defaultMessage.errorMessage,
    isValid: false,
    errors: {
        orderNumber: ["Order number is required."],
        orderDate: ["Please enter order date."],
        customer: {
            email: ["This field is required.", "Invalid email address. The valid email example: john.doe@example.com."]
        },
        orderItems: {
            errorsEach: [
                {
                    index: 0,
                    validatedObject: orderRequest.orderItems[0],
                    errors: {
                        productId: ["Please enter product."],
                        quantity: ["You are special JaCkY chan, other's max quantity is limited to 10. Yours is limited to, but 100 pcs."]
                    }
                }
            ]
        }
    }
}
```

### Simple validation

Given interface

```typescript
interface Account {
    name: string;
    age: number;
    email: string;
}
```

Create the validation rule and validate the object

```typescript
import { tsValidity, ValidationRule, minNumber, required, emailAddress } from "ts-validity";

const validationRule: ValidationRule<Account> = {
    name: [required("Account name is required.")],
    age: [required(), minNumber(17, "Should be at least 17 years old.")],
    email: [required(), emailAddress("Invalid email address")]
}

const account: Account = {
    name: "",
    age: 0,
    email: ""
}

const validationResult = tsValidity.validate(account, validationRule)

// The above validationResult value:
// {
//     message: "One or more validation errors occurred.",
//     isValid: false,
//     errors: {
//         name: ["Account name is required."],
//         age: ["This field is required.", "Should be at least 17 years old."],
//         email: ["This field is required.", "Invalid email address"],
//     }
// }

```

### Nested object validation

```typescript
import {
    tsValidity,
    ValidationRule,
    minNumber,
    required,
    emailAddress,
} from "ts-validity";

interface Person {
    name: string;
    age: number;
    child?: Person;
    address?: {
        street: string;
        city: {
            name: string;
            country: {
                name: string;
                continent: {
                    name: string;
                };
            };
        };
    };
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
                },
            },
        },
    },
    child: {
        name: [required()],
    },
};

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
                    name: "",
                },
            },
        },
    },
    child: {
        name: "",
        age: 0,
    },
};

const validationResult = tsValidity.validate(john, rule);

// validationResult = {
//     message: defaultMessage.errorMessage,
//     isValid: false,
//     errors: {
//         name: ["This field is required."],
//         age: ["The minimum value for this field is 20."],
//         address: {
//             street: ["This field is required."],
//             city: {
//                 name: ["This field is required."],
//                 country: {
//                     name: ["This field is required."],
//                     continent: {
//                         name: ["This field is required."],
//                     }
//                 }
//             }
//         },
//         child: {
//             name: ["This field is required."],
//         }
//     }
// }
```

### Validate array property

```typescript
import {
    tsValidity,
    ValidationRule,
    minNumber,
    required,
    emailAddress,
    arrayMinLen,
} from "ts-validity";

interface Product {
    name?: string;
    units?: Unit[];
}

interface Unit {
    name: string;
    conversion: number;
}

const validationRule: ValidationRule<Product> = {
    name: [required()],
    units: {
        arrayRules: [arrayMinLen(3, "Product uom has to be at least 3 units.")],
        arrayItemRule: {
            name: [required()],
            conversion: [minNumber(1)],
        },
    },
};

const ironStick: Product = {
    name: "",
    units: [
        {
            name: "",
            conversion: 0,
        },
        {
            name: "cm",
            conversion: 0,
        },
    ],
};

const validationResult = tsValidity.validate(ironStick, validationRule);

// validationResult = {
//     message: defaultMessage.errorMessage,
//     isValid: false,
//     errors: {
//         name: ["This field is required."],
//         units: {
//             errors: ["Product uom has to be at least 3 units."],
//             errorsEach: [
//                 {
//                     index: 0,
//                     errors: {
//                         name: ["This field is required."],
//                         conversion: ["The minimum value for this field is 1."]
//                     },
//                     validatedObject: {
//                         name: "",
//                         conversion: 0
//                     }
//                 },
//                 {
//                     index: 1,
//                     errors: {
//                         conversion: ["The minimum value for this field is 1."]
//                     },
//                     validatedObject: {
//                         name: "cm",
//                         conversion: 0
//                     }
//                 }
//             ]
//         }
//     }
// }
```

## Custom Property Validator

You can define your own validator function by matching the `PropertyRuleFunc` type:

```ts
export type PropertyRuleFunc<TValue, TObject> = (value: TValue, objRef?: TObject) => {
    isValid: boolean;
    errorMessage?: string;
}
```

### Example

```ts
import { tsValidity, ValidationRule, PropertyRuleFunc } from "ts-validity";

interface Account {
    name: string;
}

const nameMinLengthRule: PropertyRuleFunc<string, Account> = (value) => ({
    isValid: value.length >= 5,
    errorMessage: "Name length minimum is 5 chars.",
});

const mustContainALetterRule: PropertyRuleFunc<string, Account> = (value) => ({
    isValid: value.toLocaleLowerCase().includes("a"),
    errorMessage: "Name must contain 'A' letter.",
});

const validationRule: ValidationRule<Account> = {
    name: [nameMinLengthRule, mustContainALetterRule],
};

const account: Account = {
    name: "John",
};

const validationResult = tsValidity.validate(account, validationRule);

// validationResult = {
//     isValid: false,
//     message: "One or more validation errors occurred.",
//     errors: {
//         name: ["Name length minimum is 5 chars.", "Name must contain 'A' letter."]
//     }
// }
```

## Use Existing npm Validator Package

You can integrate third-party validator libraries like [validator](https://www.npmjs.com/package/validator).

### Install

```bash
npm install validator
npm install -D @types/validator
```

### Usage

```ts
import { tsValidity, required, ValidationRule, } from "ts-validity";
import { PropertyRuleFunc } from "ts-validity/dist/types";


interface Account {
    name: string;
    email: string;
    phone: string;
    password: string;
}

const isValidEmail: PropertyRuleFunc<string, Account> = (value) => ({
    isValid: validator.isEmail(value),
    errorMessage: "Not a valid email.",
});

const isMobileAU: PropertyRuleFunc<string, Account> = (value) => ({
    isValid: validator.isMobilePhone(value, "en-AU"),
    errorMessage: "Should be an AU mobile phone number format",
});

const isStrongPassword: PropertyRuleFunc<string, Account> = (value) => ({
    isValid: validator.isStrongPassword(value, { minLength: 8, minUppercase: 2 }),
    errorMessage: "Password should be 8 chars minimum, and has to contain at least 2 upper case.",
});

const validationRule: ValidationRule<Account> = {
    name: [required()],
    email: [required(), isValidEmail],
    phone: [required(), isMobileAU],
    password: [required(), isStrongPassword, (value, account) => { // OR INLINE That align with the PropertyRuleFunc signature
        return {
            isValid: value != "password123",
            errorMessage: "Thats a very bad password"
        }
    }],
};

const account: Account = {
    name: "John",
    email: "valid@@email.com",
    phone: "123123123",
    password: "strongpassword",
};

const validationResult = tsValidity.validate(account, validationRule);

// validationResult = {
//     isValid: false,
//     message: "One or more validation errors occurred.",
//     errors: {
//         email: ["Not a valid email."],
//         phone: ["Should be an AU mobile phone number format"],
//         password: ["Password should be 8 chars minimum, and has to contain at least 2 upper case."]
//     }
// }
```

## API Summary

```typescript
export {
    alphabetOnly,
    arrayMaxLen,
    arrayMinLen,
    elementOf,
    emailAddress,
    equalToPropertyValue,
    maxNumber,
    minNumber,
    maxSumOf,
    minSumOf,
    regularExpression,
    required,
    stringMaxLen,
    stringMinLen,
};
```
