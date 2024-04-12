# ts-validity

## Installation
```
npm install ts-validity       # npm
yarn add ts-validity          # yarn
```

## Usage
### Let's start with simple validation
Given interface
```typescript
interface Account {
    name: string,
    age: number,
    email: string
}
```

Create the validation rule and validate the object
```typescript
import { objectValidator, ValidationRule, minNumber, required, emailAddress } from "ts-validity";

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

const validationResult = objectValidator.validate(account, validationRule)

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

Notice that the validationResult.errors property, has the same property names as the account object, but its dataype is array of string. 
```

### Nested object validation
```typescript
import { objectValidator, ValidationRule, minNumber, required, emailAddress } from "ts-validity";

interface Person {
    name: string,
    age: number,
    child?: Person
    address?: {
        street: string,
        city: {
            name: string
            country: {
                name: string
                continent: {
                    name: string
                }
            }
        }
    }
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

const validationResult = objectValidator.validate(john, rule)

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
import { objectValidator, ValidationRule, minNumber, required, emailAddress, arrayMinLen } from "ts-validity";

interface Product {
    name?: string
    units?: Unit[]
}

interface Unit {
    name: string,
    conversion: number,
}

const validationRule: ValidationRule<Product> = {
    name: [required()],
    units: {
        validators: [arrayMinLen(3, "Product uom has to be at least 3 units.")],
        validationRule: {
            name: [required()],
            conversion: [minNumber(1)]
        }
    }
}

const ironStick: Product = {
    name: "",
    units: [
        {
            name: "",
            conversion: 0
        },
        {
            name: "cm",
            conversion: 0
        }
    ]
}

const validationResult = objectValidator.validate(ironStick, validationRule)

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
To use your own validator, you can use the propertyValidator function.
The following is the signature of **propertyValidator** function:
```typescript
export declare const propertyValidator: <TValue, TObject>(func: ValidateFunc<TValue, TObject>, errorMessage: string, validatorDescription?: string) => PropertyValidator<TValue, TObject>;
```

The propertyValidator is actually a closure that returns a validate function, which is called by the objectValidator. The following is the signature of the **ValidateFunc**:
```typescript
export type ValidateFunc<TValue, TObject> = (value: TValue, objRef?: TObject) => boolean
```

And this is the **PropertyValidator** type:
```typescript
export type PropertyValidator<TValue, TObject> = {
    description: string;
    validate: ValidateFunc<TValue, TObject>;
    returningErrorMessage: string;
};
```

### Usage
```typescript
import { objectValidator, ValidationRule, propertyValidator } from "ts-validity";

interface Account {
    name: string,
}

const validationRule: ValidationRule<Account> = {
    name: [
        // Name length minimum is 3 char
        propertyValidator((value, object) => {
            return value.length >= 5
        }, "Name length minimum is 5 chars."),

        // Must contain A letter
        propertyValidator((value, object) => {
            return value.toLocaleLowerCase().includes("a")
        }, "The name must contain the 'A' letter."),
    ],
}

const account: Account = {
    name: "an",
}

const validationResult = objectValidator.validate(account, validationRule)

// validationResult = {
//     message: "One or more validation errors occurred.",
//     isValid: false,
//     errors: {
//         name: ["Name length minimum is 5 chars.", "The name must contain the 'A' letter."]
//     }
// }
```
